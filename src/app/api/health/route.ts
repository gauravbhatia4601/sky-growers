import { NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';

export async function GET() {
  try {
    // Check database connection
    await connectDB();
    
    return NextResponse.json(
      { 
        status: 'healthy',
        timestamp: new Date().toISOString(),
        service: 'sky-growers-api'
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'unhealthy',
        error: 'Database connection failed',
        timestamp: new Date().toISOString()
      },
      { status: 503 }
    );
  }
}

