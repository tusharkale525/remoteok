import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q');
    const type = searchParams.get('type') || 'all';
    const limit = parseInt(searchParams.get('limit') || '20');

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    if (type === 'projects' || type === 'all') {
      const { data: projectResults, error: projectError } = await supabase
        .from('projects')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('status', 'OPEN')
        .limit(limit)
        .order('created_at', { ascending: false });

      if (projectError) {
        console.error('Project search error:', projectError);
      }
    }

    if (type === 'users' || type === 'all') {
      const { data: userResults, error: userError } = await supabase
        .from('profiles')
        .select('*, users(*)')
        .or(`headline.ilike.%${query}%,summary.ilike.%${query}%`)
        .limit(limit)
        .order('rating', { ascending: false });

      if (userError) {
        console.error('User search error:', userError);
      }
    }

    if (type === 'jobs' || type === 'all') {
      const { data: jobResults, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .or(`title.ilike.%${query}%,description.ilike.%${query}%`)
        .eq('status', 'active')
        .limit(limit)
        .order('created_at', { ascending: false });

      if (jobError) {
        console.error('Job search error:', jobError);
      }
    }

    return NextResponse.json({
      message: 'Search functionality ready. Implement PostgreSQL full-text search for production.',
    });
  } catch (error) {
    console.error('Search error:', error);
    return NextResponse.json({ error: 'Search failed' }, { status: 500 });
  }
}