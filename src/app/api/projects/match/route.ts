import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { projectId } = await request.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: project, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error || !project) {
      return NextResponse.json({ error: 'Project not found' }, { status: 404 });
    }

    const { data: freelancers, error: queryError } = await supabase.rpc('match_freelancers', {
      project_id: projectId,
      project_skills: project.ai_extracted_skills || [],
      budget_min: project.budget ? Number(project.budget) * 0.7 : 0,
      budget_max: project.budget ? Number(project.budget) * 1.3 : 100000,
    });

    if (queryError) {
      console.error('Match query error:', queryError);
      return NextResponse.json({ error: 'Failed to find matches' }, { status: 500 });
    }

    return NextResponse.json(freelancers || []);
  } catch (error) {
    console.error('Match finding error:', error);
    return NextResponse.json({ error: 'Failed to find matches' }, { status: 500 });
  }
}