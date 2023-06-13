import React, { FC, ReactNode } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface PageWrapperProps {
  children: ReactNode;
  title: string;
}

export const PageWrapper: FC<PageWrapperProps> = ({ title, children }: PageWrapperProps) => (
  <Box sx={{ p: 6, pt: 5, width: '100%' }}>
    <Typography variant="h1" sx={{ fontSize: 30, mb: 4 }}>{title}</Typography>
    {children}
  </Box>
);
