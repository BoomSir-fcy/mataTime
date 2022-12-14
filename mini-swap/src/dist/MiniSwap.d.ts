import React from 'react';
import { SwapInterface } from './Swap';
import { ProvidersPorps } from './Providers';
interface MiniSwapInterface extends ProvidersPorps, SwapInterface {
    onConnectWallet?: () => void;
}
declare const MiniSwap: React.FC<MiniSwapInterface>;
export default MiniSwap;
