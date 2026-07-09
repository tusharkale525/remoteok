import { NextResponse } from 'next/server';
import { chatWithAI } from '@/services/ai/openai';

export async function POST(request: Request) {
  try {
    const { messages } = await request.json();

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json({ error: 'Messages array is required' }, { status: 400 });
    }

    const response = await chatWithAI(messages);
    return NextResponse.json({ content: response });
  } catch (error) {
    console.error('Chat error:', error);
    return NextResponse.json({ error: 'Failed to chat with AI' }, { status: 500 });
  }
}