import { env } from '@/lib/env';
import { mockApi } from '@/mocks/api';
import { incidentsHttp } from './http';
import { Incident, IncidentStatus } from '@/types';

export type CreateIncidentPayload = Omit<Incident, 'id' | 'createdAt' | 'updatedAt'>;

export const incidentService = {
  async getIncidents(): Promise<Incident[]> {
    if (env.useMockApi) return mockApi.getIncidents();
    const { data } = await incidentsHttp.get(`${env.incidentsApiUrl}/incidents/open`);
    return data;
  },

  async createIncident(payload: CreateIncidentPayload): Promise<Incident> {
    if (env.useMockApi) return mockApi.createIncident(payload);
    const { data } = await incidentsHttp.post(`${env.incidentsApiUrl}/incidents`, payload);
    return data;
  },

  async updateStatus(id: string, status: IncidentStatus): Promise<Incident> {
    if (env.useMockApi) return mockApi.updateIncidentStatus(id, status);
    const { data } = await incidentsHttp.put(`${env.incidentsApiUrl}/incidents/${id}/status`, { status });
    return data;
  },
};
