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
    lable: 'homeMenuWallet',
    children: [
      {
        icon: 'icon-qianbao',
        activeIcon: 'icon-qianbao1',
        title: '钱包资产',
        path: '/account',
        lable: 'AccountMenu Wallet'
      },
      {
        icon: 'icon-qitawenti',
        activeIcon: 'icon-qitawenti1',
        coming: true,
        title: 'Time兑换',
        path: '/account/time',
        lable: 'AccountMenu Time'
      },
      {
        icon: 'icon-qianbao',
        activeIcon: 'icon-qianbao1',
        title: '质押Staking',
        path: '/account/stake',
        lable: 'AccountMenu Staking'
      },
      {
        icon: 'icon-w31shezhi',
        activeIcon: 'icon-a-31shezhi1',
        title: 'NFT',
        coming: true,
        path: '/account/safeset',
        lable: 'AccountMenu NFT'
      },
      {
        icon: 'icon-w31shezhi',
        activeIcon: 'icon-a-31shezhi1',
        coming: true,
        title: '打赏明细',
        path: '/account/safeset',
        lable: 'AccountMenu Reward'
      }
    ]
  },
  {
    icon: 'icon-w31shezhi',
    activeIcon: 'icon-a-31shezhi1',
    path: '/set/safeset',
    lable: 'homeMenuSet'
  }
]

export const hideLeftNavPath = [
  '/login'
]

export default config
