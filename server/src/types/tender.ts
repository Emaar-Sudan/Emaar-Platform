export interface Tender {
  id: string;
  tender_number: string;
  title: string;
  description: string;
  organization_id: string;
  category: 'government' | 'private' | 'individual';
  budget: number;
  document_price: number;
  status: 'draft' | 'published' | 'under_review' | 'closed' | 'awarded' | 'cancelled';
  submission_deadline: string;
  technical_requirements?: string;
  financial_requirements?: string;
  created_at: string;
  updated_at: string;
}

export interface TenderSubmission {
  id: string;
  tender_id: string;
  user_id: string;
  technical_file_url: string | null;
  financial_file_url: string | null;
  status: 'pending' | 'under_review' | 'accepted' | 'rejected';
  submission_date: string;
  technical_score?: number;
  financial_score?: number;
  notes?: string;
}