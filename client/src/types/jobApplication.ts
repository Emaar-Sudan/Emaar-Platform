export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  cover_letter?: string;
  resume_url: string;
  status: 'pending' | 'under_review' | 'shortlisted' | 'accepted' | 'rejected';
  application_date: string;
  review_notes?: string;
  job?: {
    id: string;
    title: string;
    organization: string;
    type: string;
  };
}