# Sky Growers - Farm Fresh Vegetables

A Next.js application for managing a farm-fresh vegetable business in Christchurch, New Zealand.

## Features

- 🌱 **Public Order Form**: Customers can submit order inquiries through a contact form
- 📦 **Admin Dashboard**: Complete admin panel for managing products, orders, and inventory
- 📊 **Analytics**: Track revenue, orders, and product performance
- 🖨️ **Order Printing**: Print-friendly order details with auto-print functionality
- 🔐 **Secure Authentication**: NextAuth.js based admin authentication
- 📱 **Responsive Design**: Mobile-friendly UI built with Tailwind CSS

## Tech Stack

- **Framework**: Next.js 15.3.4
- **Language**: TypeScript
- **Database**: MongoDB with Mongoose
- **Authentication**: NextAuth.js v5
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI, Shadcn UI
- **Validation**: Zod

## Getting Started

### Prerequisites

- Node.js 20 or higher
- MongoDB database
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
MONGODB_URI=mongodb://localhost:27017/skygrowers
NEXTAUTH_SECRET=your-secret-key-here
NEXTAUTH_URL=http://localhost:3000
NEXT_PUBLIC_SITE_URL=http://localhost:3000
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

## Deployment

See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy to Vercel

1. Push code to GitHub
2. Import repository in Vercel
3. Add environment variables
4. Deploy

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB connection string | Yes |
| `NEXTAUTH_SECRET` | Secret key for NextAuth.js | Yes |
| `NEXTAUTH_URL` | Base URL for authentication | Yes |
| `NEXT_PUBLIC_SITE_URL` | Public site URL | Yes |
| `NODE_ENV` | Environment (development/production) | Yes |

## License

Private - All rights reserved
