import {
  Toolbar, AppBar, FormControl, Select, MenuItem, InputLabel, Box, Typography,
} from '@mui/material';
import { useNetwork, useSwitchNetwork } from 'wagmi';
import { WagmiWallet } from '../WagmiWallet';

export const Topbar = () => {
  const { chain } = useNetwork();
  const {
    chains, switchNetwork,
  } = useSwitchNetwork();
  return (
    <AppBar
      position="fixed"
      sx={{
        width: '100%',
        ml: 300,
        boxShadow: 'unset',
        backgroundColor: 'background.default',
        color: 'text.primary',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar>
        <Box display="flex" justifyContent="space-between" width="100%" alignItems="center">
          <Typography>WAGMI</Typography>

          <Box display="flex">
            <FormControl sx={{ m: 1, minWidth: 120 }}>
              <InputLabel id="network-select">Network</InputLabel>

              <Select
                label="Network"
                id="network-select"
                value={chain?.id}
                displayEmpty
                inputProps={{ 'aria-label': 'Without label' }}
              >
                {chains.map((ch) => (
                  <MenuItem key={ch.id} onClick={() => switchNetwork?.(ch.id)} value={ch.id}>{ch.name}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <WagmiWallet />
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
