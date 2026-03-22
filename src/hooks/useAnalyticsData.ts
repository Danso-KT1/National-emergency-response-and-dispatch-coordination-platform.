import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/analyticsService';

export function useAnalyticsData() {
  const summary = useQuery({ queryKey: ['analytics-summary'], queryFn: analyticsService.getSummary });
  const responseTimes = useQuery({ queryKey: ['analytics-response-times'], queryFn: analyticsService.getResponseTimes });
  const incidentsByRegion = useQuery({ queryKey: ['analytics-incidents-region'], queryFn: analyticsService.getIncidentsByRegion });
  const resourceUtilization = useQuery({ queryKey: ['analytics-resources'], queryFn: analyticsService.getResourceUtilization });

  return { summary, responseTimes, incidentsByRegion, resourceUtilization };
}
