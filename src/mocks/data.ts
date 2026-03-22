import { AnalyticsSummary, Incident, RegionIncidentDatum, ResourceUtilizationDatum, ResponseTimeDatum, User, Vehicle } from '@/types';

export const mockUser: User = {
  id: 'user-1',
  name: 'Ama Owusu',
  email: 'ama@emergency.gov.gh',
  role: 'SYSTEM_ADMIN',
  accessToken: 'mock-token',
};

export const mockIncidents: Incident[] = [
  {
    id: 'INC-2026-001',
    citizenName: 'Kwame Asare',
    citizenPhone: '0241234567',
    incidentType: 'Medical Emergency',
    latitude: 5.6037,
    longitude: -0.187,
    notes: 'Citizen collapsed near Circle interchange.',
    createdBy: 'Ama Owusu',
    assignedUnit: 'AMB-01 Korle Bu',
    assignedFacility: 'Korle Bu Teaching Hospital',
    distanceKm: 4.8,
    status: 'Dispatched',
    createdAt: '2026-03-22T06:10:00Z',
    updatedAt: '2026-03-22T06:16:00Z',
    region: 'Greater Accra',
  },
  {
    id: 'INC-2026-002',
    citizenName: 'Abena Serwaa',
    citizenPhone: '0207654321',
    incidentType: 'Fire Outbreak',
    latitude: 6.6885,
    longitude: -1.6244,
    notes: 'Kitchen fire reported in a student hostel.',
    createdBy: 'Yaw Mensah',
    assignedUnit: 'FIRE-KSI-04',
    distanceKm: 2.6,
    status: 'In Progress',
    createdAt: '2026-03-22T04:30:00Z',
    updatedAt: '2026-03-22T05:00:00Z',
    region: 'Ashanti',
  },
  {
    id: 'INC-2026-003',
    citizenName: 'Rashid Ibrahim',
    citizenPhone: '0550001122',
    incidentType: 'Crime/Robbery',
    latitude: 9.4034,
    longitude: -0.8424,
    notes: 'Armed robbery reported near central market.',
    createdBy: 'Naa Dedei',
    assignedUnit: 'POL-TML-09',
    distanceKm: 1.9,
    status: 'Created',
    createdAt: '2026-03-22T03:15:00Z',
    updatedAt: '2026-03-22T03:15:00Z',
    region: 'Northern',
  },
];

export const mockVehicles: Vehicle[] = [
  {
    id: 'VEH-AMB-01',
    unitName: 'AMB-01 Korle Bu',
    serviceType: 'Ambulance',
    latitude: 5.5901,
    longitude: -0.1812,
    status: 'Dispatched',
    incidentId: 'INC-2026-001',
    stationName: 'Korle Bu Ambulance Bay',
    updatedAt: '2026-03-22T06:18:00Z',
  },
  {
    id: 'VEH-FIRE-04',
    unitName: 'FIRE-KSI-04',
    serviceType: 'Fire Tender',
    latitude: 6.6904,
    longitude: -1.629,
    status: 'Busy',
    incidentId: 'INC-2026-002',
    stationName: 'Kumasi Central Fire Station',
    updatedAt: '2026-03-22T05:01:00Z',
  },
  {
    id: 'VEH-POL-09',
    unitName: 'POL-TML-09',
    serviceType: 'Police Patrol',
    latitude: 9.4072,
    longitude: -0.853,
    status: 'Available',
    stationName: 'Tamale Central Police Station',
    updatedAt: '2026-03-22T06:00:00Z',
  },
];

export const mockAnalyticsSummary: AnalyticsSummary = {
  averageResponseTimeMinutes: 9.4,
  openIncidents: 12,
  resolvedToday: 18,
  hospitalBedUsage: 74,
};

export const mockResponseTimes: ResponseTimeDatum[] = [
  { service: 'Ambulance', avgMinutes: 8 },
  { service: 'Police', avgMinutes: 6 },
  { service: 'Fire Service', avgMinutes: 11 },
];

export const mockIncidentRegions: RegionIncidentDatum[] = [
  { region: 'Greater Accra', medical: 24, fire: 8, crime: 14, accident: 10 },
  { region: 'Ashanti', medical: 18, fire: 6, crime: 11, accident: 7 },
  { region: 'Northern', medical: 7, fire: 3, crime: 9, accident: 4 },
  { region: 'Western', medical: 10, fire: 5, crime: 6, accident: 6 },
];

export const mockResourceUtilization: ResourceUtilizationDatum[] = [
  { name: 'Hospital Beds', utilization: 74 },
  { name: 'Ambulances', utilization: 68 },
  { name: 'Police Patrols', utilization: 59 },
  { name: 'Fire Tenders', utilization: 63 },
];
