import nodemailer from 'nodemailer';
import type { Transporter } from 'nodemailer';

let transporter: Transporter | null = null;

export function getEmailTransporter(): Transporter {
  if (!transporter) {
    const smtpHost = process.env.SMTP_HOST || 'smtp.zoho.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '587', 10);
    // Port 465 uses secure: true (direct SSL), port 587 uses secure: false (STARTTLS)
    // Default: secure=true for port 465, secure=false for other ports (like 587)
    const smtpSecure = process.env.SMTP_SECURE 
      ? process.env.SMTP_SECURE === 'true' 
      : smtpPort === 465;
    const smtpUser = process.env.SMTP_USER || '';
    const smtpPass = process.env.SMTP_PASS || '';

    transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    });

    // Verify configuration
    transporter.verify((error) => {
      if (error) {
        console.error('SMTP Transport Error:', error);
      } else {
        console.log('SMTP Transport Ready');
      }
    });
  }

  return transporter;
}

export function getEmailFromAddress(): string {
  // For Zoho SMTP, FROM address must match the authenticated SMTP_USER to avoid relay errors
  // EMAIL_FROM can be used for display name only, but email must be SMTP_USER
  const smtpUser = process.env.SMTP_USER || '';
  const fromName = process.env.EMAIL_FROM_NAME || 'Sky Growers';
  
  // Use SMTP_USER as the actual email address (required for Zoho)
  const fromEmail = smtpUser || process.env.EMAIL_FROM || 'noreply@skygrowers.com';
  
  return `"${fromName}" <${fromEmail}>`;
}

export function getAdminEmails(): string[] {
  const adminEmails = process.env.ADMIN_ORDER_EMAILS || '';
  return adminEmails.split(',').map(email => email.trim()).filter(Boolean);
}

export async function sendEmail(
  to: string,
  subject: string,
  html: string
): Promise<void> {
  const transporter = getEmailTransporter();
  const from = getEmailFromAddress();
  // Reply-To can be different, but use SMTP_USER as fallback
  const replyTo = process.env.EMAIL_REPLY_TO || process.env.SMTP_USER || process.env.EMAIL_FROM || 'noreply@skygrowers.com';

  try {
    await transporter.sendMail({
      from,
      to,
      replyTo,
      subject,
      html,
    });
    console.log(`Email sent to ${to}: ${subject}`);
  } catch (error) {
    console.error(`Failed to send email to ${to}:`, error);
    throw error;
  }
}

