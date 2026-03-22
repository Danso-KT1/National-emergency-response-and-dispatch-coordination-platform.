import { useQuery } from '@tanstack/react-query';
import { analyticsService } from '@/services/analyticsService';
import { incidentService } from '@/services/incidentService';
import { trackingService } from '@/services/trackingService';

export function useDashboardData() {
  const summary = useQuery({ queryKey: ['analytics-summary'], queryFn: analyticsService.getSummary });
  const incidents = useQuery({ queryKey: ['incidents'], queryFn: incidentService.getIncidents });
  const vehicles = useQuery({ queryKey: ['vehicles'], queryFn: trackingService.getVehicles });

  return { summary, incidents, vehicles };
}
