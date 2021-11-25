import React from "react";
import { Login, Config } from "./types";
interface Props {
    walletConfig: Config;
    login: Login;
    onDismiss?: () => void;
}
declare const WalletItem: React.FC<Props>;
export default WalletItem;
