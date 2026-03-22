import { Card, CardContent, Stack, Typography } from '@mui/material';

interface MetricCardProps {
  label: string;
  value: string | number;
  helper: string;
  icon: React.ReactNode;
}

export function MetricCard({ label, value, helper, icon }: MetricCardProps) {
  return (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start" mb={2}>
          <Typography variant="body2" color="text.secondary">{label}</Typography>
          {icon}
        </Stack>
        <Typography variant="h4" fontWeight={800} mb={0.5}>{value}</Typography>
        <Typography variant="body2" color="text.secondary">{helper}</Typography>
      </CardContent>
    </Card>
  );
}
