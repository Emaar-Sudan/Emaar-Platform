import api from './index';

export const mapApi = {
  async getMapData() {
    const { data } = await api.get('/map');
    return data;
  }
};