import { MenuNavConfig, TbasMenuConfig } from './types';

export const pathConfig = {
  messageAtMePath: '/notification/me',
  messageCommentPath: '/notification/comment',
  messageLikePath: '/notification/praise',
  messageRepostPath: '/notification/repost',
  messageNoticePath: '/notification/notice',
};

export enum ConfigId {
  TRIBE_ME,
  TRIBE_ME_MASTER_NFT,
  TRIBE_ME_MEMBER_NFT,
  TRIBE_ME_INVITE_SETTING,
}

export const menuNavConfig: MenuNavConfig[] = [
  {
    icon: 'icon-shouye',
    activeIcon: 'icon-shouye1',
    path: '/login',
    hide: true,
    hideLeft: true,
    hideRight: true,
    lable: 'homeMenuHome',
  },
  {
    icon: 'icon-shouye',
    activeIcon: 'icon-shouye1',
    path: '/',
    lable: 'homeMenuHome',
  },
  {
    icon: 'icon-xingqiu',
    activeIcon: 'icon-xingqiu1',
    path: '/tribe',
    coming: false,
    lable: 'Tribe',
  },
  {
    icon: 'icon-qizi',
    activeIcon: 'icon-flag',
    path: '/task',
    hideRight: true,
    lable: 'homeMenuTask',
  },
  {
    icon: 'icon-zhifeiji1',
    activeIcon: 'icon-zhifeiji',
    lable: 'meMenuInvite',
    path: '/task/invites',
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
        coming: false,
      },
      {
        icon: 'icon-pinglun',
        activeIcon: 'icon-pinglun1',
        path: pathConfig.messageCommentPath,
        badgeName: 'message_comment',
        lable: 'newsCommentMenuTitle',
      },
      {
        icon: 'icon-aixin',
        activeIcon: 'icon-aixin1',
        path: pathConfig.messageLikePath,
        badgeName: 'message_like',
        lable: 'newsPraiseMenuTitle',
      },
      {
        icon: 'icon-retweet',
        activeIcon: 'icon-retweet',
        path: pathConfig.messageRepostPath,
        badgeName: 'message_forward',
        lable: 'newsRepostMenuTitle',
      },
      {
        icon: 'icon-tixing',
        activeIcon: 'icon-tixing1',
        badgeName: 'message_system',
        path: pathConfig.messageNoticePath,
        lable: 'newsNoticeMenuTitle',
      },
    ],
  },
  // {
  //   icon: 'icon-youxiang',
  //   activeIcon: 'icon-youxiang1',
  //   path: '/letter',
  //   badgeName: 'letter',
  //   coming: true,
  //   lable: 'homeMenuLetter',
  // },
  // {
  //   icon: 'icon-qitawenti',
  //   activeIcon: 'icon-qitawenti1',
  //   coming: true,
  //   path: '/other',
  //   lable: 'homeMenuOther',
  // },
  {
    icon: 'icon-qianbao2',
    activeIcon: 'icon-a-qianbao1',
    path: '/account',
    lable: 'homeMenuWallet',
    children: [
      {
        icon: 'icon-qianbao2',
        activeIcon: 'icon-a-qianbao1',
        path: '/account',
        hideRight: true,
        lable: 'AccountMenu Wallet',
      },
      {
        icon: 'icon-w59',
        activeIcon: 'icon-w59',
        lable: 'AccountMenu Time',
        path: '/account/time',
        hideRight: true,
        markPath: ['/account/faq'],
      },
      {
        icon: 'icon-w59',
        activeIcon: 'icon-w59',
        lable: 'AccountMenu Time',
        hideRight: true,
        hide: true,
        path: '/account/faq',
      },
      {
        icon: 'icon-shuichi',
        activeIcon: 'icon-xiaofangshuixiang_shuichi',
        path: '/account/stake',
        hideRight: true,
        lable: 'AccountMenu Staking',
      },
      {
        icon: 'icon-NFTkapai1',
        activeIcon: 'icon-NFTkapai',
        // coming: true,
        hideRight: true,
        path: '/account/tribe-ticket',
        lable: 'Tribe Ticket',
      },
      {
        icon: 'icon-NFTkapai1',
        activeIcon: 'icon-NFTkapai',
        coming: true,
        path: '/account/safeset',
        lable: 'AccountMenu NFT',
      },
      {
        icon: 'icon-purse1S',
        activeIcon: 'icon-purse1S',
        hideRight: true,
        path: '/account/reward',
        lable: 'AccountMenu Reward',
      },
      {
        icon: 'icon-w59',
        activeIcon: 'icon-w59',
        lable: 'AccountMenu Time',
        hideRight: true,
        hide: true,
        path: '/swap',
      },
    ],
  },
  {
    path: '/me',
    customName: 'me',
    children: [
      {
        icon: 'icon-gerenxinxi',
        activeIcon: 'icon-gerenxinxi1',
        lable: 'meMenuHome',
        path: '/me',
        customName: 'me',
        markPath: ['/me/edit'],
      },
      {
        icon: 'icon-wodebula',
        activeIcon: 'icon-bulaguanli',
        lable: 'My Tribe',
        path: '/me/tribe',
        backPath: '',
        configId: ConfigId.TRIBE_ME,
        children: [
          {
            icon: 'icon-wodebula',
            activeIcon: 'icon-bulaguanli',
            lable: 'Tribal Info',
            path: '/me/tribe/info',
            hideRight: true,
          },
          {
            icon: 'icon-yly_jisuanqi',
            activeIcon: 'icon-jisuanqi',
            lable: 'Fee Setting',
            path: '/me/tribe/fee-setting',
            hideRight: true,
          },
          {
            icon: 'icon-zhuti-copy',
            activeIcon: 'icon-zhuti',
            lable: 'Topics Setting',
            path: '/me/tribe/topics-setting',
            hideRight: true,
          },
          {
            icon: 'icon-wenjian',
            activeIcon: 'icon-wenjianjia',
            lable: 'Tribal Docs',
            path: '/me/tribe/tribal-docs',
            hideRight: true,
          },
          {
            icon: 'icon-gerenxinxi',
            activeIcon: 'icon-gerenxinxi1',
            lable: 'Master NFT',
            path: '/me/tribe/master-nft',
            hideRight: true,
            configId: ConfigId.TRIBE_ME_MASTER_NFT,
          },
          {
            icon: 'icon-tongyong-chengyuan',
            activeIcon: 'icon-tongyong-chengyuan1',
            lable: 'Member NFT',
            badgeIconName: 'icon-tishi',
            path: '/me/tribe/member-nft',
            hideRight: true,
            configId: ConfigId.TRIBE_ME_MEMBER_NFT,
          },
          {
            icon: 'icon-zhifeiji1',
            activeIcon: 'icon-zhifeiji',
            lable: 'Invitation Setting',
            path: '/me/tribe/invitation-setting',
            configId: ConfigId.TRIBE_ME_INVITE_SETTING,
            hideRight: true,
            hide: true,
          },
          {
            icon: 'icon-shezhi',
            activeIcon: 'icon-shezhi1',
            lable: 'Member Management',
            path: '/me/tribe/member-management',
            hideRight: true,
          },
        ],
      },
      {
        icon: 'icon-e31guanzhu',
        activeIcon: 'icon-e31guanzhuxuanzhong',
        lable: 'meMenuFollow',
        path: '/me/follow',
      },
      {
        icon: 'icon-aixin',
        activeIcon: 'icon-aixin1',
        lable: 'meMenuFans',
        path: '/me/fans',
      },
      {
        icon: 'icon-dianzan',
        activeIcon: 'icon-dianzan1',
        lable: 'meMenuLink',
        path: '/me/praise',
      },
      {
        icon: 'icon-shoucang',
        activeIcon: 'icon-shoucang1',
        lable: 'meMenuFav',
        path: '/me/collect',
      },
      {
        icon: 'icon-shoucang',
        activeIcon: 'icon-shoucang1',
        lable: 'meMenuFav',
        hide: true,
        path: '/me/edit',
      },
      {
        icon: 'icon-zhifeiji1',
        activeIcon: 'icon-zhifeiji',
        lable: 'meMenuInvite',
        path: '/task/invite',
      },
      {
        icon: 'icon-pingbi1',
        activeIcon: 'icon-pingbi',
        lable: 'meMenuShield',
        path: '/me/shield',
      },
    ],
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
        path: '/set/safeset',
      },
      {
        icon: 'icon-tixing',
        activeIcon: 'icon-tixing1',
        lable: 'setMenuNotification',
        path: '/set/noticeset',
      },
      {
        icon: 'icon-aixin',
        activeIcon: 'icon-aixin1',
        lable: 'setMenuPreference',
        path: '/set/preference',
      },
      {
        icon: 'icon-shouye',
        activeIcon: 'icon-shouye1',
        path: '/picknft',
        hide: true,
        hideLeft: true,
        hideRight: true,
        lable: 'homeMenuHome',
      },
    ],
  },
  {
    icon: 'icon-shouye',
    activeIcon: 'icon-shouye1',
    path: '/create',
    hide: true,
    hideLeft: true,
    hideRight: true,
    lable: 'createNft',
  },
];

