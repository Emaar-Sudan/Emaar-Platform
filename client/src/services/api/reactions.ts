import api from './index';
import type { Reaction } from '@/types/result';

export const reactionsApi = {
  async addReaction(resultId: string, type: string) {
    const { data } = await api.post(`/results/${resultId}/reactions`, { type });
    return data as Reaction;
  },

  async getReaction(resultId: string) {
    const { data } = await api.get(`/results/${resultId}/reaction`);
    return data as Reaction;
  }
};