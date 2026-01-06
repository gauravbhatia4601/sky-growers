# Deployment Guide

This document provides instructions for deploying the Sky Growers application to production.

## Environment Variables

Create a `.env.production` or set these in your hosting platform:

### Required Variables

```bash
# MongoDB Connection
MONGODB_URI=mongodb://your-production-mongodb-uri

# NextAuth Configuration
NEXTAUTH_SECRET=your-production-secret-key
NEXTAUTH_URL=https://your-domain.com

# Site URL
NEXT_PUBLIC_SITE_URL=https://your-domain.com

# Node Environment
NODE_ENV=production
```

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub/GitLab/Bitbucket
2. Import your repository in Vercel
3. Add environment variables in Vercel dashboard
4. Deploy

Vercel will automatically detect Next.js and use the correct build settings.

### Docker Deployment

1. Build the Docker image:
   ```bash
   docker build -t sky-growers --build-arg DOCKER_BUILD=true .
   ```

2. Run the container:
   ```bash
   docker run -p 3000:3000 \
     -e MONGODB_URI=your-mongodb-uri \
     -e NEXTAUTH_SECRET=your-secret \
     -e NEXTAUTH_URL=https://your-domain.com \
     -e NEXT_PUBLIC_SITE_URL=https://your-domain.com \
     sky-growers
   ```

### Other Platforms

For other platforms (AWS, Railway, Render, etc.), use the standard Next.js deployment:

1. Install dependencies: `npm ci`
2. Build: `npm run build`
3. Start: `npm start`

## Pre-Deployment Checklist

- [ ] Set all required environment variables
- [ ] Test database connection
- [ ] Verify NEXTAUTH_SECRET is set
- [ ] Set NEXT_PUBLIC_SITE_URL to production domain
- [ ] Create admin user using seed script
- [ ] Test authentication flow
- [ ] Verify API endpoints work
- [ ] Check build completes without errors
- [ ] Test order creation flow
- [ ] Verify print functionality

## Post-Deployment Tasks

1. Create admin user:
   ```bash
   npx tsx scripts/seed-admin.ts
   ```

2. Verify stats are synced:
   - Access admin dashboard
   - Check that stats are displaying correctly
   - If needed, run stats sync (to be implemented)

3. Monitor logs for errors

4. Test critical paths:
   - Public order form submission
   - Admin login
   - Order management
   - Product management
   - Inventory management

## Security Notes

- Never commit `.env.local` or `.env.production` files
- Use strong, randomly generated NEXTAUTH_SECRET
- Ensure MongoDB connection string is secure
- Enable HTTPS in production
- Review and update security headers as needed

