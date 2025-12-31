import { NextRequest, NextResponse } from 'next/server';
import connectDB from '@/lib/db/connect';
import { requireAuth } from '@/lib/auth/middleware';
import { calculateAnalytics } from '@/lib/utils/analytics';

export async function GET(request: NextRequest) {
  try {
    const authError = await requireAuth(request);
    if (authError) return authError;

    await connectDB();

    const { searchParams } = new URL(request.url);
    const period = (searchParams.get('period') || 'monthly') as 'daily' | 'weekly' | 'monthly';
    const startDateParam = searchParams.get('startDate');
    const endDateParam = searchParams.get('endDate');

    let startDate: Date;
    let endDate: Date = new Date();

    if (startDateParam && endDateParam) {
      startDate = new Date(startDateParam);
      endDate = new Date(endDateParam);
    } else {
      // Default to last period based on selected period
      endDate = new Date();
      startDate = new Date();

      switch (period) {
        case 'daily':
          startDate.setDate(startDate.getDate() - 30); // Last 30 days
          break;
        case 'weekly':
          startDate.setDate(startDate.getDate() - 84); // Last 12 weeks
          break;
        case 'monthly':
          startDate.setMonth(startDate.getMonth() - 12); // Last 12 months
          break;
      }
    }

    const analytics = await calculateAnalytics(startDate, endDate, period);

    return NextResponse.json(analytics);
  } catch (error) {
    console.error('Error calculating analytics:', error);
    return NextResponse.json(
      { error: 'Failed to calculate analytics' },
      { status: 500 }
    );
  }
}

