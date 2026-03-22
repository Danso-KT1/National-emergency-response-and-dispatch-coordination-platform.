import AccessTimeRoundedIcon from '@mui/icons-material/AccessTimeRounded';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import HealthAndSafetyRoundedIcon from '@mui/icons-material/HealthAndSafetyRounded';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { Alert, Card, CardContent, CircularProgress, Grid, List, ListItem, ListItemText, Stack, Typography } from '@mui/material';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { StatusChip } from '@/components/common/StatusChip';
import { useDashboardData } from '@/hooks/useDashboardData';
import { formatDateTime } from '@/lib/format';

export default function DashboardPage() {
  const { summary, incidents, vehicles } = useDashboardData();

  if (summary.isLoading || incidents.isLoading || vehicles.isLoading) {
    return <CircularProgress />;
  }

  if (summary.error || incidents.error || vehicles.error) {
    return <Alert severity="error">Failed to load dashboard data.</Alert>;
  }

  const activeVehicles = vehicles.data?.filter((vehicle) => vehicle.status !== 'Maintenance').length || 0;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Operations Overview"
        subtitle="A command-center view tailored to the frontend brief: incident visibility, active dispatches, live tracking, and analytics."
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <MetricCard label="Average response time" value={`${summary.data?.averageResponseTimeMinutes} mins`} helper="From analytics service" icon={<AccessTimeRoundedIcon color="primary" />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <MetricCard label="Open incidents" value={summary.data?.openIncidents || 0} helper="Still awaiting closure" icon={<WarningAmberRoundedIcon color="warning" />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <MetricCard label="Resolved today" value={summary.data?.resolvedToday || 0} helper="Across connected services" icon={<CheckCircleRoundedIcon color="success" />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, xl: 3 }}>
          <MetricCard label="Hospital bed usage" value={`${summary.data?.hospitalBedUsage}%`} helper="For medical case routing" icon={<HealthAndSafetyRoundedIcon color="error" />} />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 7 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={800} mb={2}>Recent emergency incidents</Typography>
              <List sx={{ p: 0 }}>
                {incidents.data?.map((incident) => (
                  <ListItem key={incident.id} divider sx={{ px: 0 }}>
                    <ListItemText
                      primary={<Stack direction="row" spacing={1.2} alignItems="center"><Typography fontWeight={700}>{incident.id}</Typography><StatusChip status={incident.status} /></Stack>}
                      secondary={`${incident.incidentType} • ${incident.region} • ${incident.assignedUnit}`}
                    />
                    <Typography variant="body2" color="text.secondary">{formatDateTime(incident.createdAt)}</Typography>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 5 }}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h6" fontWeight={800} mb={2}>Responder readiness snapshot</Typography>
              <Typography variant="h3" fontWeight={900}>{activeVehicles}</Typography>
              <Typography color="text.secondary" mb={3}>Vehicles currently visible to the dispatch tracking service.</Typography>
              <Stack spacing={1.5}>
                {vehicles.data?.map((vehicle) => (
                  <Alert key={vehicle.id} severity={vehicle.status === 'Available' ? 'success' : 'info'}>
                    <strong>{vehicle.unitName}</strong> — {vehicle.status} • {vehicle.stationName}
                  </Alert>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
