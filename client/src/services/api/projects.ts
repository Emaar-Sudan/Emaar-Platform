import api from './index';
import type { Project } from '@/types/project';

export const projectsApi = {
  async getProjects(filters = {}) {
    const { data } = await api.get('/projects', { params: filters });
    return data as Project[];
  },

  async getProjectById(id: string) {
    const { data } = await api.get(`/projects/${id}`);
    return data as Project;
  },

  async getProjectStats(id: string) {
    const { data } = await api.get(`/projects/${id}/stats`);
    return data;
  }
};