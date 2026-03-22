import LogoutRoundedIcon from '@mui/icons-material/LogoutRounded';
import NotificationsRoundedIcon from '@mui/icons-material/NotificationsRounded';
import { AppBar, Avatar, Box, Button, IconButton, Stack, Toolbar, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/AuthContext';

export function Topbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      color="inherit"
      elevation={0}
      sx={{
        ml: { md: '280px' },
        width: { md: 'calc(100% - 280px)' },
        borderBottom: '1px solid rgba(148, 163, 184, 0.15)',
        bgcolor: 'rgba(7,17,31,0.7)',
        backdropFilter: 'blur(10px)'
      }}
    >
      <Toolbar sx={{ minHeight: 72 }}>
        <Box>
          <Typography variant="h6" fontWeight={800}>Emergency Coordination Console</Typography>
          <Typography variant="body2" color="text.secondary">Monitor response operations across services</Typography>
        </Box>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit"><NotificationsRoundedIcon /></IconButton>
        <Stack direction="row" alignItems="center" spacing={1.5} sx={{ ml: 2 }}>
          <Avatar>{user?.name?.[0]}</Avatar>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Typography fontWeight={700}>{user?.name}</Typography>
            <Typography variant="caption" color="text.secondary">{user?.role}</Typography>
          </Box>
          <Button
            variant="outlined"
            color="inherit"
            startIcon={<LogoutRoundedIcon />}
            onClick={() => {
              logout();
              navigate('/login');
            }}
          >
            Logout
          </Button>
        </Stack>
      </Toolbar>
    </AppBar>
  );
}
