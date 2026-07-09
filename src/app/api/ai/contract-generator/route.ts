import { NextResponse } from 'next/server';
import { generateContractWithAI } from '@/services/ai/openai';

export async function POST(request: Request) {
  try {
    const params = await request.json();

    if (!params.projectTitle || !params.budget || !params.clientName || !params.freelancerName) {
      return NextResponse.json({ error: 'Missing required parameters' }, { status: 400 });
    }

    const contract = await generateContractWithAI(params);
    return NextResponse.json(contract);
  } catch (error) {
    console.error('Contract generation error:', error);
    return NextResponse.json({ error: 'Failed to generate contract' }, { status: 500 });
  }
}