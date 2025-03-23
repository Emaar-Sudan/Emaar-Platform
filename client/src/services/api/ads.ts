import api from './index';
import type { Ad } from '@/types/ad';

export interface Ad {
  id: string;
  name: string;
  title: string;
  description: string;
  image_url: string;
  content: string;
  serviceLink: string;
  contactInfo: string;
  discount?: string;
  placement: string;
  status: 'active' | 'inactive';
  created_at: string;
  updated_at: string;
}

export const adsApi = {
  async getAdsByPage(page: string) {
    const { data } = await api.get(`/ads/${page}`);
    return data as Ad[];
  }
};