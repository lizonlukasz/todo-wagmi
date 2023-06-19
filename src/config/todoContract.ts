import { goerli, localhost } from 'wagmi/chains';
import { Chain } from 'wagmi';

export const TODO_CONTRACT_ADDRESS: Record<number, `0x${string}`> = {
  [localhost.id]: '0xcc63fc46bd3b5b093448e9be557b563cef68346e',
  [goerli.id]: '0x756f739a0c08d3cb341bdf8e41796a113ae00b16',
};

export const getTodoContractAddress = (chain: Chain | undefined) => (
  chain
    ? TODO_CONTRACT_ADDRESS[chain.id]
    : undefined
);
