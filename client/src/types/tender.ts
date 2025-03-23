export interface TenderSubmission {
  id: string;
  tender_id: string;
  user_id: string;
  technical_file_url: string | null;
  financial_file_url: string | null;
  status: 'pending' | 'under_review' | 'accepted' | 'rejected';
  submission_date: string;
  tender?: {
    title: string;
    tender_number: string;
    submission_deadline: string;
    organization_id: string;
  };
}