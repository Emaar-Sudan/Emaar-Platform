export interface Job {
  id: string;
  job_number: string;
  title: string;
  description: string;
  organization_id: string;
  type: 'full_time' | 'part_time' | 'contract' | 'temporary';
  location: string;
  salary_range?: string;
  requirements: string[];
  benefits: string[];
  status: 'draft' | 'published' | 'closed' | 'cancelled';
  deadline: string;
  created_at: string;
  updated_at: string;
}

export interface JobApplication {
  id: string;
  job_id: string;
  user_id: string;
  cover_letter?: string;
  resume_url: string;
  status: 'pending' | 'under_review' | 'shortlisted' | 'accepted' | 'rejected';
  application_date: string;
  review_notes?: string;
}