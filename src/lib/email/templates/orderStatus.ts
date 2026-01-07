import { emailLayout, formatCurrency, formatDate, getStatusBadgeClass } from './layout';

interface OrderItem {
  productName?: string;
  quantity: number;
  unit?: string;
  unitPrice?: number;
  subtotal?: number;
}

interface OrderStatusData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  status: string;
  items: OrderItem[];
  totalAmount: number;
  notes?: string;
  createdAt: Date | string;
  updatedAt?: Date | string;
}

type OrderStatus = 'confirmed' | 'delivered' | 'cancelled' | 'processing' | 'shipped' | 'pending';

const statusMessages: Record<OrderStatus, { title: string; message: string }> = {
  confirmed: {
    title: 'Order Confirmed!',
    message: 'Great news! Your order has been confirmed and is being prepared.',
  },
  delivered: {
    title: 'Order Delivered!',
    message: 'Your order has been successfully delivered. We hope you enjoy your fresh produce!',
  },
  cancelled: {
    title: 'Order Cancelled',
    message: 'Your order has been cancelled. If you have any questions, please contact us.',
  },
  processing: {
    title: 'Order Processing',
    message: 'Your order is now being processed and will be ready soon.',
  },
  shipped: {
    title: 'Order Shipped!',
    message: 'Your order is on its way! You should receive it soon.',
  },
  pending: {
    title: 'Order Status Update',
    message: 'There has been an update to your order.',
  },
};

function getStatusInfo(status: string): { title: string; message: string } {
  const normalizedStatus = status.toLowerCase() as OrderStatus;
  return statusMessages[normalizedStatus] || {
    title: 'Order Status Update',
    message: `Your order status has been updated to: ${status}`,
  };
}

export function orderStatusEmail(data: OrderStatusData): { subject: string; html: string } {
  const statusInfo = getStatusInfo(data.status);
  const subject = `${statusInfo.title} - Order #${data.orderNumber}`;
  
  // Check if pricing has been applied
  const pricingApplied = data.totalAmount > 0 && data.items.some(item => (item.unitPrice || 0) > 0);
  
  const itemsTable = pricingApplied ? `
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Unit</th>
          <th style="text-align: right;">Price</th>
          <th style="text-align: right;">Subtotal</th>
        </tr>
      </thead>
      <tbody>
        ${data.items.map(item => `
          <tr>
            <td>${item.productName || 'Item'}</td>
            <td>${item.quantity}</td>
            <td>${item.unit || '-'}</td>
            <td style="text-align: right;">${formatCurrency(item.unitPrice || 0)}</td>
            <td style="text-align: right;">${formatCurrency(item.subtotal || 0)}</td>
          </tr>
        `).join('')}
        <tr class="total-row">
          <td colspan="4" style="text-align: right;"><strong>Total</strong></td>
          <td style="text-align: right;"><strong>${formatCurrency(data.totalAmount)}</strong></td>
        </tr>
      </tbody>
    </table>
  ` : `
    <table>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Unit</th>
        </tr>
      </thead>
      <tbody>
        ${data.items.map(item => `
          <tr>
            <td>${item.productName || 'Item'}</td>
            <td>${item.quantity}</td>
            <td>${item.unit || '-'}</td>
          </tr>
        `).join('')}
      </tbody>
    </table>
  `;

  const statusBadgeClass = getStatusBadgeClass(data.status);

  const content = `
    <h2 style="margin-top: 0; color: #111827;">${statusInfo.title}</h2>
    
    <p>Hi ${data.customerName},</p>
    
    <p>${statusInfo.message}</p>
    
    <div class="order-box">
      <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 8px;">
        <div class="order-number">Order #${data.orderNumber}</div>
        <span class="${statusBadgeClass}">${data.status}</span>
      </div>
      <p style="margin: 8px 0 0; color: #6b7280;">
        Placed on ${formatDate(data.createdAt)}
        ${data.updatedAt ? ` • Updated on ${formatDate(data.updatedAt)}` : ''}
      </p>
    </div>
    
    <div class="info-section">
      <h3 style="margin-bottom: 16px; color: #111827;">Order Details</h3>
      ${itemsTable}
    </div>
    
    ${pricingApplied ? `
    <div style="background-color: #f0fdf4; border-radius: 8px; padding: 16px; margin: 16px 0; text-align: center;">
      <div style="font-size: 14px; color: #6b7280;">Total Amount</div>
      <div style="font-size: 28px; font-weight: 700; color: #16a34a;">${formatCurrency(data.totalAmount)}</div>
    </div>
    ` : ''}
    
    ${data.notes ? `
    <div class="info-section">
      <div class="info-label">Notes</div>
      <div class="info-value">${data.notes}</div>
    </div>
    ` : ''}
    
    ${data.status.toLowerCase() === 'cancelled' ? `
    <p style="color: #6b7280; font-size: 14px;">
      If you didn't request this cancellation or have any concerns, please contact us immediately.
    </p>
    ` : `
    <p style="color: #6b7280; font-size: 14px;">
      If you have any questions about your order, feel free to reply to this email or contact us directly.
    </p>
    `}
  `;

  return { subject, html: emailLayout(content, subject) };
}

