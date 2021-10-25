import Metamask from "uikit/components/Svg/Icons/Metamask";
import WalletConnect from "uikit/components/Svg/Icons/WalletConnect";
import TrustWallet from "uikit/components/Svg/Icons/TrustWallet";
import MathWallet from "uikit/components/Svg/Icons/MathWallet";
import TokenPocket from "uikit/components/Svg/Icons/TokenPocket";
import BinanceChain from "uikit/components/Svg/Icons/BinanceChain";
import SafePal from "uikit/components/Svg/Icons/SafePal";
import Coin98 from "uikit/components/Svg/Icons/Coin98";
// import BitKeepIcon from "uikit/components/Svg/Icons/BitKeep";

import { Config, ConnectorNames } from "./types";

const connectors: Config[] = [
  {
    title: "Metamask",
    icon: Metamask,
    connectorId: ConnectorNames.Injected,
    priority: 1,
  },
  {
    title: "WalletConnect",
    icon: WalletConnect,
    connectorId: ConnectorNames.WalletConnect,
    priority: 2,
  },
  {
    title: "Trust Wallet",
    icon: TrustWallet,
    connectorId: ConnectorNames.Injected,
    priority: 3,
  },
  {
    title: "MathWallet",
    icon: MathWallet,
    connectorId: ConnectorNames.Injected,
    priority: 999,
  },
  {
    title: "TokenPocket",
    icon: TokenPocket,
    connectorId: ConnectorNames.Injected,
    priority: 999,
  },

  // {
  //   title: "BitKeep",
  //   icon: BitKeepIcon,
  //   connectorId: ConnectorNames.Injected,
  //   priority: 999,
  // },
  {
    title: "Binance Chain",
    icon: BinanceChain,
    connectorId: ConnectorNames.BSC,
    priority: 999,
  },
  {
    title: "SafePal",
    icon: SafePal,
    connectorId: ConnectorNames.Injected,
    priority: 999,
  },
  {
    title: "Coin98",
    icon: Coin98,
    connectorId: ConnectorNames.Injected,
    priority: 999,
  },
];

export enum ChainId {
  BSC_MAINNET = 56,
  BSC_TESTNET = 97,
  MATIC_MAINET = 137,
}

export const BASE_BSC_SCAN_URLS = {
  [ChainId.BSC_MAINNET]: 'https://bscscan.com',
  [ChainId.BSC_TESTNET]: 'https://testnet.bscscan.com',
  [ChainId.MATIC_MAINET]: 'https://testnet.bscscan.com',
}


export default connectors;
export const connectorLocalStorageKey = "connectorIdv2";
export const walletLocalStorageKey = "wallet";
