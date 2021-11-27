import { ActionCreatorWithPayload, createAction } from '@reduxjs/toolkit'
import { TokenList, Version } from '@uniswap/token-lists'

export const fetchTokenList: Readonly<{
  pending: ActionCreatorWithPayload<{ url: string; requestId: string; chainId: number }>
  fulfilled: ActionCreatorWithPayload<{ url: string; tokenList: TokenList; requestId: string; chainId: number }>
  rejected: ActionCreatorWithPayload<{ url: string; errorMessage: string; requestId: string; chainId: number }>
}> = {
  pending: createAction('lists/fetchTokenList/pending'),
  fulfilled: createAction('lists/fetchTokenList/fulfilled'),
  rejected: createAction('lists/fetchTokenList/rejected'),
}
// add and remove from list options
export const addList = createAction<string>('lists/addList')
export const removeList = createAction<string>('lists/removeList')

// select which lists to search across from loaded lists
export const enableList = createAction<string>('lists/enableList')
export const disableList = createAction<string>('lists/disableList')

// versioning
export const acceptListUpdate = createAction<string>('lists/acceptListUpdate')
export const rejectVersionUpdate = createAction<Version>('lists/rejectVersionUpdate')

// chainId
export const acceptListUpdateOfChainId = createAction<number>('lists/acceptListUpdateOfChainId')
