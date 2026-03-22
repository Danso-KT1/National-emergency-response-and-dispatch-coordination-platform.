import { Chip } from '@mui/material';
import { IncidentStatus } from '@/types';

const statusColorMap: Record<IncidentStatus, 'default' | 'warning' | 'info' | 'success'> = {
  Created: 'default',
  Dispatched: 'warning',
  'In Progress': 'info',
  Resolved: 'success',
};

export function StatusChip({ status }: { status: IncidentStatus }) {
  return <Chip size="small" label={status} color={statusColorMap[status]} />;
}
