import api from './index';
import type { Result } from '@/types/results';

export const resultsApi = {
  async getResults(filters = {}) {
    const { data } = await api.get('/results', { params: filters });
    return data as Result[];
  },

  async getResultById(id: string) {
    const { data } = await api.get(`/results/${id}`);
    return data as Result;
  },

  async addReaction(resultId: string, type: string) {
    const { data } = await api.post(`/results/${resultId}/reactions`, { type });
    return data;
  }
};