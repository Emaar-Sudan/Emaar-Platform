import api from './index';
import type { TenderSubmission } from '@/types/tender';

export const tenderSubmissionsApi = {
  async getUserSubmissions() {
    const { data } = await api.get('/tenders/submissions');
    return data as TenderSubmission[];
  },

  async updateSubmissionFiles(submissionId: string, updates: {
    technical_file_url?: string;
    financial_file_url?: string;
  }) {
    const { data } = await api.patch(`/tenders/submissions/${submissionId}/files`, updates);
    return data;
  },

  async cancelSubmission(submissionId: string) {
    await api.delete(`/tenders/submissions/${submissionId}`);
  }
};