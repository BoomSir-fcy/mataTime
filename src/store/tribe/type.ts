export enum TribeType {
  BASIC = 1, // 公开
  PRO = 2, // 付费
}

export enum FeeType {
  DEFAULT = 1, // 默认
  CUSTOMIZE = 2, // 自定义
}

export enum Timing {
  FOREVER = 1, // 永久
  JOIN_TRIBE = 2, // 以加入部落的时间计时
}

// 1 未领取 2已领取 3 取消质押 4 已质押 5已过期
export enum NftStatus {
  UnReceive = 1,
  Received = 2,
  UnStake = 3,
  Staked = 4,
  Expired = 5,
}
export interface TribeBaseInfo {
  name?: string;
  logo?: string;
  introduction?: string;
  feeToken?: string;
  feeAmount?: string;
  validDate?: number;
  perTime?: number;
  ownerPercent?: number;
  authorPercent?: number;
  memberPercent?: number;
  nftAddress?: string;
  nftid?: number;
}

export interface TribesNFTInfo {
  claimOnwerNFT?: boolean;
  ownerNFTName?: string;
  ownerNFTIntroduction?: string;
  ownerNFTImage?: string;
  memberNFTName?: string;
  memberNFTIntroduction?: string;
  memberNFTImage?: string;
  initMemberNFT?: boolean;
}

export interface FeeCoin {
  tokenAddress?: string;
  symbol?: string;
}
export interface NftInfo {
  name?: string;
  image?: string;
  nftToken?: string;
  nftId?: number;
}
export interface TribeList {
  id: number;
  name: string;
  logo: string;
  type: number;
  nick_name: string;
  address: string;
  nft_image: string;
}

export interface TribeInfo {
  tribe: {
    name: string;
    logo: string;
    type: number;
  };
  selected_count: string;
  post_count: string;
  member_count: string;
}
export interface TribeState {
  tribeId?: number;
  isApproveStakeNft?: boolean;
  tribeBaseInfo?: TribeBaseInfo;
  tribesNftInfo?: TribesNFTInfo;
  feeCoinList?: FeeCoin[];
  ticketNftList?: NftInfo[];
  loading?: boolean;
  activeNftInfo?: NftInfo;
  tribeList: TribeList[];
  tribeInfo: TribeInfo;
}
