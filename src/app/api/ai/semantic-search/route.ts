import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { generateEmbeddings } from '@/services/ai/openai';

export async function POST(request: Request) {
  try {
    const { query, type, limit = 20 } = await request.json();

    if (!query || !type) {
      return NextResponse.json({ error: 'Query and type are required' }, { status: 400 });
    }

    const queryEmbedding = await generateEmbeddings(query);

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data, error } = await supabase.rpc('match_embeddings', {
      query_embedding: queryEmbedding,
      match_threshold: 0.7,
      match_count: limit,
      filter_type: type,
    });

    if (error) {
      console.error('Search error:', error);
      return NextResponse.json({ error: 'Search failed' }, { status: 500 });
    }

    return NextResponse.json(data || []);
  } catch (error) {
    console.error('Semantic search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}