import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { Alert, Card, CardContent, CircularProgress, Grid, Stack, Typography } from '@mui/material';
import { Bar, BarChart, CartesianGrid, Legend, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Cell } from 'recharts';
import { PageHeader } from '@/components/common/PageHeader';
import { MetricCard } from '@/components/common/MetricCard';
import { useAnalyticsData } from '@/hooks/useAnalyticsData';

const pieColors = ['#2563eb', '#10b981', '#f59e0b', '#ef4444'];

export default function AnalyticsPage() {
  const { summary, responseTimes, incidentsByRegion, resourceUtilization } = useAnalyticsData();

  if (summary.isLoading || responseTimes.isLoading || incidentsByRegion.isLoading || resourceUtilization.isLoading) {
    return <CircularProgress />;
  }

  if (summary.error || responseTimes.error || incidentsByRegion.error || resourceUtilization.error) {
    return <Alert severity="error">Could not load analytics data.</Alert>;
  }

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Analytics & monitoring"
        subtitle="This screen implements the document’s analytics requirement: response times, incidents by region and type, bed usage, and resource utilization."
      />

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, sm: 4 }}>
          <MetricCard label="Avg response time" value={`${summary.data?.averageResponseTimeMinutes} mins`} helper="Cross-service average" icon={<QueryStatsRoundedIcon color="primary" />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <MetricCard label="Open incidents" value={summary.data?.openIncidents || 0} helper="Operational workload" icon={<WarningRoundedIcon color="warning" />} />
        </Grid>
        <Grid size={{ xs: 12, sm: 4 }}>
          <MetricCard label="Hospital bed usage" value={`${summary.data?.hospitalBedUsage}%`} helper="Medical routing signal" icon={<LocalHospitalRoundedIcon color="error" />} />
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={800} mb={2}>Average response time by service</Typography>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={responseTimes.data}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="service" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="avgMinutes" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 12, lg: 6 }}>
          <Card>
            <CardContent>
              <Typography variant="h6" fontWeight={800} mb={2}>Resource utilization snapshot</Typography>
              <ResponsiveContainer width="100%" height={320}>
                <PieChart>
                  <Pie data={resourceUtilization.data} dataKey="utilization" nameKey="name" innerRadius={72} outerRadius={110} paddingAngle={4}>
                    {resourceUtilization.data?.map((entry, index) => <Cell key={entry.name} fill={pieColors[index % pieColors.length]} />)}
                  </Pie>
                  <Tooltip />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Card>
        <CardContent>
          <Typography variant="h6" fontWeight={800} mb={2}>Incidents by region and type</Typography>
          <ResponsiveContainer width="100%" height={360}>
            <BarChart data={incidentsByRegion.data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="region" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="medical" stackId="a" fill="#2563eb" />
              <Bar dataKey="fire" stackId="a" fill="#f97316" />
              <Bar dataKey="crime" stackId="a" fill="#7c3aed" />
              <Bar dataKey="accident" stackId="a" fill="#10b981" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </Stack>
  );
}
