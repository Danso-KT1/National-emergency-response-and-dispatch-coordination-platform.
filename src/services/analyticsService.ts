import { env } from '@/lib/env';
import { mockApi } from '@/mocks/api';
import { analyticsHttp } from './http';
import { AnalyticsSummary, RegionIncidentDatum, ResourceUtilizationDatum, ResponseTimeDatum } from '@/types';

export const analyticsService = {
  async getSummary(): Promise<AnalyticsSummary> {
    if (env.useMockApi) return mockApi.getAnalyticsSummary();
    const [responseTimes, incidentsByRegion, resourceUtilization] = await Promise.all([
      analyticsHttp.get(`${env.analyticsApiUrl}/analytics/response-times`),
      analyticsHttp.get(`${env.analyticsApiUrl}/analytics/incidents-by-region`),
      analyticsHttp.get(`${env.analyticsApiUrl}/analytics/resource-utilization`),
    ]);

    return {
      averageResponseTimeMinutes: responseTimes.data.averageResponseTimeMinutes,
      openIncidents: incidentsByRegion.data.openIncidents,
      resolvedToday: incidentsByRegion.data.resolvedToday,
      hospitalBedUsage: resourceUtilization.data.hospitalBedUsage,
    };
  },

  async getResponseTimes(): Promise<ResponseTimeDatum[]> {
    if (env.useMockApi) return mockApi.getResponseTimes();
    const { data } = await analyticsHttp.get(`${env.analyticsApiUrl}/analytics/response-times`);
    return data;
  },

  async getIncidentsByRegion(): Promise<RegionIncidentDatum[]> {
    if (env.useMockApi) return mockApi.getIncidentsByRegion();
    const { data } = await analyticsHttp.get(`${env.analyticsApiUrl}/analytics/incidents-by-region`);
    return data;
  },

  async getResourceUtilization(): Promise<ResourceUtilizationDatum[]> {
    if (env.useMockApi) return mockApi.getResourceUtilization();
    const { data } = await analyticsHttp.get(`${env.analyticsApiUrl}/analytics/resource-utilization`);
    return data;
  },
};
