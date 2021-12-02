export const pathConfig = {
  messageAtMePath: '/news/me',
  messageCommentPath: '/news/comment',
  messageLikePath: '/news/praise',
  messageNoticePath: '/news/notice'
};

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
    icon: 'icon-xingqiu',
    activeIcon: 'icon-xingqiu1',
    path: '/me',
    coming: true,
    lable: 'homeMenuStar',
    children: [
      {
        icon: 'icon-gerenxinxi',
        lable: 'meMenuHome',
        path: '/me'
      },
      {
        icon: 'icon-e31guanzhu',
        lable: 'meMenuFollow',
        path: '/me/follow'
      },
      {
        icon: 'icon-aixin',
        lable: 'meMenuFans',
        path: '/me/fans'
      },
      {
        icon: 'icon-dianzan',
        lable: 'meMenuLink',
        path: '/me/praise'
      },
      {
        icon: 'icon-shoucang',
        lable: 'meMenuFav',
        path: '/me/collect',
        badge: false
      }
      // {
      //   icon: 'icon-pingbi1',
      //   activeIcon: 'icon-pingbi',
      //   title: 'meMenuShield',
      //   path: '/me/shield',
      // },
    ]
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
        coming: false
      },
      {
        icon: 'icon-pinglun',
        activeIcon: 'icon-pinglun1',
        path: pathConfig.messageCommentPath,
        badgeName: 'message_comment',
        lable: 'newsCommentMenuTitle'
      },
      {
        icon: 'icon-aixin',
        activeIcon: 'icon-aixin1',
        path: pathConfig.messageLikePath,
        badgeName: 'message_like',
        lable: 'newsPraiseMenuTitle'
      },
      {
        icon: 'icon-xiaoxi',
        activeIcon: 'icon-xiaoxi1',
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
    lable: 'homeMenuSet',
    children: [
      {
        icon: 'icon-gerenxinxi',
        lable: 'setMenuAccountSecurity',
        path: '/set/safeset'
      },
      {
        icon: 'icon-xiaoxi',
        lable: 'setMenuNotification',
        path: '/set/noticeset'
      },
      {
        icon: 'icon-aixin',
        lable: 'setMenuPreference',
        path: '/set/likeset'
      }
    ]
  }
];

export default config;
