export interface News {
  id: string;
  type: 'tender' | 'auction' | 'job' | 'project';
  title: string;
  content: string;
  image_url: string;
  author_id?: string;
  published_at: string;
  status: 'published' | 'draft' | 'archived';
  created_at: string;
  updated_at: string;
  author?: {
    name: string;
  };
}