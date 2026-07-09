export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string;
          email: string;
          email_verified: string | null;
          name: string | null;
          image: string | null;
          role: 'FREELANCER' | 'CLIENT' | 'ADMIN' | 'SUPERADMIN';
          status: 'ACTIVE' | 'INACTIVE' | 'SUSPENDED' | 'PENDING';
          created_at: string;
          updated_at: string;
          last_login_at: string | null;
          mfa_enabled: boolean;
          mfa_secret: string | null;
          avatar_url: string | null;
          bio: string | null;
          phone: string | null;
          location: string | null;
          timezone: string | null;
        };
        Insert: Omit<Database['public']['Tables']['users']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['users']['Insert']>;
      };
      profiles: {
        Row: {
          id: string;
          user_id: string;
          headline: string | null;
          summary: string | null;
          completion_status: 'INCOMPLETE' | 'PARTIAL' | 'COMPLETE';
          hourly_rate: number | null;
          availability: string | null;
          is_available: boolean;
          years_of_experience: number | null;
          employment_type: string | null;
          languages: string[] | null;
          linkedin_url: string | null;
          github_url: string | null;
          figma_url: string | null;
          notion_url: string | null;
          website_url: string | null;
          portfolio_url: string | null;
          timezone: string | null;
          country: string | null;
          city: string | null;
          address: string | null;
          lat: number | null;
          lng: number | null;
          completed_onboarding: boolean;
          onboarding_step: number;
          rating: number | null;
          total_earnings: number;
          success_rate: number | null;
          response_time: number | null;
          project_count: number;
          referral_code: string;
          referred_by_code: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['profiles']['Row'], 'id' | 'created_at' | 'updated_at' | 'referral_code' | 'total_earnings' | 'project_count' | 'onboarding_step' | 'completion_status' | 'is_available' | 'completed_onboarding'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['profiles']['Insert']>;
      };
      skills: {
        Row: {
          id: string;
          name: string;
          category: string | null;
          description: string | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['skills']['Row'], 'id' | 'created_at'> & { id?: string; created_at?: string };
        Update: Partial<Database['public']['Tables']['skills']['Insert']>;
      };
      projects: {
        Row: {
          id: string;
          title: string;
          description: string;
          status: 'DRAFT' | 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED' | 'ARCHIVED';
          budget: number | null;
          budget_type: 'FIXED' | 'HOURLY' | 'MILESTONE' | null;
          urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL';
          visibility: string;
          client_id: string;
          created_at: string;
          updated_at: string;
          deadline: string | null;
          start_date: string | null;
          completed_at: string | null;
          estimated_hours: number | null;
          actual_hours: number | null;
          ai_score: number | null;
          ai_summary: string | null;
          ai_extracted_skills: string[] | null;
        };
        Insert: Omit<Database['public']['Tables']['projects']['Row'], 'id' | 'created_at' | 'updated_at'> & { id?: string; created_at?: string; updated_at?: string };
        Update: Partial<Database['public']['Tables']['projects']['Insert']>;
      };
      proposals: {
        Row: {
          id: string;
          cover_letter: string | null;
          description: string;
          status: 'DRAFT' | 'SUBMITTED' | 'SHORTLISTED' | 'ACCEPTED' | 'REJECTED' | 'WITHDRAWN';
          bid_amount: number;
          bid_type: 'FIXED' | 'HOURLY' | 'MILESTONE';
          estimated_days: number | null;
          milestones: Json | null;
          ai_generated: boolean;
          ai_match_score: number | null;
          ai_analysis: string | null;
          client_feedback: string | null;
          project_id: string;
          user_id: string;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['proposals']['Row'], 'id' | 'created_at' | 'updated_at' | 'ai_generated'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
          ai_generated?: boolean;
        };
        Update: Partial<Database['public']['Tables']['proposals']['Insert']>;
      };
      contracts: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          status: 'DRAFT' | 'PENDING_SIGNATURE' | 'ACTIVE' | 'COMPLETED' | 'CANCELLED' | 'DISPUTED';
          value: number;
          start_date: string | null;
          end_date: string | null;
          signed_at: string | null;
          freelancer_id: string;
          client_id: string;
          project_id: string | null;
          ai_generated: boolean;
          contract_type: string;
          terms: string | null;
          ip_clause: boolean;
          nda_clause: boolean;
          payment_terms: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['contracts']['Row'], 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Database['public']['Tables']['contracts']['Insert']>;
      };
      messages: {
        Row: {
          id: string;
          content: string;
          type: 'TEXT' | 'IMAGE' | 'FILE' | 'SYSTEM' | 'PROPOSAL' | 'CONTRACT' | 'MILESTONE';
          sender_id: string;
          receiver_id: string;
          project_id: string | null;
          read: boolean;
          read_at: string | null;
          metadata: Json | null;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['messages']['Row'], 'id' | 'created_at' | 'read'> & {
          id?: string;
          created_at?: string;
          read?: boolean;
        };
        Update: Partial<Database['public']['Tables']['messages']['Insert']>;
      };
      notifications: {
        Row: {
          id: string;
          type: 'MESSAGE' | 'PROPOSAL' | 'CONTRACT' | 'MILESTONE' | 'PAYMENT' | 'REVIEW' | 'SYSTEM' | 'MATCH' | 'REFERRAL';
          title: string;
          message: string;
          data: Json | null;
          read: boolean;
          read_at: string | null;
          user_id: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['notifications']['Row'], 'id' | 'created_at' | 'read'> & {
          id?: string;
          created_at?: string;
          read?: boolean;
        };
        Update: Partial<Database['public']['Tables']['notifications']['Insert']>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
  };
}