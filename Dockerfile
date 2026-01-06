# ============================================
# Production Dockerfile for Sky Growers
# ============================================
# This Dockerfile contains all steps needed to deploy the project
# Multi-stage build for optimized production image
# ============================================

# ============================================
# Stage 1: Base Image
# ============================================
FROM node:20-alpine AS base

# Install system dependencies
RUN apk add --no-cache \
    libc6-compat \
    && rm -rf /var/cache/apk/*

# Set working directory
WORKDIR /app

# ============================================
# Stage 2: Install Dependencies
# ============================================
FROM base AS deps

# Copy package files
COPY package.json package-lock.json* ./

# Install all dependencies (needed for build)
RUN npm ci && \
    npm cache clean --force

# ============================================
# Stage 3: Build Application
# ============================================
FROM base AS builder

# Copy dependencies from previous stage
COPY --from=deps /app/node_modules ./node_modules

# Copy all source files
COPY . .

# Set build-time environment variables
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

# Build argument to enable standalone output
ARG DOCKER_BUILD=true
ENV DOCKER_BUILD=${DOCKER_BUILD}

# Build Next.js application
RUN npm run build

# ============================================
# Stage 4: Production Image
# ============================================
FROM base AS runner

# Set production environment
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# Create non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy public static assets
COPY --from=builder /app/public ./public

# Copy standalone build output
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Copy package.json (needed for standalone mode)
COPY --from=builder /app/package.json ./package.json

# Switch to non-root user
USER nextjs

# Expose application port
EXPOSE 3000

# Set runtime environment variables
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Health check endpoint
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
  CMD node -e "require('http').get('http://localhost:3000/api/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})" || exit 1

# Start the application
CMD ["node", "server.js"]

