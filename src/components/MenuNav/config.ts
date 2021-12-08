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
    icon: 'icon-tixing',
    activeIcon: 'icon-tixing1',
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
        icon: 'icon-tixing',
        activeIcon: 'icon-tixing1',
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
    icon: 'icon-qianbao2',
    activeIcon: 'icon-a-qianbao1',
    path: '/account',
    lable: 'homeMenuWallet',
    children: [
      {
        icon: 'icon-qianbao2',
        activeIcon: 'icon-a-qianbao1',
        title: '钱包资产',
        path: '/account',
        lable: 'AccountMenu Wallet'
      },
      {
        icon: 'icon-w59',
        activeIcon: 'icon-w59',
        title: 'Time兑换',
        lable: 'AccountMenu Time',
        path: '/account/time',
        markPath: ['/account/faq'],
      },
      {
        icon: 'icon-w59',
        activeIcon: 'icon-w59',
        title: 'Time兑换',
        lable: 'AccountMenu Time',
        hide: true,
        path: '/account/faq'
      },
      {
        icon: 'icon-shuichi',
        activeIcon: 'icon-xiaofangshuixiang_shuichi',
        title: '质押Staking',
        path: '/account/stake',
        lable: 'AccountMenu Staking'
      },
      {
        icon: 'icon-NFTkapai1',
        activeIcon: 'icon-NFTkapai',
        title: 'NFT',
        coming: true,
        path: '/account/safeset',
        lable: 'AccountMenu NFT'
      },
      {
        icon: 'icon-purse1S',
        activeIcon: 'icon-purse1S',
        title: '打赏明细',
        path: '/account/reward',
        lable: 'AccountMenu Reward'
      }
    ]
  },
  {
    path: '/me',
    children: [
      {
        icon: 'icon-gerenxinxi',
        activeIcon: 'icon-gerenxinxi1',
        lable: 'meMenuHome',
        path: '/me',
        markPath: ['/me/edit']
      },
      {
        icon: 'icon-e31guanzhu',
        activeIcon: 'icon-e31guanzhuxuanzhong',
        lable: 'meMenuFollow',
        path: '/me/follow'
      },
      {
        icon: 'icon-aixin',
        activeIcon: 'icon-aixin1',
        lable: 'meMenuFans',
        path: '/me/fans'
      },
      {
        icon: 'icon-dianzan',
        activeIcon: 'icon-dianzan1',
        lable: 'meMenuLink',
        path: '/me/praise'
      },
      {
        icon: 'icon-shoucang',
        activeIcon: 'icon-shoucang1',
        lable: 'meMenuFav',
        path: '/me/collect'
      },
      {
        icon: 'icon-shoucang',
        activeIcon: 'icon-shoucang1',
        lable: 'meMenuFav',
        hide: true,
        path: '/me/edit'
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
    icon: 'icon-shezhi',
    activeIcon: 'icon-shezhi1',
    path: '/set/safeset',
    lable: 'homeMenuSet',
    children: [
      {
        icon: 'icon-gerenxinxi',
        activeIcon: 'icon-gerenxinxi1',
        lable: 'setMenuAccountSecurity',
        path: '/set/safeset'
      },
      {
        icon: 'icon-tixing',
        activeIcon: 'icon-tixing1',
        lable: 'setMenuNotification',
        path: '/set/noticeset'
      },
      {
        icon: 'icon-aixin',
        activeIcon: 'icon-aixin1',
        lable: 'setMenuPreference',
        path: '/set/likeset'
      }
    ]
  }
];

export const hideLeftNavPath = ['/login'];

export default config;
