import { NextResponse } from 'next/server';
import { findMatchesWithAI } from '@/services/ai/openai';

export async function POST(request: Request) {
  try {
    const params = await request.json();

    if (!params.projectId || !params.requiredSkills || !params.budgetRange) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const matches = await findMatchesWithAI(params);
    return NextResponse.json(matches);
  } catch (error) {
    console.error('Match finding error:', error);
    return NextResponse.json({ error: 'Failed to find matches' }, { status: 500 });
  }
}