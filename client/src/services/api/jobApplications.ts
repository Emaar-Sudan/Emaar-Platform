import api from './index';
import type { JobApplication } from '@/types/jobApplication';

export const jobApplicationsApi = {
  async getUserApplications() {
    const { data } = await api.get('/jobs/applications');
    return data as JobApplication[];
  },

  async cancelApplication(applicationId: string) {
    await api.delete(`/jobs/applications/${applicationId}`);
  },

  async uploadResume(file: File) {
    const formData = new FormData();
    formData.append('resume', file);
    const { data } = await api.post('/jobs/upload-resume', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return data;
  },

  async submitApplication(jobId: string, applicationData: Partial<JobApplication>) {
    const { data } = await api.post(`/jobs/${jobId}/apply`, applicationData);
    return data;
  }
};