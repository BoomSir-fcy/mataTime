import { Language } from 'config/localization';

export interface systemCustom {
  isDark: boolean;
  notification: boolean;
  languange: languange;
  autoTranslation: boolean;
}

export interface languange {
  id: number;
  label: string;
  value: Language;
}
export interface NftProperties {
  id: string | number // 数据库中的记录id
  token: string // NFT合约地址
  nft: string // 盲盒开出的nft合约地址
  token_id: string // nft id
  owner: string // 所有者
  level: number // 等级
  power: number // 算力
  res: string // 所使用的资源
  owner_status: number
  author: string
  createdTime: number // 创建时间，秒
}
export interface NftInfo {
  properties: NftProperties
  name: string // 名称
  description: string // 描述
  image: string
}