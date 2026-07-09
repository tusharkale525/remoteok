import { NextResponse } from 'next/server';
import { generateEmbeddings } from '@/services/ai/openai';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { text, type, userId, jobId } = await request.json();

    if (!text || !type) {
      return NextResponse.json({ error: 'Text and type are required' }, { status: 400 });
    }

    const embeddings = await generateEmbeddings(text);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { error } = await supabase.from('embeddings').insert({
      type,
      content: text,
      vector: embeddings,
      user_id: userId,
      job_id: jobId,
    });

    if (error) {
      console.error('Database error:', error);
    }

    return NextResponse.json({ embeddings });
  } catch (error) {
    console.error('Embeddings error:', error);
    return NextResponse.json({ error: 'Failed to generate embeddings' }, { status: 500 });
  }
}