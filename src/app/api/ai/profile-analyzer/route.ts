import { NextResponse } from 'next/server';
import { analyzeProfileWithAI } from '@/services/ai/openai';

export async function POST(request: Request) {
  try {
    const freelancerData = await request.json();

    if (!freelancerData.name) {
      return NextResponse.json({ error: 'Freelancer name is required' }, { status: 400 });
    }

    const analysis = await analyzeProfileWithAI(freelancerData);
    return NextResponse.json(analysis);
  } catch (error) {
    console.error('Profile analysis error:', error);
    return NextResponse.json({ error: 'Failed to analyze profile' }, { status: 500 });
  }
}