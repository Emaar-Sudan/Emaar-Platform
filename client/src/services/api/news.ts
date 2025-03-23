import api from './index';
import type { News } from '@/types/news';

export const newsApi = {
  async getNews(filters = {}) {
    const { data } = await api.get('/news', { params: filters });
    return data as News[];
  },

  async getFeaturedNews() {
    const { data } = await api.get('/news/featured');
    return data as News;
  },

  async getNewsById(id: string) {
    const { data } = await api.get(`/news/${id}`);
    return data as News;
  },

  async getRelatedNews(id: string) {
    const { data } = await api.get(`/news/${id}/related`);
    return data as News[];
  }
};