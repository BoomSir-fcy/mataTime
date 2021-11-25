import { ContextApi } from 'contexts/Localization/types'
import { PageMeta } from './types'

const PAGE_TITLE = 'Magician'

export const DEFAULT_META: PageMeta = {
  title: PAGE_TITLE,
  description:
    'The most popular AMM on Polygon by user count! Earn MBT through yield farming, then stake it in Syrup Pools to earn more tokens! Initial Farm Offerings, NFTs, and more, on a platform you can trust.',
  image: '/images/dinosaur.jpg',
}

export const getCustomMeta = (path: string, t: ContextApi['t']): PageMeta => {
  switch (path) {
    case '/':
      return {
        title: `${t('Home')} | ${t(PAGE_TITLE)}`,
      }
    case '/competition':
      return {
        title: `${t('Trading Battle')} | ${t(PAGE_TITLE)}`,
      }
    case '/prediction':
      return {
        title: `${t('Prediction')} | ${t(PAGE_TITLE)}`,
      }
    case '/farms':
      return {
        title: `${t('Farms')} | ${t(PAGE_TITLE)}`,
      }
    case '/pools':
      return {
        title: `${t('Pools')} | ${t(PAGE_TITLE)}`,
      }
    case '/nest':
      return {
        title: `${t('Magic house')} | ${t(PAGE_TITLE)}`,
      }
    case '/lottery':
      return {
        title: `${t('Lottery')} | ${t(PAGE_TITLE)}`,
      }
    case '/collectibles':
      return {
        title: `${t('Collectibles')} | ${t(PAGE_TITLE)}`,
      }
    case '/ifo':
      return {
        title: `${t('Initial Farm Offering')} | ${t(PAGE_TITLE)}`,
      }
    case '/teams':
      return {
        title: `${t('Leaderboard')} | ${t(PAGE_TITLE)}`,
      }
    case '/profile/tasks':
      return {
        title: `${t('Task Center')} | ${t(PAGE_TITLE)}`,
      }
    case '/profile':
      return {
        title: `${t('Your Profile')} | ${t(PAGE_TITLE)}`,
      }
    case '/nft':
      return {
        title: `${t('NFT Market')} | ${t(PAGE_TITLE)}`,
      }
    case '/nft/bag':
      return {
        title: `${t('NFT Bag')} | ${t(PAGE_TITLE)}`,
      }
    case '/trading':
      return {
        title: `${t('Trading')} | ${t(PAGE_TITLE)}`,
      }
    case '/vmbt':
      return {
        title: `${t('Member')} | ${t(PAGE_TITLE)}`,
      }
    default:
      return null
  }
}
