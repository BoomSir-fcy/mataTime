import { ToastContainerProps } from 'react-toastify';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import { PoolsState } from './pools/types';
import { Login } from './login';
import { WalletState } from './wallet/type';
import { TaskState } from './task/type';
import { StuffElement } from 'config/constants/stuffImages';

export interface State {
  pools: PoolsState;
  loginReducer: Login;
  wallet: WalletState;
  task: TaskState;
}

export interface AppStore {
  isDark: boolean;
  show: boolean;
  toast: {
    type: string;
    text: string;
    toastContainer?: ToastContainerProps;
  };
}
export enum NftOwnerState {
  NORMAL,
  SELLING,
  STAKING,
  WAIT_OPEN_BOX,
}
export interface NftProperties {
  id: string | number; // 数据库中的记录id
  token: address; // NFT合约地址
  nft: address; // 盲盒开出的nft合约地址
  token_id: string; // nft id
  owner: address; // 所有者
  level: number; // 等级
  power: number; // 算力
  res: string; // 所使用的资源
  owner_status: NftOwnerState;
  author: address;
  createdTime: number; // 创建时间，秒
}
export interface LevelFees {
  [elme: number]: string;
}
export interface NftInfo {
  properties: NftProperties;
  name: string; // 名称
  description: string; // 描述
  image: string;
  isApprovedMarket: boolean; // 是否授权给市场
  key: string; // `${item.properties.token}_${item.properties.token_id}_${item.properties.owner_status}`
  isAllowanceNft?: string;
  upgradeFee?: string;
  levelFees?: LevelFees;
}
export interface StuffElementLimit {
  limitSize: number;
  createdSize: number;
  enable?: boolean;
}
export interface StuffElementRender extends StuffElementLimit, StuffElement { }

export interface InviteCodes {
  code: string;
  code_hash: string;
  lock_hash: string;
}
export interface PickNftState {
  selectData: StuffElement[];
  stuffRes: StuffElementRender[][];
  isApprove: boolean;
  codeUsed: boolean;
  loaded: boolean;
  allowanceTicket: string;
  ticketInfo: {
    ticketPrice: string;
    count?: string;
    limit?: string;
    loaded: boolean;
  };
  codes: InviteCodes;
  inviteLoading: boolean;
  inviteInfo: {
    nft_: string;
    userProfile_: string;
    codeLockDuration_: number;
    maxGendCodeCount_: number;
    toToken_: string;
  },
  buyInfo: {
    enableBuy: boolean
    price: string
    loading: boolean
  },
  codeInfo: {
    lockUser: string;
    lockedAt: number;
    address: string;
    state: number;
  }
}
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  State,
  unknown,
  AnyAction
>;
