import { createTheme } from '@mui/material/styles';
import { ThemeMode } from '../types';

export const DEFAULT_MODE = 'dark';
export const getTheme = (mode: ThemeMode) => {
  const valueForMode = (lightValue: string, darkValue: string) => (
    mode === 'light' ? lightValue : darkValue
  );

  return createTheme({
    palette: {
      mode,
      background: {
        default: valueForMode('#F2F2F2', '#2f3249'),
        paper: valueForMode('#ffffff', '#242b40'),
      },

    },
  });
};