export const tbasNavConfig: TbasMenuConfig[] = [
  {
    icon: 'icon-shouye',
    activeIcon: 'icon-shouye1',
    path: '/',
  },
  {
    icon: 'icon-tixing',
    activeIcon: 'icon-tixing1',
    path: pathConfig.messageAtMePath,
    badgeName: true,
  },
  {
    icon: 'icon-qianbao2',
    activeIcon: 'icon-a-qianbao1',
    path: '/account',
  },
];

const getHidePath = (
  activeRes: string[],
  config: MenuNavConfig[],
  key: string,
) => {
  let res: string[] = [...activeRes];
  config.forEach(item => {
    if (item[key]) {
      res = res.concat(item.path);
    }
    if (item.children) {
      res = getHidePath(res, item.children, key);
    }
  });
  return res;
};
export const hideLeftNavPath = (() => {
  return getHidePath([], menuNavConfig, 'hideLeft');
})();

export const hideSidebarPath = (() => {
  return getHidePath(
    [
      '/task/invite',
      '/task/invites',
      '/task/friendsList',
      '/task/rankingList',
      '/tribe/post',
      '/tribe/create',
      '/tribe/detail',
      '/tribe/postdetail',
    ],
    menuNavConfig,
    'hideRight',
  );
})();

export const hideSidebarLine = (() => {
  return getHidePath(['/tribe/detail'], menuNavConfig, 'hideRightLine');
})();

export default menuNavConfig;
