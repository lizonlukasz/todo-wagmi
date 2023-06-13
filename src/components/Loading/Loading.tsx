import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

export const Loading: FC = () => (
  <Box sx={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: '600px',
  }}
  >
    <CircularProgress />
  </Box>
);
