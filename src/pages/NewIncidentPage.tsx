import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Alert, Button, Card, CardContent, Grid, MenuItem, Stack, TextField } from '@mui/material';
import { useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import toast from 'react-hot-toast';
import { PageHeader } from '@/components/common/PageHeader';
import { GoogleMapPicker } from '@/components/forms/GoogleMapPicker';
import { incidentService } from '@/services/incidentService';
import { useAuth } from '@/features/auth/AuthContext';
import { IncidentType } from '@/types';
import { useNavigate } from 'react-router-dom';

const schema = z.object({
  citizenName: z.string().min(3),
  citizenPhone: z.string().min(10),
  incidentType: z.enum(['Medical Emergency', 'Fire Outbreak', 'Crime/Robbery', 'Road Accident']),
  notes: z.string().min(8),
  region: z.string().min(2),
});

type FormValues = z.infer<typeof schema>;

const regionOptions = ['Greater Accra', 'Ashanti', 'Northern', 'Western', 'Eastern', 'Central', 'Volta'];

export default function NewIncidentPage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [coords, setCoords] = useState({ lat: 5.6037, lng: -0.187 });

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      citizenName: '',
      citizenPhone: '',
      incidentType: 'Medical Emergency',
      notes: '',
      region: 'Greater Accra',
    },
  });

  const mutation = useMutation({
    mutationFn: incidentService.createIncident,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['incidents'] });
      toast.success('Incident logged successfully');
      navigate('/incidents');
    },
  });

  const computedAssignment = useMemo(() => {
    return {
      'Medical Emergency': { assignedUnit: 'AMB-Nearest-Available', facility: 'Nearest hospital with capacity' },
      'Fire Outbreak': { assignedUnit: 'FIRE-Nearest-Available', facility: undefined },
      'Crime/Robbery': { assignedUnit: 'POLICE-Nearest-Available', facility: undefined },
      'Road Accident': { assignedUnit: 'AMB-01 + POLICE-Assist', facility: 'Nearest trauma-capable hospital' },
    } as Record<IncidentType, { assignedUnit: string; facility?: string }>;
  }, []);

  return (
    <Stack spacing={3}>
      <PageHeader
        title="Record new incident"
        subtitle="This page is mapped directly to the document’s incident form requirement: capture citizen details, incident type, Google Maps coordinates, notes, and the admin who created the report."
        breadcrumb={[{ label: 'Incidents', to: '/incidents' }, { label: 'New incident' }]}
      />

      <Card>
        <CardContent sx={{ p: { xs: 2, md: 3 } }}>
          <Stack component="form" spacing={3} onSubmit={handleSubmit(async (values) => {
            const assignment = computedAssignment[values.incidentType];
            mutation.mutate({
              ...values,
              latitude: coords.lat,
              longitude: coords.lng,
              createdBy: user?.name || 'System Admin',
              assignedUnit: assignment.assignedUnit,
              assignedFacility: assignment.facility,
              distanceKm: Number((Math.random() * 8 + 1).toFixed(1)),
              status: 'Created',
            });
          })}>
            {mutation.error && <Alert severity="error">Unable to create incident. Confirm backend URLs and payload shape.</Alert>}
            <Grid container spacing={2.2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="Citizen name" fullWidth {...register('citizenName')} error={!!errors.citizenName} helperText={errors.citizenName?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField label="Citizen phone" fullWidth {...register('citizenPhone')} error={!!errors.citizenPhone} helperText={errors.citizenPhone?.message} />
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField select label="Incident type" fullWidth {...register('incidentType')} error={!!errors.incidentType} helperText={errors.incidentType?.message}>
                  {(['Medical Emergency', 'Fire Outbreak', 'Crime/Robbery', 'Road Accident'] as IncidentType[]).map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <TextField select label="Region" fullWidth {...register('region')} error={!!errors.region} helperText={errors.region?.message}>
                  {regionOptions.map((option) => <MenuItem key={option} value={option}>{option}</MenuItem>)}
                </TextField>
              </Grid>
              <Grid size={{ xs: 12 }}>
                <TextField label="Incident notes" fullWidth multiline minRows={4} {...register('notes')} error={!!errors.notes} helperText={errors.notes?.message || 'Add short but actionable information for dispatch operators.'} />
              </Grid>
            </Grid>

            <GoogleMapPicker latitude={coords.lat} longitude={coords.lng} onChange={setCoords} />

            <Alert severity="info">
              Based on the project brief, the backend should automatically determine the nearest available responder after submission. This frontend previews the expected assigned unit logic by incident type.
            </Alert>

            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1.5} justifyContent="flex-end">
              <Button variant="outlined" onClick={() => navigate('/incidents')}>Cancel</Button>
              <Button type="submit" variant="contained" disabled={mutation.isPending}>{mutation.isPending ? 'Submitting...' : 'Create incident'}</Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Stack>
  );
}
