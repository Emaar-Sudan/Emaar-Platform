export interface Result {
  id: string;
  type: 'tender' | 'auction' | 'job';
  title: string;
  entity: string;
  date: string;
  description: string;
  notes: string;
  selection_method: string;
  criteria: string;
  amount: number;
  winner: string;
  technical_points: number;
  financial_points: number;
  location: string;
  image_path: string;
  selected_candidates?: Array<{
    name: string;
    application_number: string;
  }>;
  salary_min?: number;
  salary_max?: number;
  salary_currency?: string;
}

export interface Reaction {
  id: string;
  result_id: string;
  user_id: string;
  type: 'like' | 'love' | 'celebrate' | 'support' | 'star';
  created_at: string;
}