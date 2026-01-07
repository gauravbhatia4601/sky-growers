import nodemailer from 'nodemailer';
import dotenv from 'dotenv';
import { resolve } from 'path';

// Load environment variables
dotenv.config({ path: resolve(__dirname, '../.env.local') });

// Test email template
const testEmailHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Email</title>
  <style>
    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      line-height: 1.6;
      color: #333;
      margin: 0;
      padding: 0;
      background-color: #f4f4f4;
    }
    .container {
      max-width: 600px;
      margin: 20px auto;
      background-color: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
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
    }
    .content {
      padding: 32px 24px;
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
    .footer {
      background-color: #f9fafb;
      padding: 24px;
      text-align: center;
      border-top: 1px solid #e5e7eb;
      font-size: 12px;
      color: #6b7280;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Sky Growers Test Email</h1>
    </div>
    <div class="content">
      <h2 style="color: #111827;">Email System Test</h2>
      <p>Hello!</p>
      <p>This is a test email from Sky Growers email system. If you're receiving this, it means the email configuration is working correctly.</p>
      <p><strong>Test Details:</strong></p>
      <ul>
        <li>Transport: Nodemailer</li>
        <li>Provider: Zoho SMTP</li>
        <li>Environment: ${process.env.NODE_ENV || 'development'}</li>
        <li>Timestamp: ${new Date().toISOString()}</li>
      </ul>
      <p>This email was sent using the following configuration:</p>
      <ul>
        <li>SMTP Host: ${process.env.SMTP_HOST || 'Not configured'}</li>
        <li>SMTP Port: ${process.env.SMTP_PORT || 'Not configured'}</li>
        <li>SMTP User: ${process.env.SMTP_USER || 'Not configured'}</li>
        <li>From Address: ${process.env.EMAIL_FROM || 'Not configured'}</li>
      </ul>
    </div>
    <div class="footer">
      <p>Sky Growers - Fresh Farm Produce</p>
      <p style="margin-top: 8px;">This is an automated test email.</p>
    </div>
  </div>
</body>
</html>
`;

async function testEmailSending() {
  console.log('='.repeat(60));
  console.log('Sky Growers Email Test Script');
  console.log('='.repeat(60));
  console.log();

  // Check environment variables
  console.log('📋 Checking environment variables...');
  const requiredVars = [
    'SMTP_HOST',
    'SMTP_PORT',
    'SMTP_USER',
    'SMTP_PASS',
    'EMAIL_FROM'
  ];

  const missing: string[] = [];
  requiredVars.forEach(varName => {
    if (!process.env[varName]) {
      missing.push(varName);
      console.log(`  ❌ ${varName}: Not set`);
    } else {
      // Mask password
      if (varName === 'SMTP_PASS') {
        console.log(`  ✅ ${varName}: ${'*'.repeat(8)}`);
      } else {
        console.log(`  ✅ ${varName}: ${process.env[varName]}`);
      }
    }
  });

  if (missing.length > 0) {
    console.log();
    console.log('❌ Missing required environment variables!');
    console.log('Please add the following to your .env.local file:');
    missing.forEach(varName => {
      console.log(`  ${varName}=your-value-here`);
    });
    process.exit(1);
  }

  console.log();
  console.log('📧 Creating test transporter with debug mode...');
  
  const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
  // Port 465 uses secure: true (direct SSL), port 587 uses secure: false (STARTTLS)
  // Default: secure=true for port 465, secure=false for other ports (like 587)
  const smtpSecure = process.env.SMTP_SECURE 
    ? process.env.SMTP_SECURE === 'true' 
    : smtpPort === 465;
  
  console.log(`  Port: ${smtpPort}, Secure: ${smtpSecure} (${smtpSecure ? 'SSL/TLS' : 'STARTTLS'})`);
  
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: smtpPort,
    secure: smtpSecure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    debug: true, // Enable debug output
    logger: true, // Log to console
  });

  console.log();
  console.log('🔍 Verifying SMTP connection...');
  
  try {
    await transporter.verify();
    console.log('✅ SMTP connection verified successfully!');
  } catch (error) {
    console.error('❌ SMTP connection failed:');
    console.error(error);
    process.exit(1);
  }

  console.log();
  console.log('📨 Preparing test email...');
  
  // Get recipient email (from command line or use SMTP_USER as fallback)
  const toEmail = process.argv[2] || process.env.SMTP_USER;
  
  if (!toEmail) {
    console.error('❌ No recipient email provided!');
    console.log('Usage: npm run test:email <recipient-email>');
    console.log('Or: ts-node scripts/test-email.ts <recipient-email>');
    process.exit(1);
  }

  // For Zoho SMTP, FROM address must match SMTP_USER to avoid relay errors
  const fromEmail = process.env.SMTP_USER || process.env.EMAIL_FROM || '';
  const fromName = process.env.EMAIL_FROM_NAME || 'Sky Growers';
  const replyTo = process.env.EMAIL_REPLY_TO || fromEmail;

  console.log(`  From: "${fromName}" <${fromEmail}>`);
  console.log(`  To: ${toEmail}`);
  console.log(`  Reply-To: ${replyTo}`);
  console.log(`  Subject: Sky Growers Email Test - ${new Date().toLocaleString()}`);
  console.log();
  console.log(`  ℹ️  Note: For Zoho SMTP, FROM address must match SMTP_USER (${process.env.SMTP_USER})`);
  console.log(`     Using SMTP_USER email as FROM to avoid relay errors.`);

  console.log();
  console.log('📤 Sending test email...');
  console.log('-'.repeat(60));
  
  try {
    const info = await transporter.sendMail({
      from: `"${fromName}" <${fromEmail}>`,
      to: toEmail,
      replyTo: replyTo,
      subject: `Sky Growers Email Test - ${new Date().toLocaleString()}`,
      html: testEmailHtml,
      text: 'This is a test email from Sky Growers. If you see this, email is working!',
    });

    console.log('-'.repeat(60));
    console.log();
    console.log('✅ Email sent successfully!');
    console.log();
    console.log('📊 Email Info:');
    console.log(`  Message ID: ${info.messageId}`);
    console.log(`  Response: ${info.response}`);
    console.log(`  Accepted: ${info.accepted.join(', ')}`);
    if (info.rejected.length > 0) {
      console.log(`  Rejected: ${info.rejected.join(', ')}`);
    }
    console.log();
    console.log('🎉 Test completed successfully!');
    console.log('Check your inbox for the test email.');
    
  } catch (error) {
    console.log('-'.repeat(60));
    console.log();
    console.error('❌ Failed to send email:');
    console.error(error);
    process.exit(1);
  }
}

// Run the test
testEmailSending().catch((error) => {
  console.error('Unhandled error:', error);
  process.exit(1);
});

