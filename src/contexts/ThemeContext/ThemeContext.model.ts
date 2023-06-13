import { Theme } from '@mui/material/styles';
import { ThemeMode } from 'types';

export interface ThemeContextState {
  theme: Theme;
  toggleMode: () => void;
}

export type ToggleMode = [ThemeMode, () => void];
