import { mockAnalyticsSummary, mockIncidentRegions, mockIncidents, mockResponseTimes, mockResourceUtilization, mockUser, mockVehicles } from './data';
import { Incident, IncidentStatus, User } from '@/types';

const wait = (ms = 500) => new Promise((resolve) => setTimeout(resolve, ms));

let incidents = [...mockIncidents];

export const mockApi = {
  login: async (email: string, _password: string): Promise<User> => {
    await wait();
    return { ...mockUser, email };
  },
  profile: async (): Promise<User> => {
    await wait(300);
    return mockUser;
  },
  getIncidents: async () => {
    await wait(300);
    return incidents;
  },
  createIncident: async (payload: Omit<Incident, 'id' | 'createdAt' | 'updatedAt'>) => {
    await wait(600);
    const created: Incident = {
      ...payload,
      id: `INC-2026-${String(incidents.length + 1).padStart(3, '0')}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    incidents = [created, ...incidents];
    return created;
  },
  updateIncidentStatus: async (id: string, status: IncidentStatus) => {
    await wait(400);
    incidents = incidents.map((incident) =>
      incident.id === id ? { ...incident, status, updatedAt: new Date().toISOString() } : incident
    );
    return incidents.find((incident) => incident.id === id)!;
  },
  getVehicles: async () => {
    await wait(300);
    return mockVehicles;
  },
  getAnalyticsSummary: async () => {
    await wait(300);
    return mockAnalyticsSummary;
  },
  getResponseTimes: async () => {
    await wait(300);
    return mockResponseTimes;
  },
  getIncidentsByRegion: async () => {
    await wait(300);
    return mockIncidentRegions;
  },
  getResourceUtilization: async () => {
    await wait(300);
    return mockResourceUtilization;
  },
};
