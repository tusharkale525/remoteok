import OpenAI from 'openai';

let openaiClient: OpenAI | null = null;

function getOpenAIClient(): OpenAI {
  if (!openaiClient) {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OPENAI_API_KEY environment variable is not set');
    }
    openaiClient = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });
  }
  return openaiClient;
}

export async function generateCompletion(messages: { role: 'system' | 'user' | 'assistant'; content: string }[]) {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages,
    temperature: 0.7,
    max_tokens: 2000,
  });

  return response.choices[0]?.message?.content || '';
}

export async function generateStructuredOutput<T>(schema: object, prompt: string): Promise<T> {
  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [
      {
        role: 'system',
        content: 'You are a helpful assistant that outputs valid JSON matching the specified schema.',
      },
      {
        role: 'user',
        content: `${prompt}\n\nOutput JSON matching this schema: ${JSON.stringify(schema)}`,
      },
    ],
    response_format: { type: 'json_object' },
    temperature: 0.3,
    max_tokens: 2000,
  });

  const content = response.choices[0]?.message?.content;
  if (!content) {
    throw new Error('No response from OpenAI');
  }

  return JSON.parse(content) as T;
}

export async function generateEmbeddings(text: string): Promise<number[]> {
  const client = getOpenAIClient();
  const response = await client.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
  });

  return response.data[0]?.embedding || [];
}

export async function parseResumeWithAI(resumeText: string) {
  const schema = {
    name: 'string',
    email: 'string',
    phone: 'string | null',
    location: 'string | null',
    skills: ['string'],
    experience: [{
      title: 'string',
      company: 'string',
      startDate: 'string',
      endDate: 'string | null',
      isCurrent: 'boolean',
      description: 'string | null',
    }],
    education: [{
      institution: 'string',
      degree: 'string',
      field: 'string | null',
      startDate: 'string',
      endDate: 'string | null',
    }],
    certifications: [{
      name: 'string',
      issuer: 'string',
      date: 'string | null',
      url: 'string | null',
    }],
    projects: [{
      name: 'string',
      description: 'string | null',
      technologies: ['string | null'],
    }],
    languages: ['string'],
    summary: 'string | null',
  };

  const prompt = `Parse the following resume text and extract structured information:\n\n${resumeText}`;

  return generateStructuredOutput(schema, prompt);
}

export async function extractJobDataWithAI(title: string, description: string) {
  const schema = {
    title: 'string',
    description: 'string',
    skills: ['string'],
    budget: { min: 'number', max: 'number' },
    duration: 'string',
    complexity: 'number (1-10)',
    urgency: 'LOW | MEDIUM | HIGH | CRITICAL',
  };

  const prompt = `Analyze this job posting:\n\nTitle: ${title}\n\nDescription: ${description}`;

  return generateStructuredOutput(schema, prompt);
}

export async function generateProposalWithAI(params: {
  projectTitle: string;
  projectDescription: string;
  freelancerName: string;
  freelancerSkills: string[];
  hourlyRate: number;
  experienceYears: number;
  clientBudget?: number;
}) {
  const schema = {
    coverLetter: 'string (brief intro)',
    description: 'string (detailed approach)',
    bidAmount: { min: 'number', max: 'number' },
    estimatedDays: 'number',
    milestones: [{ title: 'string', amount: 'number', days: 'number' }],
  };

  const prompt = `Generate a proposal for this project:\n\nTitle: ${params.projectTitle}\n\nDescription: ${params.projectDescription}\n\nFreelancer: ${params.freelancerName}\n\nSkills: ${params.freelancerSkills.join(', ')}\n\nHourly Rate: $${params.hourlyRate}\n\nExperience: ${params.experienceYears} years\n\nClient Budget: ${params.clientBudget ? `$${params.clientBudget}` : 'Not specified'}`;

  return generateStructuredOutput(schema, prompt);
}

export async function calculateBidPricing(params: {
  projectTitle: string;
  projectDescription: string;
  freelancerHourlyRate: number;
  estimatedHours: number;
}) {
  const schema = {
    recommendedBid: { min: 'number', max: 'number' },
    marketRate: { min: 'number', max: 'number' },
    competitionLevel: 'low | medium | high',
    demandLevel: 'low | medium | high',
    confidence: 'number (0-100)',
    factors: ['string'],
  };

  const prompt = `Calculate fair pricing for this project:\n\nTitle: ${params.projectTitle}\n\nDescription: ${params.projectDescription}\n\nFreelancer Rate: $${params.freelancerHourlyRate}/hour\n\nEstimated Hours: ${params.estimatedHours}`;

  return generateStructuredOutput(schema, prompt);
}

