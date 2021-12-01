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
    path: '/news/me',
    badge: true,
    count: 0,
    lable: 'homeMenuNews',
    children: [
      {
        icon: 'icon-aite',
        path: '/news/me',
        lable: 'newsMeMenuTitle',
        coming: false,
      },
      {
        icon: 'icon-pinglun',
        path: '/news/comment',
        lable: 'newsCommentMenuTitle'
      },
      {
        icon: 'icon-aixin',
        path: '/news/praise',
        lable: 'newsPraiseMenuTitle'
      },
      {
        icon: 'icon-xiaoxi',
        path: '/news/notice',
        lable: 'newsNoticeMenuTitle'
      }
    ]
  },
  {
    icon: 'icon-youxiang',
    activeIcon: 'icon-youxiang1',
    path: '/',
    badge: true,
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
