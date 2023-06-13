import React, { FC, PropsWithChildren, ReactNode } from 'react';
import Box, { BoxProps } from '@mui/material/Box';
import Typography from '@mui/material/Typography';

export interface CardProps extends BoxProps {
  children: ReactNode;
  className?: string;
}

interface CardTitleProps extends PropsWithChildren {
  title: string;
}

export const Card: FC<CardProps> = ({ children, className, ...props }: CardProps) => (
  <Box
    borderRadius={2}
    bgcolor="background.paper"
    padding={3}
    className={className}
    {...props}
  >
    {children}
  </Box>
);

export const CardTitle: FC<CardTitleProps> = ({ children, title }) => (
  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
    <Typography variant="h5">{title}</Typography>
    {children}
  </Box>
);
