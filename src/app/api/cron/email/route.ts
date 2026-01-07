import { NextRequest, NextResponse } from 'next/server';
import { dequeue, markComplete, requeueWithRetry, getQueueLength, EmailJob } from '@/lib/email/queue';
import { sendEmail } from '@/lib/email/transport';
import { orderPlacedUserEmail, orderPlacedAdminEmail } from '@/lib/email/templates/orderPlaced';
import { orderStatusEmail } from '@/lib/email/templates/orderStatus';

const BATCH_SIZE = 10; // Process up to 10 emails per cron run

function verifyCronSecret(request: NextRequest): boolean {
  const cronSecret = process.env.CRON_SECRET;
  
  // If no secret configured, reject all requests
  if (!cronSecret) {
    console.error('CRON_SECRET not configured');
    return false;
  }
  
  // Check header
  const providedSecret = request.headers.get('x-cron-secret') || 
                         request.headers.get('authorization')?.replace('Bearer ', '');
  
  return providedSecret === cronSecret;
}

function renderEmail(job: EmailJob): { subject: string; html: string } {
  const { type, payload } = job;
  
  const orderData = {
    orderNumber: payload.orderNumber,
    customerName: payload.customerName,
    customerEmail: payload.customerEmail,
    customerPhone: payload.customerPhone,
    businessName: payload.businessName,
    orderType: payload.orderType,
    items: payload.items,
    notes: payload.notes,
    createdAt: payload.createdAt,
    updatedAt: payload.updatedAt,
    status: payload.status,
    totalAmount: payload.totalAmount,
  };
  
  switch (type) {
    case 'order_placed_user':
      return orderPlacedUserEmail(orderData);
    case 'order_placed_admin':
      return orderPlacedAdminEmail(orderData);
    case 'order_status':
      return orderStatusEmail(orderData);
    default:
      throw new Error(`Unknown email type: ${type}`);
  }
}

export async function GET(request: NextRequest) {
  // Verify cron secret
  if (!verifyCronSecret(request)) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    );
  }
  
  const results = {
    processed: 0,
    succeeded: 0,
    failed: 0,
    requeued: 0,
    queueLength: 0,
  };
  
  try {
    // Process batch of jobs
    for (let i = 0; i < BATCH_SIZE; i++) {
      const job = await dequeue();
      
      if (!job) {
        // Queue is empty
        break;
      }
      
      results.processed++;
      
      try {
        // Render email based on type
        const { subject, html } = renderEmail(job);
        
        // Send email
        await sendEmail(job.to, subject, html);
        
        // Mark as complete
        await markComplete(job);
        results.succeeded++;
        
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        console.error(`Failed to send email job ${job.id}:`, errorMessage);
        
        // Attempt to requeue
        const requeued = await requeueWithRetry(job, errorMessage);
        if (requeued) {
          results.requeued++;
        } else {
          results.failed++;
        }
      }
    }
    
    // Get remaining queue length
    results.queueLength = await getQueueLength();
    
    console.log(`Email cron completed:`, results);
    
    return NextResponse.json({
      success: true,
      ...results,
    });
    
  } catch (error) {
    console.error('Email cron error:', error);
    return NextResponse.json(
      { 
        error: 'Internal server error',
        ...results,
      },
      { status: 500 }
    );
  }
}

// Also support POST for flexibility
export async function POST(request: NextRequest) {
  return GET(request);
}

