import { ChainId } from '../wallet/config';

export interface Address {
  [ChainId.BSC_MAINNET]: string;
  [ChainId.BSC_TESTNET]?: string;
}

// export interface MenuNavLink {
//   path: string,
//   icon?: string,
//   lable?: string
//   activeIcon?: string,
//   coming?: boolean
//   hide?: boolean
//   hideLeft?: boolean
//   hideRight?: boolean
//   markPath?: string[]
//   badge?: number
// }
export interface MenuNavBase {
  path: string;
  icon?: string;
  lable?: string;
  activeIcon?: string;
  backPath?: string; // 三级导航栏返回跳转路径
  coming?: boolean; // 是否弹窗敬请期待
  hide?: boolean; // 隐藏导航栏lable及图标
  hideLeft?: boolean; // 隐藏左侧导航栏
  hideRight?: boolean; // 隐藏右侧swap
  markPath?: string[]; // 子页面标记
  badgeName?: string; // 微标明
}

export interface MenuNavConfig extends MenuNavBase {
  badgeName?: string; // 微标明
  children?: MenuNavConfig[];
  customName?: string;
}

export interface MenuNavLink extends MenuNavBase {
  badge?: number; // 微数
}

export interface TbasMenuConfig {
  path: string;
  activeIcon?: string;
  icon: string;
  badgeName?: boolean; // 微标明
}
