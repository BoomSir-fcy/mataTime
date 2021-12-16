export type MenuProps = {
  icon: string;
  name: string;
  link?: string;
  alias: string;
  transaltion: string;
};

export const NewsMenuData: MenuProps[] = [
  {
    icon: 'icon-aite',
    name: '提到我的',
    link: '/notification/me',
    alias: 'message_at_me',
    transaltion: 'newsMeMenuTitle'
  },
  {
    icon: 'icon-pinglun',
    name: '评论',
    link: '/notification/comment',
    alias: 'message_comment',
    transaltion: 'newsCommentMenuTitle'
  },
  {
    icon: 'icon-aixin',
    name: '点赞',
    link: '/notification/praise',
    alias: 'message_like',
    transaltion: 'newsPraiseMenuTitle'
  },
  {
    icon: 'icon-xiaoxi',
    name: '通知',
    link: '/notification/notice',
    alias: 'message_system',
    transaltion: 'newsNoticeMenuTitle'
  }
];

export default {
  '/news': NewsMenuData
};
