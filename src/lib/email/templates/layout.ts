export function emailLayout(content: string, title: string): string {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://skygrowers.com';
  
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
    }
    .header {
      background-color: #16a34a;
      padding: 24px;
      text-align: center;
    }
    .header h1 {
      color: #ffffff;
      margin: 0;
      font-size: 28px;
      font-weight: 700;
    }
    .header p {
      color: #dcfce7;
      margin: 8px 0 0;
      font-size: 14px;
    }
    .content {
      padding: 32px 24px;
    }
    .footer {
      background-color: #f9fafb;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
    }
    .footer p {
      margin: 0;
      font-size: 12px;
      color: #6b7280;
    }
    .footer a {
      color: #16a34a;
      text-decoration: none;
    }
    .button {
      display: inline-block;
      background-color: #16a34a;
      color: #ffffff;
      padding: 12px 24px;
      text-decoration: none;
      border-radius: 6px;
      font-weight: 600;
      margin: 16px 0;
    }
    .order-box {
      background-color: #f0fdf4;
      border: 1px solid #bbf7d0;
      border-radius: 8px;
      padding: 16px;
      margin: 16px 0;
    }
    .order-number {
      font-size: 18px;
      font-weight: 700;
      color: #16a34a;
    }
    .status-badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 16px;
      font-size: 12px;
      font-weight: 600;
      text-transform: uppercase;
    }
    .status-pending { background-color: #fef3c7; color: #92400e; }
    .status-confirmed { background-color: #dbeafe; color: #1e40af; }
    .status-processing { background-color: #e0e7ff; color: #3730a3; }
    .status-shipped { background-color: #fae8ff; color: #86198f; }
    .status-delivered { background-color: #dcfce7; color: #166534; }
    .status-cancelled { background-color: #fee2e2; color: #991b1b; }
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 16px 0;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #e5e7eb;
    }
    th {
      background-color: #f9fafb;
      font-weight: 600;
      font-size: 12px;
      text-transform: uppercase;
      color: #6b7280;
    }
    .total-row {
      font-weight: 700;
      background-color: #f0fdf4;
    }
    .info-section {
      margin: 24px 0;
    }
    .info-label {
      font-size: 12px;
      color: #6b7280;
      text-transform: uppercase;
      margin-bottom: 4px;
    }
    .info-value {
      font-size: 14px;
      color: #111827;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Sky Growers</h1>
      <p>Fresh Farm Produce</p>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>Sky Growers - Fresh Farm Produce</p>
      <p style="margin-top: 8px;">
        <a href="${siteUrl}">Visit our website</a> | 
        <a href="${siteUrl}/contact">Contact Us</a>
      </p>
      <p style="margin-top: 16px; font-size: 11px;">
        This email was sent from Sky Growers. If you have any questions, please reply to this email.
      </p>
    </div>
  </div>
</body>
</html>
`;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-NZ', {
    style: 'currency',
    currency: 'NZD',
  }).format(amount);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString('en-NZ', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function getStatusBadgeClass(status: string): string {
  const statusClasses: Record<string, string> = {
    pending: 'status-pending',
    confirmed: 'status-confirmed',
    processing: 'status-processing',
    shipped: 'status-shipped',
    delivered: 'status-delivered',
    cancelled: 'status-cancelled',
  };
  return statusClasses[status.toLowerCase()] || 'status-pending';
}