export async function generateContractWithAI(params: {
  projectTitle: string;
  projectDescription: string;
  budget: number;
  milestones: { title: string; amount: number }[];
  includeNDA: boolean;
  includeIPClause: boolean;
  clientName: string;
  freelancerName: string;
}) {
  const schema = {
    title: 'string',
    terms: 'string (detailed contract terms)',
    clauses: [{
      name: 'string',
      description: 'string',
      isIncluded: 'boolean',
    }],
    paymentSchedule: 'string',
    ipRights: 'string',
    ndaTerms: 'string (if NDA included)',
  };

  const prompt = `Generate a freelance contract for:\n\nProject: ${params.projectTitle}\n\nDescription: ${params.projectDescription}\n\nBudget: $${params.budget}\n\nClient: ${params.clientName}\n\nFreelancer: ${params.freelancerName}\n\nInclude NDA: ${params.includeNDA}\n\nInclude IP Clause: ${params.includeIPClause}`;

  return generateStructuredOutput(schema, prompt);
}

export async function analyzeProfileWithAI(freelancerData: {
  name: string;
  headline?: string;
  summary?: string;
  skills: string[];
  hourlyRate?: number;
  portfolioCount: number;
  completedProjects: number;
  avgRating: number;
}) {
  const schema = {
    overallScore: 'number (0-100)',
    suggestions: [{
      category: 'string',
      type: 'string',
      suggestion: 'string',
      impact: 'high | medium | low',
      priority: 'number',
    }],
    missingSkills: [{
      skill: 'string',
      demand: 'high | medium | low',
      relevance: 'number (0-100)',
    }],
    pricingAdvice: {
      suggestedMinRate: 'number',
      suggestedMaxRate: 'number',
      marketAverage: 'number',
      reasoning: 'string',
    },
  };

  const prompt = `Analyze this freelancer profile:\n\nName: ${freelancerData.name}\n\nHeadline: ${freelancerData.headline || 'Not set'}\n\nSummary: ${freelancerData.summary || 'Not set'}\n\nSkills: ${freelancerData.skills.join(', ')}\n\nHourly Rate: ${freelancerData.hourlyRate ? `$${freelancerData.hourlyRate}` : 'Not set'}\n\nPortfolio Items: ${freelancerData.portfolioCount}\n\nCompleted Projects: ${freelancerData.completedProjects}\n\nAverage Rating: ${freelancerData.avgRating || 'No reviews'}`;

  return generateStructuredOutput(schema, prompt);
}

export async function findMatchesWithAI(params: {
  projectSkills: string[];
  budgetRange: { min: number; max: number };
  duration: string;
}) {
  const schema = [{
    freelancerId: 'string',
    matchScore: 'number (0-100)',
    skillMatch: 'number (0-100)',
    experienceMatch: 'number (0-100)',
    ratingMatch: 'number (0-100)',
    availabilityMatch: 'number (0-100)',
    portfolioMatch: 'number (0-100)',
    reasons: ['string'],
    suggestedBid: { min: 'number', max: 'number' },
  }];

  const prompt = `Find the best freelancer matches for this project:\n\nRequired Skills: ${params.projectSkills.join(', ')}\n\nBudget Range: $${params.budgetRange.min} - $${params.budgetRange.max}\n\nDuration: ${params.duration}`;

  return generateStructuredOutput(schema, prompt);
}

export async function chatWithAI(messages: { role: 'user' | 'assistant'; content: string }[]) {
  const systemMessage = {
    role: 'system' as const,
    content: `You are an AI assistant for Remoteok, an AI-powered freelance marketplace. 
You help freelancers with:
- Profile optimization
- Proposal writing
- Bid pricing suggestions
- Contract questions
- General career advice

Be helpful, concise, and professional. Focus on actionable advice.`,
  };

  const client = getOpenAIClient();
  const response = await client.chat.completions.create({
    model: 'gpt-4o',
    messages: [systemMessage, ...messages],
    temperature: 0.7,
    max_tokens: 1000,
  });

  return response.choices[0]?.message?.content || '';
}