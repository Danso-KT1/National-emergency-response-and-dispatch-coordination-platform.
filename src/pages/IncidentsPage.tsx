import AddRoundedIcon from '@mui/icons-material/AddRounded';
import { Alert, Button, Card, CardContent, CircularProgress, Grid, MenuItem, Stack, TextField, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusChip } from '@/components/common/StatusChip';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { incidentService } from '@/services/incidentService';
import { formatDateTime, formatDistance } from '@/lib/format';
import toast from 'react-hot-toast';
import { IncidentStatus } from '@/types';

export default function IncidentsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('All');

  const incidentsQuery = useQuery({ queryKey: ['incidents'], queryFn: incidentService.getIncidents });
  const statusMutation = useMutation({
    mutationFn: ({ id, nextStatus }: { id: string; nextStatus: IncidentStatus }) => incidentService.updateStatus(id, nextStatus),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast.success('Incident status updated');
    },
  });

  const filtered = useMemo(() => {
    const records = incidentsQuery.data || [];
    return records.filter((incident) => {
      const matchesSearch = [incident.id, incident.citizenName, incident.assignedUnit, incident.region, incident.incidentType]
        .join(' ')
        .toLowerCase()
        .includes(search.toLowerCase());
      const matchesStatus = status === 'All' || incident.status === status;
      return matchesSearch && matchesStatus;
    });
  }, [incidentsQuery.data, search, status]);

  if (incidentsQuery.isLoading) return <CircularProgress />;
  if (incidentsQuery.error) return <Alert severity="error">Could not load incidents.</Alert>;

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Emergency incidents"
        subtitle="These records reflect the incident service requirement in the document: capture citizen report data, assign responders, and track status from creation to resolution."
        action={<Button variant="contained" startIcon={<AddRoundedIcon />} onClick={() => navigate('/incidents/new')}>New Incident</Button>}
      />

      <Grid container spacing={2}>
        <Grid size={{ xs: 12, md: 8 }}>
          <TextField fullWidth label="Search by incident ID, citizen, region or assigned unit" value={search} onChange={(e) => setSearch(e.target.value)} />
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <TextField select fullWidth label="Filter by status" value={status} onChange={(e) => setStatus(e.target.value)}>
            {['All', 'Created', 'Dispatched', 'In Progress', 'Resolved'].map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
          </TextField>
        </Grid>
      </Grid>

      <Grid container spacing={2.5}>
        {filtered.map((incident) => (
          <Grid key={incident.id} size={{ xs: 12, xl: 6 }}>
            <Card>
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
                    <BoxLike>
                      <Typography variant="h6" fontWeight={800}>{incident.id}</Typography>
                      <Typography color="text.secondary">{incident.incidentType} • {incident.region}</Typography>
                    </BoxLike>
                    <StatusChip status={incident.status} />
                  </Stack>
                  <Grid container spacing={2}>
                    <Grid size={{ xs: 12, sm: 6 }}><LabelValue label="Citizen" value={`${incident.citizenName} (${incident.citizenPhone})`} /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><LabelValue label="Assigned Unit" value={incident.assignedUnit} /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><LabelValue label="Nearest distance" value={formatDistance(incident.distanceKm)} /></Grid>
                    <Grid size={{ xs: 12, sm: 6 }}><LabelValue label="Created" value={formatDateTime(incident.createdAt)} /></Grid>
                    <Grid size={{ xs: 12 }}><LabelValue label="Notes" value={incident.notes} /></Grid>
                  </Grid>
                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.2}>
                    {(['Created', 'Dispatched', 'In Progress', 'Resolved'] as IncidentStatus[]).map((nextStatus) => (
                      <Button
                        key={nextStatus}
                        variant={incident.status === nextStatus ? 'contained' : 'outlined'}
                        size="small"
                        disabled={statusMutation.isPending}
                        onClick={() => statusMutation.mutate({ id: incident.id, nextStatus })}
                      >
                        {nextStatus}
                      </Button>
                    ))}
                  </Stack>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
}

function LabelValue({ label, value }: { label: string; value: string }) {
  return (
    <Stack spacing={0.3}>
      <Typography variant="caption" color="text.secondary">{label}</Typography>
      <Typography fontWeight={600}>{value}</Typography>
    </Stack>
  );
}

function BoxLike({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
}
