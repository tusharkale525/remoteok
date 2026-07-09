import { NextResponse } from 'next/server';
import { parseResumeWithAI } from '@/services/ai/openai';

export async function POST(request: Request) {
  try {
    const { resumeText } = await request.json();

    if (!resumeText) {
      return NextResponse.json({ error: 'Resume text is required' }, { status: 400 });
    }

    const parsedData = await parseResumeWithAI(resumeText);
    return NextResponse.json(parsedData);
  } catch (error) {
    console.error('Resume parsing error:', error);
    return NextResponse.json({ error: 'Failed to parse resume' }, { status: 500 });
  }
}