import { emailLayout, formatDate } from './layout';

interface OrderItem {
  productName?: string;
  quantity: number;
  unit?: string;
}

interface OrderPlacedData {
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  businessName?: string;
  orderType?: string;
  items: OrderItem[];
  notes?: string;
  createdAt: Date | string;
}

export function orderPlacedUserEmail(data: OrderPlacedData): { subject: string; html: string } {
  const subject = `Order Received - #${data.orderNumber}`;
  
  const itemsTable = `
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

  const content = `
    <h2 style="margin-top: 0; color: #111827;">Thank You for Your Order!</h2>
    
    <p>Hi ${data.customerName},</p>
    
    <p>We've received your order request and are reviewing it. Our team will contact you within <strong>24 hours</strong> to confirm your order details and pricing.</p>
    
    <div class="order-box">
      <div class="order-number">Order #${data.orderNumber}</div>
      <p style="margin: 8px 0 0; color: #6b7280;">Placed on ${formatDate(data.createdAt)}</p>
    </div>
    
    <div class="info-section">
      <h3 style="margin-bottom: 16px; color: #111827;">Order Summary</h3>
      ${itemsTable}
    </div>
    
    ${data.notes ? `
    <div class="info-section">
      <div class="info-label">Additional Notes</div>
      <div class="info-value">${data.notes}</div>
    </div>
    ` : ''}
    
    <div class="info-section">
      <h3 style="margin-bottom: 16px; color: #111827;">Your Information</h3>
      <div style="display: grid; gap: 12px;">
        <div>
          <div class="info-label">Name</div>
          <div class="info-value">${data.customerName}</div>
        </div>
        <div>
          <div class="info-label">Email</div>
          <div class="info-value">${data.customerEmail}</div>
        </div>
        <div>
          <div class="info-label">Phone</div>
          <div class="info-value">${data.customerPhone}</div>
        </div>
        ${data.businessName ? `
        <div>
          <div class="info-label">Business</div>
          <div class="info-value">${data.businessName}</div>
        </div>
        ` : ''}
        ${data.orderType ? `
        <div>
          <div class="info-label">Order Type</div>
          <div class="info-value">${data.orderType}</div>
        </div>
        ` : ''}
      </div>
    </div>
    
    <p style="color: #6b7280; font-size: 14px;">
      If you have any questions, feel free to reply to this email or contact us directly.
    </p>
  `;

  return { subject, html: emailLayout(content, subject) };
}

export function orderPlacedAdminEmail(data: OrderPlacedData): { subject: string; html: string } {
  const subject = `New Order Received - #${data.orderNumber}`;
  
  const itemsTable = `
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

  const adminUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skygrowers.com';

  const content = `
    <h2 style="margin-top: 0; color: #111827;">New Order Received</h2>
    
    <p>A new order has been placed and requires your attention.</p>
    
    <div class="order-box">
      <div class="order-number">Order #${data.orderNumber}</div>
      <p style="margin: 8px 0 0; color: #6b7280;">Placed on ${formatDate(data.createdAt)}</p>
    </div>
    
    <a href="${adminUrl}/admin/orders/${data.orderNumber}" class="button">View Order Details</a>
    
    <div class="info-section">
      <h3 style="margin-bottom: 16px; color: #111827;">Customer Information</h3>
      <div style="display: grid; gap: 12px;">
        <div>
          <div class="info-label">Name</div>
          <div class="info-value">${data.customerName}</div>
        </div>
        <div>
          <div class="info-label">Email</div>
          <div class="info-value"><a href="mailto:${data.customerEmail}">${data.customerEmail}</a></div>
        </div>
        <div>
          <div class="info-label">Phone</div>
          <div class="info-value"><a href="tel:${data.customerPhone}">${data.customerPhone}</a></div>
        </div>
        ${data.businessName ? `
        <div>
          <div class="info-label">Business</div>
          <div class="info-value">${data.businessName}</div>
        </div>
        ` : ''}
        ${data.orderType ? `
        <div>
          <div class="info-label">Order Type</div>
          <div class="info-value">${data.orderType}</div>
        </div>
        ` : ''}
      </div>
    </div>
    
    <div class="info-section">
      <h3 style="margin-bottom: 16px; color: #111827;">Requested Items</h3>
      ${itemsTable}
    </div>
    
    ${data.notes ? `
    <div class="info-section">
      <div class="info-label">Additional Notes</div>
      <div class="info-value">${data.notes}</div>
    </div>
    ` : ''}
    
    <p style="color: #6b7280; font-size: 14px;">
      Please review and set pricing for this order, then confirm with the customer.
    </p>
  `;

  return { subject, html: emailLayout(content, subject) };
}

