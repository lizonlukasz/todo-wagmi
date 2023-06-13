import { Outlet } from 'react-router-dom';
import { Box, Toolbar } from '@mui/material';
import { Topbar } from './Topbar';
import { Sidebar } from './Sidebar';
import { SIDEBAR_WIDTH } from '../../styles';

export const Layout = () => (
  <Box sx={{ display: 'flex', flexDirection: 'column' }}>
    <Topbar />
    <Box
      component="nav"
      sx={{
        width: SIDEBAR_WIDTH,
        flexShrink: 0,
      }}
    >
      <Sidebar />
    </Box>
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        p: 3,
        width: `calc(100% - ${SIDEBAR_WIDTH})`,
        marginLeft: `${SIDEBAR_WIDTH}px`,
        minHeight: '100vh',
        backgroundColor: 'background.default',
      }}
    >
      <Toolbar />
      <Outlet />
    </Box>
  </Box>
);
