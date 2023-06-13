import {
  WagmiConfig, createConfig, configureChains,
} from 'wagmi';
import { mainnet, goerli, localhost } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import CssBaseline from '@mui/material/CssBaseline';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from 'components';
import { MetaMaskConnector } from 'wagmi/connectors/metaMask';
import { CoinbaseWalletConnector } from 'wagmi/connectors/coinbaseWallet';
import { ThemeProvider } from './contexts';
import { routes } from './routes';

const { chains, publicClient, webSocketPublicClient } = configureChains(
  [mainnet, goerli, localhost],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  connectors: [
    new MetaMaskConnector({ chains }),
    new CoinbaseWalletConnector({
      chains,
      options: {
        appName: 'wagmi',
      },
    }),
  ],
  publicClient,
  webSocketPublicClient,
});

export const App = () => (
  <ThemeProvider>
    <WagmiConfig config={config}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {routes.map(({ path, element }) => <Route path={path} element={element} key={path} />)}
            <Route path="*" element={<h1>Not Found</h1>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </WagmiConfig>
  </ThemeProvider>
);
