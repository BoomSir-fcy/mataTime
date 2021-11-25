
import { DSG_TOKENS_TOP100 } from 'dsgswap-sdk'
import { getAddress } from 'utils/addressHelpers'

export const UNSUPPORTED_LIST_URLS: string[] = []

// lower index == higher priority for token import
export const DEFAULT_LIST_OF_LISTS: string[] = [
  // PANCAKE_TOP100,
  // PANCAKE_EXTENDED,
  getAddress(DSG_TOKENS_TOP100),
  // getAddress(DSG_TOKENS_EXTENDED),
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

export const getTokenDefaultList = () => [
  // PANCAKE_TOP100,
  // PANCAKE_EXTENDED,
  getAddress(DSG_TOKENS_TOP100),
  // getAddress(DSG_TOKENS_EXTENDED),
  ...UNSUPPORTED_LIST_URLS, // need to load unsupported tokens as well
]

// default lists to be 'active' aka searched across
export const DEFAULT_ACTIVE_LIST_URLS: string[] = [getAddress(DSG_TOKENS_TOP100)]

export const getTokenDefaultActiveList = () => [getAddress(DSG_TOKENS_TOP100)]
