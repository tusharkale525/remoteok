import { NextResponse } from 'next/server';
import { generateProposalWithAI } from '@/services/ai/openai';

export async function POST(request: Request) {
  try {
    const params = await request.json();

    if (!params.projectTitle || !params.projectDescription) {
      return NextResponse.json({ error: 'Project details are required' }, { status: 400 });
    }

    const proposal = await generateProposalWithAI(params);
    return NextResponse.json(proposal);
  } catch (error) {
    console.error('Proposal generation error:', error);
    return NextResponse.json({ error: 'Failed to generate proposal' }, { status: 500 });
  }
}