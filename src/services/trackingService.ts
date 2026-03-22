import { env } from '@/lib/env';
import { mockApi } from '@/mocks/api';
import { trackingHttp } from './http';
import { Vehicle } from '@/types';

export const trackingService = {
  async getVehicles(): Promise<Vehicle[]> {
    if (env.useMockApi) return mockApi.getVehicles();
    const { data } = await trackingHttp.get(`${env.trackingApiUrl}/vehicles`);
    return data;
  },
};
