import React from 'react';
import { Currency, Token } from 'dsgswap-sdk';
import { SwapInterface } from './swap';
import { ProvidersPorps } from './Providers';
interface MiniSwapInterface extends ProvidersPorps, SwapInterface {
    onConnectWallet?: () => void;
    onInputCurrencyChange?: (currency: Currency | Token) => void;
    onOutputCurrencyChange?: (currency: Currency | Token) => void;
}
declare const MiniSwap: React.FC<MiniSwapInterface>;
export default MiniSwap;
