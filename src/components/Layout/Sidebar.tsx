import { Drawer, List } from '@mui/material';
import Box from '@mui/material/Box';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import { forwardRef } from 'react';
import { NavLink as BaseNavLink } from 'react-router-dom';
import { useTheme } from '@mui/material/styles';
import { ThemeSwitcher } from '../ThemeSwitcher';
import { routes } from '../../routes';
import { SIDEBAR_WIDTH } from '../../styles';

const NavLink = forwardRef<any, any>(
  ({ activeClassName, activeStyle, ...props }, ref) => (
    <BaseNavLink
      ref={ref}
      {...props}
      className={({ isActive }) => [
        props.className,
        isActive ? activeClassName : null,
      ]
        .filter(Boolean)
        .join(' ')}
      style={({ isActive }) => ({
        ...props.style,
        ...(isActive ? activeStyle : null),
      })}
    />
  ),
);

export const Sidebar = () => {
  const theme = useTheme();
  const activeStyle = {
    borderLeft: `3px solid ${theme.palette.primary.main}`,
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.background.default,
    fontWeight: 200,
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        '& .MuiDrawer-paper': {
          width: SIDEBAR_WIDTH,
          // boxSizing: 'border-box',
          // borderRight: '0px',
          backgroundColor: 'background.default',
        },
      }}
    >
      <Box sx={{
        overflow: 'auto', marginTop: '80px', height: '100%',
      }}
      >
        <List>
          {routes.map((item) => (
            <ListItem disablePadding key={item.path}>
              <ListItemButton
                component={NavLink}
                to={item.path}
                activeClassName="Mui-selected"
                activeStyle={activeStyle}
              >
                <ListItemText primary={item.displayName} sx={{ pl: 1 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Box>

      <ThemeSwitcher />

    </Drawer>
  );
};
