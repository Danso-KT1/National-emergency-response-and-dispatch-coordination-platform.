import { Box, Card, CardContent, Chip, Container, Grid, Stack, Typography } from '@mui/material';
import ShieldRoundedIcon from '@mui/icons-material/ShieldRounded';
import MapRoundedIcon from '@mui/icons-material/MapRounded';
import QueryStatsRoundedIcon from '@mui/icons-material/QueryStatsRounded';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { LoginForm } from '@/features/auth/LoginForm';
import { useAuth } from '@/features/auth/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  return (
    <Box sx={{ minHeight: '100vh', background: 'radial-gradient(circle at top left, rgba(37,99,235,0.25), transparent 32%), linear-gradient(180deg, #020617 0%, #07111f 50%, #0f172a 100%)', display: 'flex', alignItems: 'center', py: 6 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2.5}>
              <Typography variant="h2" fontWeight={900} color="white" sx={{ lineHeight: 1.1 }}>
                National Emergency Response Coordination Platform
              </Typography>
              <Typography variant="h6" color="rgba(255,255,255,0.75)" sx={{ maxWidth: 620 }}>
                A comprehensive platform for emergency response coordination, featuring secure access, incident management, location services, real-time tracking, and performance analytics.
              </Typography>
              <Grid container spacing={2} mt={1}>
                {[
                  { icon: <ShieldRoundedIcon />, title: 'Secure admin access', text: 'Built around the brief’s JWT-based authentication and role-oriented operator workflows.' },
                  { icon: <MapRoundedIcon />, title: 'Map-based incident capture', text: 'Supports location picking with latitude and longitude for dispatch decisions.' },
                  { icon: <QueryStatsRoundedIcon />, title: 'Decision-ready analytics', text: 'Shows response time, region trends, and responder resource utilization.' },
                ].map((item) => (
                  <Grid size={{ xs: 12 }} key={item.title}>
                    <Card sx={{ bgcolor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}>
                      <CardContent>
                        <Stack direction="row" spacing={2}>
                          <Box sx={{ width: 46, height: 46, borderRadius: 3, bgcolor: 'primary.main', color: 'white', display: 'grid', placeItems: 'center' }}>
                            {item.icon}
                          </Box>
                          <Box>
                            <Typography color="white" fontWeight={800}>{item.title}</Typography>
                            <Typography color="rgba(255,255,255,0.72)">{item.text}</Typography>
                          </Box>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Stack>
          </Grid>
          <Grid size={{ xs: 12, md: 5 }} sx={{ gridColumn: { md: '7 / span 5' } }}>
            <Card sx={{ borderRadius: 6 }}>
              <CardContent sx={{ p: 4 }}>
                <Stack spacing={2.5}>
                  <Box>
                    <Typography variant="h4" fontWeight={900}>Welcome back</Typography>
                    <Typography color="text.secondary">Use a staff account to access the dispatch console.</Typography>
                  </Box>
                  <LoginForm
                    loading={loading}
                    error={error}
                    onSubmit={async (values) => {
                      try {
                        setLoading(true);
                        setError('');
                        await login(values.email, values.password);
                        toast.success('Login successful');
                        navigate('/dashboard');
                      } catch (err) {
                        console.error(err);
                        setError('Unable to sign in. Check your credentials or backend service.');
                      } finally {
                        setLoading(false);
                      }
                    }}
                  />
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
