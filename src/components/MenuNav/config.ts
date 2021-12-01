export const pathConfig = {
  messageAtMePath: '/news/me',
  messageCommentPath: '/news/comment',
  messageLikePath: '/news/praise',
  messageNoticePath: '/news/notice',
}

const config = [
  {
    icon: 'icon-shouye',
    activeIcon: 'icon-shouye1',
    path: '/',
    lable: 'homeMenuHome'
  },
  {
    icon: 'icon-xingqiu',
    activeIcon: 'icon-xingqiu1',
    path: '/',
    coming: true,
    lable: 'homeMenuStar'
  },
  {
    icon: 'icon-xiaoxi',
    activeIcon: 'icon-xiaoxi1',
    path: pathConfig.messageAtMePath,
    badgeName: 'mineTotalMsgNum',
    lable: 'homeMenuNews',
    children: [
      {
        icon: 'icon-aite',
        path: pathConfig.messageAtMePath,
        lable: 'newsMeMenuTitle',
        badgeName: 'message_at_me',
        coming: false,
      },
      {
        icon: 'icon-pinglun',
        path: pathConfig.messageCommentPath,
        badgeName: 'message_comment',
        lable: 'newsCommentMenuTitle'
      },
      {
        icon: 'icon-aixin',
        path: pathConfig.messageLikePath,
        badgeName: 'message_like',
        lable: 'newsPraiseMenuTitle'
      },
      {
        icon: 'icon-xiaoxi',
        badgeName: 'message_secret',
        path: pathConfig.messageNoticePath,
        lable: 'newsNoticeMenuTitle'
      }
    ]
  },
  {
    icon: 'icon-youxiang',
    activeIcon: 'icon-youxiang1',
    path: '/',
    badgeName: 'letter',
    coming: true,
    count: 0,
    lable: 'homeMenuLetter'
  },
  {
    icon: 'icon-qitawenti',
    activeIcon: 'icon-qitawenti1',
    coming: true,
    path: '/',
    lable: 'homeMenuOther'
  },
  {
    icon: 'icon-qianbao',
    activeIcon: 'icon-qianbao1',
    path: '/account',
    lable: 'homeMenuWallet'
  },
  {
    icon: 'icon-w31shezhi',
    activeIcon: 'icon-a-31shezhi1',
    path: '/set/safeset',
    lable: 'homeMenuSet'
  }
]

export default config
