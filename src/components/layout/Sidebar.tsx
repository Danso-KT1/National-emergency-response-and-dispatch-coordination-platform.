import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import EmergencyRoundedIcon from '@mui/icons-material/EmergencyRounded';
import InsightsRoundedIcon from '@mui/icons-material/InsightsRounded';
import LocationSearchingRoundedIcon from '@mui/icons-material/LocationSearchingRounded';
import AddRoundedIcon from '@mui/icons-material/AddRounded';
import LocalHospitalRoundedIcon from '@mui/icons-material/LocalHospitalRounded';
import { Box, Drawer, List, ListItemButton, ListItemIcon, ListItemText, Stack, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { env } from '@/lib/env';

const drawerWidth = 280;

const navItems = [
  { label: 'Overview', icon: <DashboardRoundedIcon />, to: '/dashboard' },
  { label: 'All Incidents', icon: <EmergencyRoundedIcon />, to: '/incidents' },
  { label: 'Create Incident', icon: <AddRoundedIcon />, to: '/incidents/new' },
  { label: 'Live Dispatch Tracking', icon: <LocationSearchingRoundedIcon />, to: '/tracking' },
  { label: 'Analytics', icon: <InsightsRoundedIcon />, to: '/analytics' },
];

export function Sidebar() {
  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: 'border-box',
          borderRight: '1px solid rgba(255,255,255,0.08)',
          background: 'linear-gradient(180deg, #07111f 0%, #0a1f38 45%, #0d2947 100%)',
        },
        display: { xs: 'none', md: 'block' },
      }}
    >
      <Stack spacing={3} sx={{ p: 3, height: '100%' }}>
        <Stack direction="row" spacing={1.5} alignItems="center">
          <Box sx={{
            width: 42,
            height: 42,
            borderRadius: 3,
            display: 'grid',
            placeItems: 'center',
            bgcolor: 'primary.main',
            color: 'white'
          }}>
            <LocalHospitalRoundedIcon />
          </Box>
          <Box>
            <Typography fontWeight={800} color="white">{env.appName}</Typography>
            <Typography variant="caption" color="rgba(255,255,255,0.7)">National dispatch UI</Typography>
          </Box>
        </Stack>

        <List sx={{ p: 0 }}>
          {navItems.map((item) => (
            <ListItemButton
              component={NavLink}
              to={item.to}
              key={item.to}
              sx={{
                borderRadius: 3,
                mb: 1,
                color: 'rgba(255,255,255,0.85)',
                '&.active': { bgcolor: 'rgba(255,255,255,0.12)', color: 'white' },
              }}
            >
              <ListItemIcon sx={{ color: 'inherit', minWidth: 42 }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.label} />
            </ListItemButton>
          ))}
        </List>

        <Box sx={{ mt: 'auto', p: 2.2, borderRadius: 4, bgcolor: 'rgba(255,255,255,0.08)' }}>
          <Typography variant="subtitle2" color="white" fontWeight={700} gutterBottom>
            Frontend scope from the brief
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.75)">
            Login, incident capture, Google Maps location selection, dispatch status, live tracking, and analytics.
          </Typography>
        </Box>
      </Stack>
    </Drawer>
  );
}
