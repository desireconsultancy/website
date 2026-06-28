// ─────────────────────────────────────────────────────────────
// Supabase Database Types
// ─────────────────────────────────────────────────────────────

export type LeadStatus = 'new' | 'contacted' | 'in_progress' | 'converted' | 'closed';

export interface Lead {
  id: string;
  full_name: string;
  business_name: string;
  phone: string;
  email: string;
  service: string;
  message: string;
  status: LeadStatus;
  ip_hash?: string | null;
  created_at: string;
  updated_at: string;
}

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: Lead;
        Insert: Omit<Lead, 'id' | 'created_at' | 'updated_at'> & {
          id?: string;
          status?: LeadStatus;
          created_at?: string;
          updated_at?: string;
        };
        Update: Partial<Pick<Lead, 'status' | 'full_name' | 'business_name' | 'phone' | 'email' | 'service' | 'message'>>;
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: {
      lead_status: LeadStatus;
    };
  };
}
