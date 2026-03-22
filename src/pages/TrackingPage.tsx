import { useQuery } from '@tanstack/react-query';
import { Alert, Card, CardContent, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { PageHeader } from '@/components/common/PageHeader';
import { LiveVehiclesMap } from '@/components/common/LiveVehiclesMap';
import { trackingService } from '@/services/trackingService';
import { formatDateTime } from '@/lib/format';

export default function TrackingPage() {
  const vehiclesQuery = useQuery({
    queryKey: ['vehicles'],
    queryFn: trackingService.getVehicles,
    refetchInterval: 10000,
  });

  if (vehiclesQuery.isLoading) return <CircularProgress />;
  if (vehiclesQuery.error) return <Alert severity="error">Could not load live vehicles.</Alert>;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Live dispatch tracking"
        subtitle="Aligned with the dispatch tracking service in the project brief: administrators should be able to see responder movement in real time."
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <LiveVehiclesMap vehicles={vehiclesQuery.data || []} />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800} mb={2}>Tracked units</Typography>
              <Stack spacing={1.5}>
                {vehiclesQuery.data?.map((vehicle) => (
                  <Card variant="outlined" key={vehicle.id}>
                    <CardContent>
                      <Typography fontWeight={800}>{vehicle.unitName}</Typography>
                      <Typography variant="body2" color="text.secondary">{vehicle.serviceType} • {vehicle.stationName}</Typography>
                      <Typography variant="body2" mt={1}>Status: <strong>{vehicle.status}</strong></Typography>
                      <Typography variant="body2">Last update: {formatDateTime(vehicle.updatedAt)}</Typography>
                    </CardContent>
                  </Card>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
