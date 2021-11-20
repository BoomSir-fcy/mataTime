const menuArr = [
  {
    icon: 'icon-shouye',
    activeIcon: 'icon-shouye1',
    title: '首页',
    path: '/',
    transaltion: 'homeMenuHome'
  },
  {
    icon: 'icon-xingqiu',
    activeIcon: 'icon-xingqiu1',
    title: '星球',
    path: '/',
    transaltion: 'homeMenuStar'
  },
  {
    icon: 'icon-xiaoxi',
    activeIcon: 'icon-xiaoxi1',
    title: '消息',
    path: '/news/me',
    badge: true,
    count:0,
    transaltion: 'homeMenuNews'
  },
  {
    icon: 'icon-youxiang',
    activeIcon: 'icon-youxiang1',
    title: '私信',
    path: '/',
    badge: true,
    count:0,
    transaltion: 'homeMenuLetter'
  },
  {
    icon: 'icon-qitawenti',
    activeIcon: 'icon-qitawenti1',
    title: '其他',
    path: '/',
    transaltion: 'homeMenuOther'
  },
  {
    icon: 'icon-qianbao',
    activeIcon: 'icon-qianbao1',
    title: '钱包',
    path: '/',
    transaltion: 'homeMenuWallet'
  },
  {
    icon: 'icon-w31shezhi',
    activeIcon: 'icon-a-31shezhi1',
    title: '设置',
    path: '/set/safeset',
    transaltion: 'homeMenuSet'
  }
];
export default menuArr;
