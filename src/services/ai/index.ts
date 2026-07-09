export interface ParsedResume {
  name: string;
  email: string;
  phone?: string;
  location?: string;
  skills: string[];
  experience: {
    title: string;
    company: string;
    startDate: string;
    endDate?: string;
    isCurrent: boolean;
    description?: string;
  }[];
  education: {
    institution: string;
    degree: string;
    field?: string;
    startDate: string;
    endDate?: string;
  }[];
  certifications: {
    name: string;
    issuer: string;
    date?: string;
    url?: string;
  }[];
  projects: {
    name: string;
    description?: string;
    technologies?: string[];
  }[];
  languages: string[];
  summary?: string;
}

export async function parseResumeWithAI(pdfUrl: string): Promise<ParsedResume> {
  const response = await fetch('/api/ai/resume-parser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ pdfUrl }),
  });

  if (!response.ok) {
    throw new Error('Failed to parse resume');
  }

  return response.json();
}

export interface ExtractedJob {
  title: string;
  description: string;
  skills: string[];
  budget: { min: number; max: number };
  duration: string;
  complexity: number;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
}

export async function extractJobDataWithAI(jobData: {
  title: string;
  description: string;
}): Promise<ExtractedJob> {
  const response = await fetch('/api/ai/job-parser', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(jobData),
  });

  if (!response.ok) {
    throw new Error('Failed to extract job data');
  }

  return response.json();
}

export interface ProposalOutput {
  coverLetter: string;
  description: string;
  bidAmount: { min: number; max: number };
  estimatedDays: number;
  milestones: { title: string; amount: number; days: number }[];
}

export async function generateProposalWithAI(params: {
  projectTitle: string;
  projectDescription: string;
  freelancerProfile: {
    name: string;
    skills: string[];
    hourlyRate: number;
    experienceYears: number;
  };
  clientBudget?: number;
}): Promise<ProposalOutput> {
  const response = await fetch('/api/ai/proposal-generator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error('Failed to generate proposal');
  }

  return response.json();
}

export interface BidPricingOutput {
  recommendedBid: { min: number; max: number };
  marketRate: { min: number; max: number };
  competitionLevel: 'low' | 'medium' | 'high';
  demandLevel: 'low' | 'medium' | 'high';
  confidence: number;
  factors: string[];
}

export async function calculateBidPricing(params: {
  projectTitle: string;
  projectDescription: string;
  freelancerHourlyRate: number;
  estimatedHours: number;
}): Promise<BidPricingOutput> {
  const response = await fetch('/api/ai/bid-pricing', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error('Failed to calculate bid pricing');
  }

  return response.json();
}

export interface ContractOutput {
  title: string;
  terms: string;
  clauses: {
    name: string;
    description: string;
    isIncluded: boolean;
  }[];
  paymentSchedule: string;
  ipRights: string;
  ndaTerms?: string;
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
}): Promise<ContractOutput> {
  const response = await fetch('/api/ai/contract-generator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error('Failed to generate contract');
  }

  return response.json();
}

export interface ProfileAnalysis {
  overallScore: number;
  suggestions: {
    category: string;
    type: string;
    suggestion: string;
    impact: 'high' | 'medium' | 'low';
    priority: number;
  }[];
  missingSkills: {
    skill: string;
    demand: 'high' | 'medium' | 'low';
    relevance: number;
  }[];
  pricingAdvice: {
    suggestedMinRate: number;
    suggestedMaxRate: number;
    marketAverage: number;
    reasoning: string;
  };
}

export async function analyzeProfileWithAI(freelancerId: string): Promise<ProfileAnalysis> {
  const response = await fetch('/api/ai/profile-analyzer', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ freelancerId }),
  });

  if (!response.ok) {
    throw new Error('Failed to analyze profile');
  }

  return response.json();
}

export interface MatchRecommendation {
  freelancerId: string;
  matchScore: number;
  skillMatch: number;
  experienceMatch: number;
  ratingMatch: number;
  availabilityMatch: number;
  portfolioMatch: number;
  reasons: string[];
  suggestedBid: { min: number; max: number };
}

export async function findMatchesWithAI(params: {
  projectId: string;
  requiredSkills: string[];
  budgetRange: { min: number; max: number };
  duration: string;
  limit?: number;
}): Promise<MatchRecommendation[]> {
  const response = await fetch('/api/ai/match-finder', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error('Failed to find matches');
  }

  return response.json();
}

export interface AnalyticsInsights {
  earnings: {
    trend: 'up' | 'down' | 'stable';
    changePercent: number;
    forecast: { month: string; amount: number }[];
  };
  skills: {
    trending: { skill: string; growth: number }[];
    recommended: { skill: string; demand: number }[];
  };
  performance: {
    completionRate: number;
    avgRating: number;
    responseTime: string;
    suggestions: string[];
  };
}

export async function getAnalyticsInsights(profileId: string): Promise<AnalyticsInsights> {
  const response = await fetch('/api/ai/analytics-insights', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ profileId }),
  });

  if (!response.ok) {
    throw new Error('Failed to get analytics insights');
  }

  return response.json();
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export async function chatWithAI(messages: ChatMessage[]): Promise<string> {
  const response = await fetch('/api/ai/chat', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ messages }),
  });

  if (!response.ok) {
    throw new Error('Failed to chat with AI');
  }

  const data = await response.json();
  return data.content;
}

export async function generateEmbeddings(text: string, type: 'resume' | 'job' | 'profile' | 'proposal'): Promise<number[]> {
  const response = await fetch('/api/ai/embeddings', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, type }),
  });

  if (!response.ok) {
    throw new Error('Failed to generate embeddings');
  }

  const data = await response.json();
  return data.embeddings;
}

export async function semanticSearch(params: {
  query: string;
  type: 'resume' | 'job' | 'profile' | 'proposal';
  limit?: number;
  filters?: Record<string, unknown>;
}): Promise<{ id: string; score: number }[]> {
  const response = await fetch('/api/ai/semantic-search', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error('Failed to perform semantic search');
  }

  return response.json();
}