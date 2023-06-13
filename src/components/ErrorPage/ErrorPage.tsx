import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface ErrorPageProps {
  code?: number;
  message?: string;
}

const messageByCode = (code?: number, fallback?: string): string => {
  switch (code) {
    case 404:
      return 'The page you’re looking for doesn’t exist.';
    case 500:
      return 'Oooops, an error occurred, please try again later';
    default:
      return fallback ?? 'We cannot load data, please try again later';
  }
};

export const ErrorPage: FC<ErrorPageProps> = ({ code, message }) => (
  <Box
    sx={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'column',
      minHeight: '600px',
    }}
  >
    {code !== undefined && (
    <Typography variant="h1" style={{ color: 'white' }}>
      {code}
    </Typography>
    )}
    <Typography variant="h6" style={{ color: 'white' }}>
      {messageByCode(code, message)}
    </Typography>
  </Box>
);
