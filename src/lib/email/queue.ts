import { getRedisClient } from '@/lib/redis/client';
import { getAdminEmails } from './transport';
import type { IOrder } from '@/lib/db/models/Order';

// Queue keys
const EMAIL_QUEUE_KEY = 'email:queue';
const EMAIL_JOB_PREFIX = 'email:job:';
const EMAIL_DEDUPE_PREFIX = 'email:dedupe:';

// Job configuration
const MAX_ATTEMPTS = 3;
const DEDUPE_TTL_SECONDS = 3600; // 1 hour - prevent duplicate emails

export interface EmailJob {
  id: string;
  type: 'order_placed_user' | 'order_placed_admin' | 'order_status';
  to: string;
  payload: OrderEmailPayload;
  attempts: number;
  maxAttempts: number;
  createdAt: string;
}

export interface OrderEmailPayload {
  orderNumber: string;
  orderId: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessName?: string;
  orderType?: string;
  status: string;
  items: Array<{
    productName?: string;
    quantity: number;
    unit?: string;
    unitPrice?: number;
    subtotal?: number;
  }>;
  totalAmount: number;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
}

function generateJobId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 11)}`;
}

function generateDedupeKey(type: string, orderId: string, status?: string): string {
  if (type === 'order_placed_user' || type === 'order_placed_admin') {
    return `${type}:${orderId}`;
  }
  // For status emails, include status to allow different status emails
  return `${type}:${orderId}:${status}`;
}

function orderToPayload(order: IOrder): OrderEmailPayload {
  return {
    orderNumber: order.orderNumber,
    orderId: order._id?.toString() || order.orderNumber,
    customerName: order.customerName,
    customerEmail: order.customerEmail,
    customerPhone: order.customerPhone,
    businessName: order.businessName,
    orderType: order.orderType,
    status: order.status,
    items: order.items.map(item => ({
      productName: item.productName,
      quantity: item.quantity,
      unit: item.unit,
      unitPrice: item.unitPrice,
      subtotal: item.subtotal,
    })),
    totalAmount: order.totalAmount,
    notes: order.notes,
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt?.toISOString(),
  };
}

async function isDuplicate(dedupeKey: string): Promise<boolean> {
  const redis = getRedisClient();
  const exists = await redis.exists(`${EMAIL_DEDUPE_PREFIX}${dedupeKey}`);
  return exists === 1;
}

async function markAsSent(dedupeKey: string): Promise<void> {
  const redis = getRedisClient();
  await redis.setex(`${EMAIL_DEDUPE_PREFIX}${dedupeKey}`, DEDUPE_TTL_SECONDS, '1');
}

async function enqueueJob(job: EmailJob): Promise<boolean> {
  const redis = getRedisClient();
  const dedupeKey = generateDedupeKey(job.type, job.payload.orderId, job.payload.status);
  
  // Check for duplicate
  if (await isDuplicate(dedupeKey)) {
    console.log(`Skipping duplicate email job: ${dedupeKey}`);
    return false;
  }
  
  // Store job data
  const jobKey = `${EMAIL_JOB_PREFIX}${job.id}`;
  await redis.set(jobKey, JSON.stringify(job), 'EX', 86400); // 24 hour expiry
  
  // Add to queue
  await redis.lpush(EMAIL_QUEUE_KEY, job.id);
  
  console.log(`Enqueued email job: ${job.id} (${job.type} to ${job.to})`);
  return true;
}

export async function enqueueOrderPlaced(order: IOrder): Promise<void> {
  const payload = orderToPayload(order);
  const timestamp = new Date().toISOString();
  
  // Queue email to user
  const userJob: EmailJob = {
    id: generateJobId(),
    type: 'order_placed_user',
    to: order.customerEmail,
    payload,
    attempts: 0,
    maxAttempts: MAX_ATTEMPTS,
    createdAt: timestamp,
  };
  await enqueueJob(userJob);
  
  // Queue emails to admin(s)
  const adminEmails = getAdminEmails();
  for (const adminEmail of adminEmails) {
    const adminJob: EmailJob = {
      id: generateJobId(),
      type: 'order_placed_admin',
      to: adminEmail,
      payload,
      attempts: 0,
      maxAttempts: MAX_ATTEMPTS,
      createdAt: timestamp,
    };
    await enqueueJob(adminJob);
  }
}

export async function enqueueOrderStatus(order: IOrder, newStatus: string): Promise<void> {
  const payload = orderToPayload(order);
  payload.status = newStatus; // Ensure we use the new status
  
  const userJob: EmailJob = {
    id: generateJobId(),
    type: 'order_status',
    to: order.customerEmail,
    payload,
    attempts: 0,
    maxAttempts: MAX_ATTEMPTS,
    createdAt: new Date().toISOString(),
  };
  
  await enqueueJob(userJob);
}

export async function dequeue(): Promise<EmailJob | null> {
  const redis = getRedisClient();
  
  // Pop job ID from queue
  const jobId = await redis.rpop(EMAIL_QUEUE_KEY);
  if (!jobId) {
    return null;
  }
  
  // Get job data
  const jobKey = `${EMAIL_JOB_PREFIX}${jobId}`;
  const jobData = await redis.get(jobKey);
  
  if (!jobData) {
    console.warn(`Job data not found for ID: ${jobId}`);
    return null;
  }
  
  return JSON.parse(jobData) as EmailJob;
}

export async function markComplete(job: EmailJob): Promise<void> {
  const redis = getRedisClient();
  const jobKey = `${EMAIL_JOB_PREFIX}${job.id}`;
  const dedupeKey = generateDedupeKey(job.type, job.payload.orderId, job.payload.status);
  
  // Remove job data
  await redis.del(jobKey);
  
  // Mark as sent for deduplication
  await markAsSent(dedupeKey);
  
  console.log(`Completed email job: ${job.id}`);
}

export async function requeueWithRetry(job: EmailJob, error: string): Promise<boolean> {
  const redis = getRedisClient();
  
  job.attempts += 1;
  
  if (job.attempts >= job.maxAttempts) {
    console.error(`Email job ${job.id} failed after ${job.attempts} attempts. Last error: ${error}`);
    // Remove the job data
    await redis.del(`${EMAIL_JOB_PREFIX}${job.id}`);
    return false;
  }
  
  // Update job with new attempt count
  const jobKey = `${EMAIL_JOB_PREFIX}${job.id}`;
  await redis.set(jobKey, JSON.stringify(job), 'EX', 86400);
  
  // Re-add to queue (at the end for simple retry)
  await redis.lpush(EMAIL_QUEUE_KEY, job.id);
  
  console.log(`Requeued email job ${job.id} (attempt ${job.attempts}/${job.maxAttempts})`);
  return true;
}

export async function getQueueLength(): Promise<number> {
  const redis = getRedisClient();
  return await redis.llen(EMAIL_QUEUE_KEY);
}

