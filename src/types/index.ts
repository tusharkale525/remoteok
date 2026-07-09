import { z } from 'zod';

export const userRoles = ['FREELANCER', 'CLIENT', 'ADMIN', 'SUPERADMIN'] as const;
export const userStatuses = ['ACTIVE', 'INACTIVE', 'SUSPENDED', 'PENDING'] as const;
export const projectStatuses = ['DRAFT', 'OPEN', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED', 'DISPUTED', 'ARCHIVED'] as const;
export const proposalStatuses = ['DRAFT', 'SUBMITTED', 'SHORTLISTED', 'ACCEPTED', 'REJECTED', 'WITHDRAWN'] as const;
export const contractStatuses = ['DRAFT', 'PENDING_SIGNATURE', 'ACTIVE', 'COMPLETED', 'CANCELLED', 'DISPUTED'] as const;
export const milestoneStatuses = ['DRAFT', 'IN_PROGRESS', 'SUBMITTED', 'APPROVED', 'REJECTED', 'PAID', 'DISPUTED'] as const;
export const paymentStatuses = ['PENDING', 'ESCROWED', 'RELEASED', 'REFUNDED', 'FAILED'] as const;
export const skillLevels = ['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT'] as const;
export const bidTypes = ['FIXED', 'HOURLY', 'MILESTONE'] as const;

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

export const registerSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Password must contain at least one uppercase letter').regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  role: z.enum(['FREELANCER', 'CLIENT']),
  termsAccepted: z.boolean().refine(v => v === true, 'You must accept the terms'),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const forgotPasswordSchema = z.object({
  email: z.string().email('Invalid email address'),
});

export const resetPasswordSchema = z.object({
  password: z.string().min(8, 'Password must be at least 8 characters').regex(/[A-Z]/, 'Password must contain at least one uppercase letter').regex(/[0-9]/, 'Password must contain at least one number'),
  confirmPassword: z.string(),
  token: z.string(),
}).refine(data => data.password === data.confirmPassword, {
  message: 'Passwords do not match',
  path: ['confirmPassword'],
});

export const profileOnboardingSchema = z.object({
  headline: z.string().min(10, 'Headline must be at least 10 characters').max(100, 'Headline must be less than 100 characters'),
  summary: z.string().min(50, 'Summary must be at least 50 characters').max(1000, 'Summary must be less than 1000 characters'),
  hourlyRate: z.number().min(5, 'Minimum rate is $5').max(1000, 'Maximum rate is $1000'),
  availability: z.enum(['full-time', 'part-time', 'contract', 'freelance']),
  skills: z.array(z.object({
    id: z.string(),
    name: z.string(),
    level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']),
    yearsExp: z.number().optional(),
  })).min(1, 'Select at least one skill'),
  yearsOfExperience: z.number().min(0).max(50),
  languages: z.array(z.string()).min(1, 'Select at least one language'),
  timezone: z.string(),
  country: z.string(),
  city: z.string(),
});

export const projectCreateSchema = z.object({
  title: z.string().min(10, 'Title must be at least 10 characters').max(200, 'Title must be less than 200 characters'),
  description: z.string().min(100, 'Description must be at least 100 characters').max(5000, 'Description must be less than 5000 characters'),
  budget: z.number().min(50, 'Minimum budget is $50'),
  budgetType: z.enum(['FIXED', 'HOURLY', 'MILESTONE']),
  duration: z.string().min(1, 'Duration is required'),
  urgency: z.enum(['LOW', 'MEDIUM', 'HIGH', 'CRITICAL']),
  skills: z.array(z.object({
    id: z.string(),
    name: z.string(),
  })).min(1, 'Select at least one skill'),
});

export const proposalCreateSchema = z.object({
  coverLetter: z.string().min(50, 'Cover letter must be at least 50 characters').max(2000, 'Cover letter must be less than 2000 characters'),
  description: z.string().min(100, 'Description must be at least 100 characters').max(5000, 'Description must be less than 5000 characters'),
  bidAmount: z.number().min(10, 'Bid amount must be at least $10'),
  bidType: z.enum(['FIXED', 'HOURLY', 'MILESTONE']),
  estimatedDays: z.number().min(1, 'Estimated days must be at least 1'),
  milestones: z.array(z.object({
    title: z.string().min(3),
    amount: z.number().min(1),
    days: z.number().min(1),
  })).optional(),
});

export const contractCreateSchema = z.object({
  title: z.string().min(5).max(200),
  description: z.string().max(2000),
  value: z.number().min(1),
  startDate: z.date(),
  endDate: z.date().optional(),
  contractType: z.enum(['freelance', 'nda', 'ip', 'custom']),
  terms: z.string().max(5000).optional(),
  ipClause: z.boolean().default(true),
  ndaClause: z.boolean().default(false),
  paymentTerms: z.string().optional(),
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, 'Review must be at least 10 characters').max(1000, 'Review must be less than 1000 characters'),
});

export const messageSchema = z.object({
  content: z.string().min(1).max(5000),
  type: z.enum(['TEXT', 'IMAGE', 'FILE', 'SYSTEM']).default('TEXT'),
  receiverId: z.string(),
  projectId: z.string().optional(),
});

export const supportTicketSchema = z.object({
  subject: z.string().min(5).max(200),
  description: z.string().min(20).max(5000),
  category: z.enum(['technical', 'billing', 'account', 'dispute', 'other']),
  priority: z.enum(['low', 'medium', 'high', 'urgent']).default('medium'),
});

export const reportSchema = z.object({
  type: z.enum(['user', 'project', 'message', 'review']),
  reason: z.string().min(10).max(500),
  description: z.string().max(1000).optional(),
  reportedId: z.string().optional(),
  projectId: z.string().optional(),
});

export const skillSearchSchema = z.object({
  query: z.string().min(1),
  level: z.enum(['BEGINNER', 'INTERMEDIATE', 'ADVANCED', 'EXPERT']).optional(),
  limit: z.number().min(1).max(100).default(20),
});

export const paginationSchema = z.object({
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(100).default(20),
  sortBy: z.string().optional(),
  sortOrder: z.enum(['asc', 'desc']).default('desc'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type RegisterInput = z.infer<typeof registerSchema>;
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>;
export type ResetPasswordInput = z.infer<typeof resetPasswordSchema>;
export type ProfileOnboardingInput = z.infer<typeof profileOnboardingSchema>;
export type ProjectCreateInput = z.infer<typeof projectCreateSchema>;
export type ProposalCreateInput = z.infer<typeof proposalCreateSchema>;
export type ContractCreateInput = z.infer<typeof contractCreateSchema>;
export type ReviewInput = z.infer<typeof reviewSchema>;
export type MessageInput = z.infer<typeof messageSchema>;
export type SupportTicketInput = z.infer<typeof supportTicketSchema>;
export type ReportInput = z.infer<typeof reportSchema>;
export type PaginationInput = z.infer<typeof paginationSchema>;