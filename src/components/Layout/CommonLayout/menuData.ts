export type MenuProps = {
  icon: string;
  name: string;
  link?: string;
}

export const NewsMenuData: MenuProps[] = [
  {
    icon: 'icon-aite',
    name: '提到我的',
    link: '/news/me'
  },
  {
    icon: 'icon-pinglun',
    name: '评论',
    link: '/news/comment'
  },
  {
    icon: 'icon-aixin',
    name: '点赞',
    link: '/news/praise'
  },
  {
    icon: 'icon-xiaoxi',
    name: '通知',
    link: '/news/notice'
  }
]


export default {
  '/news': NewsMenuData
}