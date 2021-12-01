const navs = [
  {
    icon: 'icon-shouye',
    activeIcon: 'icon-shouye1',
    title: '首页',
    path: '/',
    lable: 'homeMenuHome'
  },
  {
    icon: 'icon-xingqiu',
    activeIcon: 'icon-xingqiu1',
    title: '星球',
    path: '/',
    coming: true,
    lable: 'homeMenuStar'
  },
  {
    icon: 'icon-xiaoxi',
    activeIcon: 'icon-xiaoxi1',
    title: '消息',
    path: '/news/me',
    badge: true,
    count: 0,
    lable: 'homeMenuNews'
  },
  {
    icon: 'icon-youxiang',
    activeIcon: 'icon-youxiang1',
    title: '私信',
    path: '/',
    badge: true,
    coming: true,
    count: 0,
    lable: 'homeMenuLetter'
  },
  {
    icon: 'icon-qitawenti',
    activeIcon: 'icon-qitawenti1',
    title: '其他',
    coming: true,
    path: '/',
    lable: 'homeMenuOther'
  },
  {
    icon: 'icon-qianbao',
    activeIcon: 'icon-qianbao1',
    title: '钱包',
    path: '/account',
    lable: 'homeMenuWallet'
  },
  {
    icon: 'icon-w31shezhi',
    activeIcon: 'icon-a-31shezhi1',
    title: '设置',
    path: '/set/safeset',
    lable: 'homeMenuSet'
  }
]

export default navs
