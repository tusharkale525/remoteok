import { NextResponse } from 'next/server';
import { extractJobDataWithAI } from '@/services/ai/openai';

export async function POST(request: Request) {
  try {
    const { title, description } = await request.json();

    if (!title || !description) {
      return NextResponse.json({ error: 'Title and description are required' }, { status: 400 });
    }

    const extractedData = await extractJobDataWithAI(title, description);
    return NextResponse.json(extractedData);
  } catch (error) {
    console.error('Job parsing error:', error);
    return NextResponse.json({ error: 'Failed to extract job data' }, { status: 500 });
  }
}