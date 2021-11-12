import React from 'react';
export interface ProvidersPorps {
    isDark?: boolean;
    chainId?: number;
    lang?: string;
    onConnectWallet?: () => void;
}
declare const Providers: React.FC<ProvidersPorps>;
export default Providers;
