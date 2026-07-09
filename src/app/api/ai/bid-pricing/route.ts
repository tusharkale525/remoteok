import { NextResponse } from 'next/server';
import { calculateBidPricing } from '@/services/ai/openai';

export async function POST(request: Request) {
  try {
    const params = await request.json();

    if (!params.projectTitle || !params.projectDescription || !params.freelancerHourlyRate) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const pricing = await calculateBidPricing(params);
    return NextResponse.json(pricing);
  } catch (error) {
    console.error('Bid pricing error:', error);
    return NextResponse.json({ error: 'Failed to calculate bid pricing' }, { status: 500 });
  }
}