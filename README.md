# Sky Growers - Farm Fresh Vegetables

A Next.js application for managing a farm-fresh vegetable business in Christchurch, New Zealand.

## Features

- 🌱 **Public Order Form**: Customers can submit order inquiries through a contact form
- 📦 **Admin Dashboard**: Complete admin panel for managing products, orders, and inventory
- 📊 **Analytics**: Track revenue, orders, and product performance
- 🖨️ **Order Printing**: Print-friendly order details with auto-print functionality
- 📧 **Email Notifications**: Async email system with Redis queue for order updates
- 🔐 **Secure Authentication**: NextAuth.js based admin authentication
- 🛡️ **Security Features**: Rate limiting, spam detection, honeypot fields, input sanitization
- 📱 **Responsive Design**: Mobile-friendly UI built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15.3.4
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Cache/Queue**: Redis with ioredis
- **Email**: Nodemailer with Zoho SMTP
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Shadcn UI
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 20 or higher
- MongoDB database (local or MongoDB Atlas)
- Redis (local or Redis Cloud)
- Zoho SMTP account for emails
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd sky-growers
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Database
MONGODB_URI=mongodb://localhost:27017/skygrowers

# Redis
REDIS_URL=redis://localhost:6379

# NextAuth
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000

# Site
NEXT_PUBLIC_SITE_URL=http://localhost:3000

# Email (Zoho SMTP)
SMTP_HOST=smtp.zoho.com
SMTP_PORT=587
SMTP_USER=your-email@zoho.com
SMTP_PASS=your-app-password
EMAIL_FROM_NAME=Sky Growers
EMAIL_REPLY_TO=support@skygrowers.com
ADMIN_ORDER_EMAILS=admin@skygrowers.com

# Cron Security
CRON_SECRET=your-random-secret-here

# Environment
NODE_ENV=development
```

4. Create admin user:
```bash
npx tsx scripts/seed-admin.ts
```

5. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── src/
│   ├── app/                 # Next.js app router pages
│   │   ├── admin/          # Admin panel routes
│   │   ├── api/            # API routes
│   │   └── ...             # Public pages
│   ├── components/         # React components
│   ├── lib/                # Utilities and configurations
│   │   ├── db/            # Database models and connection
│   │   ├── auth/          # Authentication configuration
│   │   └── utils/         # Utility functions
│   └── types/             # TypeScript type definitions
├── scripts/               # Utility scripts
└── public/               # Static assets
```

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint
- `npm run test:email <email>` - Test email configuration with debug output

## Deployment

### Deploy on Coolify (Recommended)

See [DEPLOYMENT_COOLIFY.md](./DEPLOYMENT_COOLIFY.md) for complete Coolify deployment guide.

**Quick Steps:**
1. Create application in Coolify
2. Add Redis and MongoDB services
3. Configure environment variables
4. Set up cron job for email processing
5. Deploy

### Deploy on Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables (including Redis and MongoDB)
4. Add Vercel cron configuration in `vercel.json`
5. Deploy

**Note**: Vercel deployment requires external Redis and MongoDB services.

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `REDIS_URL` | Redis connection URL | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js (32+ chars) | Yes |
| `NEXTAUTH_URL` | Base URL for authentication | Yes |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | Yes |
| `SMTP_HOST` | SMTP server host (e.g., smtp.zoho.com) | Yes |
| `SMTP_PORT` | SMTP server port (587 or 465) | Yes |
| `SMTP_USER` | SMTP authentication username | Yes |
| `SMTP_PASS` | SMTP authentication password | Yes |
| `EMAIL_FROM_NAME` | Display name for emails | No |
| `EMAIL_REPLY_TO` | Reply-to email address | No |
| `ADMIN_ORDER_EMAILS` | Comma-separated admin emails | Yes |
| `CRON_SECRET` | Secret for cron endpoint security | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |

## License

Private - All rights reserved
