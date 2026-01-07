import Redis from 'ioredis';

let redis: Redis | null = null;

export function getRedisClient(): Redis {
  if (!redis) {
    const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
    
    redis = new Redis(redisUrl, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      reconnectOnError(err) {
        const targetErrors = ['READONLY', 'ECONNRESET', 'ETIMEDOUT'];
        if (targetErrors.some(targetError => err.message.includes(targetError))) {
          return true;
        }
        return false;
      },
      lazyConnect: true,
    });

    redis.on('error', (err) => {
      console.error('Redis Client Error:', err);
    });

    redis.on('connect', () => {
      console.log('Redis Client Connected');
    });

    redis.on('ready', () => {
      console.log('Redis Client Ready');
    });

    redis.on('reconnecting', () => {
      console.log('Redis Client Reconnecting');
    });

    // Connect on first call
    redis.connect().catch((err) => {
      console.error('Failed to connect to Redis:', err);
    });
  }

  return redis;
}

export async function closeRedisConnection(): Promise<void> {
  if (redis) {
    await redis.quit();
    redis = null;
  }
}

