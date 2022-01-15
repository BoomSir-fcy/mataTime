import random from 'lodash/random';
import stuffRes from './stuff.json';

export interface StuffElement {
  src: string; // 资源地址
  images?: string; // 压缩资源地址
  id: number; // 组件id
  index: number; // 组件顺序
  lable: string; // 组件标签名字
  zIndex: number; // 组件展示层级
  isBase: boolean; // 是否为必需组件
  isDefault?: boolean; // 是否为默认组件组件（前端隐藏card）
}

export type StuffLable = { lable: string; length: number }[];

export const stuffLable = (() =>
  stuffRes.map(item => ({
    lable: item[0].lable,
    length: item[0].isBase ? item.length : item.length - 1,
  })))();

export const randomStuff = () => {
  return stuffRes.map(item => {
    const { length } = item;
    const index = random(0, length - 1);
    return item[index];
  });
};

export const SUPPORT_BACKGROUND_COLORS = [
  '0x0e00c6',
  '0x2d004b',
  '0x6C1C40',
  '0x4F2B00',
];

export default stuffRes;
