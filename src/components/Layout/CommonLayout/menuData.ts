export type MenuProps = {
  icon: string;
  name: string;
  link?: string;
  alias: string;
}

export const NewsMenuData: MenuProps[] = [
  {
    icon: 'icon-aite',
    name: '提到我的',
    link: '/news/me',
    alias: 'message_at_me'
  },
  {
    icon: 'icon-pinglun',
    name: '评论',
    link: '/news/comment',
    alias: 'message_comment'
  },
  {
    icon: 'icon-aixin',
    name: '点赞',
    link: '/news/praise',
    alias: 'message_like'
  },
  {
    icon: 'icon-xiaoxi',
    name: '通知',
    link: '/news/notice',
    alias: 'message_system'
  }
]


export default {
  '/news': NewsMenuData
}