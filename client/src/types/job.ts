
export interface UserJob {
  id: string;
  job_number: string;
  title: string;
  company: string;
  location: string;
  type: 'full_time' | 'part_time' | 'contract' | 'temporary';
  organization: string;
  type: string;
  salary_range: string;
  required_number: number;
  description: string;
  requirements: string[];
  benefits: string[];
  working_hours: string;
  work_days: string;
  image_path: string;
  notes: string;
  status: 'draft' | 'published' | 'closed' | 'cancelled';
  deadline: string;
}

