import {
  createContext,
  FC,
  useState,
  PropsWithChildren,
  useContext,
  useMemo,
  useEffect,
} from 'react';
import { useLocalStorage } from 'hooks';
import { Theme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { getTheme, DEFAULT_MODE } from 'styles';
import { ThemeMode } from 'types';
import { ThemeContextState, ToggleMode } from './ThemeContext.model';

export const ThemeContext = createContext<ThemeContextState>({
  theme: getTheme(DEFAULT_MODE),
  toggleMode: () => undefined,
});

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
  const [theme, setTheme] = useState<Theme>(getTheme(DEFAULT_MODE));
  const [themeMode, setThemeMode] = useLocalStorage<ThemeMode>('theme_mode', DEFAULT_MODE);

  const toggleMode = () => {
    const mode = themeMode === 'dark' ? 'light' : 'dark';
    setThemeMode(mode);
  };

  useEffect(() => {
    setTheme(getTheme(themeMode));
  }, [themeMode]);

  const value = useMemo(() => ({
    theme,
    toggleMode,
  }), [theme, toggleMode]);

  return (
    <ThemeContext.Provider value={value}>
      <MuiThemeProvider theme={theme}>
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useToggleMode = (): ToggleMode => {
  const { theme, toggleMode } = useContext(ThemeContext);
  const { mode } = theme.palette;

  if (toggleMode === undefined) {
    throw new Error('You\'re trying to toggle Theme outside of ThemeProvider');
  }
  return [mode, toggleMode];
};
