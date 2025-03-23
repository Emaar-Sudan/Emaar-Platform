export interface Project {
  id: string;
  project_number: string;
  title: string;
  description: string;
  owner_id: string;
  contractor_id?: string;
  location: string;
  budget: number;
  status: 'planning' | 'active' | 'completed' | 'cancelled';
  type: 'infrastructure' | 'energy' | 'transportation' | 'water' | 'education';
  start_date: string;
  end_date: string;
  progress: number;
  image_paths: string[];
  team?: Array<{ name: string; role: string; }>;
  risks?: Array<{ risk: string; mitigation: string; }>;
  expected_outcomes?: string[];
  financial_details?: {
    allocatedBudget: number;
    spentBudget: number;
    fundingSource: string;
  };
  tools?: string[];
  reports?: Array<{
    title: string;
    date: string;
    link: string;
  }>;
  notes?: string[];
}