export type Role =
  | 'SYSTEM_ADMIN'
  | 'HOSPITAL_ADMIN'
  | 'POLICE_ADMIN'
  | 'FIRE_ADMIN'
  | 'AMBULANCE_DRIVER';

export type IncidentStatus = 'Created' | 'Dispatched' | 'In Progress' | 'Resolved';

export type IncidentType = 'Medical Emergency' | 'Fire Outbreak' | 'Crime/Robbery' | 'Road Accident';

export interface User {
  id: string;
  name: string;
  email: string;
  role: Role;
  accessToken?: string;
}

export interface Incident {
  id: string;
  citizenName: string;
  citizenPhone: string;
  incidentType: IncidentType;
  latitude: number;
  longitude: number;
  notes: string;
  createdBy: string;
  assignedUnit: string;
  assignedFacility?: string;
  distanceKm: number;
  status: IncidentStatus;
  createdAt: string;
  updatedAt: string;
  region: string;
}

export interface Vehicle {
  id: string;
  unitName: string;
  serviceType: 'Ambulance' | 'Police Patrol' | 'Fire Tender';
  latitude: number;
  longitude: number;
  status: 'Available' | 'Dispatched' | 'Busy' | 'Maintenance';
  incidentId?: string;
  stationName: string;
  updatedAt: string;
}

export interface AnalyticsSummary {
  averageResponseTimeMinutes: number;
  openIncidents: number;
  resolvedToday: number;
  hospitalBedUsage: number;
}

export interface ResponseTimeDatum {
  service: string;
  avgMinutes: number;
}

export interface RegionIncidentDatum {
  region: string;
  medical: number;
  fire: number;
  crime: number;
  accident: number;
}

export interface ResourceUtilizationDatum {
  name: string;
  utilization: number;
}
