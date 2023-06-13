import React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {
  useAccount, useConnect, useDisconnect, useBalance,
} from 'wagmi';

export const WagmiWallet = () => {
  const { address, isConnected } = useAccount();
  // const { data: ensName } = useEnsName({ address });
  const {
    connect, connectors, error, isLoading, pendingConnector,
  } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: balance } = useBalance({ address });

  if (!isConnected) {
    return (
      <Box>
        {connectors.map((c) => (
          <Button
            disabled={!c.ready}
            key={c.id}
            onClick={() => connect({ connector: c })}
          >
            {c.name}
            {!c.ready && ' (unsupported)'}
            {isLoading && c.id === pendingConnector?.id && ' (connecting)'}
          </Button>
        ))}

        {error && <div>{error.message}</div>}
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Avatar alt="User avatar" src="https://picsum.photos/100/100.jpg" sx={{ marginRight: 2 }} />
      <Box>
        {/* <Typography variant="body1">{ensName ? `${ensName} (${address})` : address}</Typography> */}
        <Typography variant="body1">{address}</Typography>
        {balance && <Typography variant="body2">{`Balance ${balance.formatted} ${balance.symbol}`}</Typography>}
      </Box>
      <Button onClick={() => disconnect()}>Disconnect</Button>
    </Box>
  );
};
