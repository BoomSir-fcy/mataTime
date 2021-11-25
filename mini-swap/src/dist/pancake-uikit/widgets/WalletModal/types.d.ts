import { FC } from "react";
import { SvgProps } from "../../components/Svg/types";
export declare enum ConnectorNames {
    Injected = "injected",
    WalletConnect = "walletconnect",
    BSC = "bsc"
}
export declare type Login = (connectorId: ConnectorNames) => void;
export interface Config {
    title: string;
    icon: FC<SvgProps>;
    connectorId: ConnectorNames;
    priority: number;
}
import { Toast } from 'pancake-uikit';
export declare type ToastCustom = (opt: {
    title: Toast['title'];
    description?: Toast['description'];
    customIcon?: Toast['customIcon'];
    ttl: Toast['ttl'];
    width?: Toast['width'];
    stackSpacing?: Toast['stackSpacing'];
}) => void;
