import api from './index';
import type { Tender, TenderSubmission } from '@/types/tender';

export const tendersApi = {
  async getTenders(filters = {}) {
    const { data } = await api.get('/tenders', { params: filters });
    return data as Tender[];
  },

  async getTenderById(id: string) {
    const { data } = await api.get(`/tenders/${id}`);
    return data as Tender;
  },

  async submitTender(tenderId: string, submission: Partial<TenderSubmission>) {
    const { data } = await api.post(`/tenders/${tenderId}/submit`, submission);
    return data;
  }
};