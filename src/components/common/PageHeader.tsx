import { Box, Breadcrumbs, Link, Stack, Typography } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

interface PageHeaderProps {
  title: string;
  subtitle: string;
  breadcrumb?: { label: string; to?: string }[];
  action?: React.ReactNode;
}

export function PageHeader({ title, subtitle, breadcrumb, action }: PageHeaderProps) {
  return (
    <Stack spacing={2.2} mb={3}>
      {breadcrumb && (
        <Breadcrumbs>
          {breadcrumb.map((item) =>
            item.to ? (
              <Link component={RouterLink} key={item.label} underline="hover" color="inherit" to={item.to}>
                {item.label}
              </Link>
            ) : (
              <Typography key={item.label} color="text.primary">{item.label}</Typography>
            )
          )}
        </Breadcrumbs>
      )}
      <Box display="flex" justifyContent="space-between" gap={2} alignItems={{ xs: 'flex-start', md: 'center' }} flexDirection={{ xs: 'column', md: 'row' }}>
        <Box>
          <Typography variant="h4" fontWeight={800}>{title}</Typography>
          <Typography color="text.secondary" mt={0.8}>{subtitle}</Typography>
        </Box>
        {action}
      </Box>
    </Stack>
  );
}
