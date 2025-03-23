import api from './index';
import type { Job, JobApplication } from '@/types/job';

export const jobsApi = {
  async getJobs(filters = {}) {
    const { data } = await api.get('/jobs', { params: filters });
    return data as Job[];
  },

  async getJobById(id: string) {
    const { data } = await api.get(`/jobs/${id}`);
    return data as Job;
  },

  async applyForJob(jobId: string, application: Partial<JobApplication>) {
    const { data } = await api.post(`/jobs/${jobId}/apply`, application);
    return data;
  }
};