import { createReducer } from '@reduxjs/toolkit'
import { getVersionUpgrade, VersionUpgrade } from '@uniswap/token-lists'
// eslint-disable-next-line import/no-unresolved
import { TokenList } from '@uniswap/token-lists/dist/types'
import { ChainId, chainIdProxy } from 'dsgswap-sdk'
import { getTokenDefaultActiveList, UNSUPPORTED_LIST_URLS, getTokenDefaultList } from '../../config/constants/lists'

import { updateVersion } from '../global/actions'
import { acceptListUpdate, addList, fetchTokenList, removeList, enableList, disableList, acceptListUpdateOfChainId } from './actions'

export interface ListsState {
  readonly byUrl: {
    readonly [url: string]: {
      readonly current: TokenList | null
      readonly pendingUpdate: TokenList | null
      readonly loadingRequestId: string | null
      readonly error: string | null
    }
  }
  // this contains the default list of lists from the last time the updateVersion was called, i.e. the app was reloaded
  readonly lastInitializedDefaultListOfLists?: string[]

  // currently active lists
  readonly activeListUrls: string[] | undefined
  activeChainId: ChainId
}

type ListState = ListsState['byUrl'][string]

const NEW_LIST_STATE: ListState = {
  error: null,
  current: null,
  loadingRequestId: null,
  pendingUpdate: null,
}

type Mutable<T> = { -readonly [P in keyof T]: T[P] extends ReadonlyArray<infer U> ? U[] : T[P] }

const initialState: ListsState = {
  lastInitializedDefaultListOfLists: getTokenDefaultList(),
  byUrl: {
    ...getTokenDefaultList().concat(...UNSUPPORTED_LIST_URLS).reduce<Mutable<ListsState['byUrl']>>((memo, listUrl) => {
      memo[listUrl] = NEW_LIST_STATE
      return memo
    }, {}),
  },
  activeChainId: chainIdProxy.chainId,
  activeListUrls: getTokenDefaultActiveList(),
}

export default createReducer(initialState, (builder) =>
  builder
    .addCase(fetchTokenList.pending, (state, { payload: { requestId, url } }) => {
      state.byUrl[url] = {
        current: null,
        pendingUpdate: null,
        ...state.byUrl[url],
        loadingRequestId: requestId,
        error: null,
      }
    })
    .addCase(fetchTokenList.fulfilled, (state, { payload: { requestId, tokenList, url } }) => {
      const current = state.byUrl[url]?.current
      const loadingRequestId = state.byUrl[url]?.loadingRequestId

      // no-op if update does nothing
      if (current) {
        const upgradeType = getVersionUpgrade(current.version, tokenList.version)

        if (upgradeType === VersionUpgrade.NONE) return
        if (loadingRequestId === null || loadingRequestId === requestId) {
          state.byUrl[url] = {
            ...state.byUrl[url],
            loadingRequestId: null,
            error: null,
            current,
            pendingUpdate: tokenList,
          }
        }
      } else {
        // activate if on default active
        if (getTokenDefaultActiveList().includes(url)) {
          state.activeListUrls?.push(url)
        }

        state.byUrl[url] = {
          ...state.byUrl[url],
          loadingRequestId: null,
          error: null,
          current: tokenList,
          pendingUpdate: null,
        }
      }
    })
    .addCase(fetchTokenList.rejected, (state, { payload: { url, requestId, errorMessage } }) => {
      if (state.byUrl[url]?.loadingRequestId !== requestId) {
        // no-op since it's not the latest request
        return
      }

      state.byUrl[url] = {
        ...state.byUrl[url],
        loadingRequestId: null,
        error: errorMessage,
        current: null,
        pendingUpdate: null,
      }
    })
    .addCase(addList, (state, { payload: url }) => {
      if (!state.byUrl[url]) {
        state.byUrl[url] = NEW_LIST_STATE
      }
    })
    .addCase(removeList, (state, { payload: url }) => {
      if (state.byUrl[url]) {
        delete state.byUrl[url]
      }
      // remove list from active urls if needed
      if (state.activeListUrls && state.activeListUrls.includes(url)) {
        state.activeListUrls = state.activeListUrls.filter((u) => u !== url)
      }
    })
    .addCase(enableList, (state, { payload: url }) => {
      if (!state.byUrl[url]) {
        state.byUrl[url] = NEW_LIST_STATE
      }

      if (state.activeListUrls && !state.activeListUrls.includes(url)) {
        state.activeListUrls.push(url)
      }

      if (!state.activeListUrls) {
        state.activeListUrls = [url]
      }
    })
    .addCase(disableList, (state, { payload: url }) => {
      if (state.activeListUrls && state.activeListUrls.includes(url)) {
        state.activeListUrls = state.activeListUrls.filter((u) => u !== url)
      }
    })
    .addCase(acceptListUpdate, (state, { payload: url }) => {
      if (!state.byUrl[url]?.pendingUpdate) {
        throw new Error('accept list update called without pending update')
      }
      state.byUrl[url] = {
        ...state.byUrl[url],
        pendingUpdate: null,
        current: state.byUrl[url].pendingUpdate,
      }
    })
    .addCase(acceptListUpdateOfChainId, (state, { payload: chainId}) => {
      if (state.activeChainId === chainId) return
      state.activeChainId = chainId
      state.byUrl = {
        ...getTokenDefaultList().concat(...UNSUPPORTED_LIST_URLS).reduce<Mutable<ListsState['byUrl']>>((memo, listUrl) => {
          memo[listUrl] = NEW_LIST_STATE
          return memo
        }, {})
      }
    })
    .addCase(updateVersion, (state) => {
      // state loaded from localStorage, but new lists have never been initialized
      if (!state.lastInitializedDefaultListOfLists) {
        state.byUrl = initialState.byUrl
        state.activeListUrls = initialState.activeListUrls
      } else if (state.lastInitializedDefaultListOfLists) {
        const lastInitializedSet = state.lastInitializedDefaultListOfLists.reduce<Set<string>>(
          (s, l) => s.add(l),
          new Set(),
        )
        const newListOfListsSet = getTokenDefaultList().reduce<Set<string>>((s, l) => s.add(l), new Set())

        getTokenDefaultList().forEach((listUrl) => {
          if (!lastInitializedSet.has(listUrl)) {
            state.byUrl[listUrl] = NEW_LIST_STATE
          }
        })

        state.lastInitializedDefaultListOfLists.forEach((listUrl) => {
          if (!newListOfListsSet.has(listUrl)) {
            delete state.byUrl[listUrl]
          }
        })
      }

      state.lastInitializedDefaultListOfLists = getTokenDefaultList()

      // if no active lists, activate defaults
      if (!state.activeListUrls) {
        state.activeListUrls = getTokenDefaultActiveList()

        // for each list on default list, initialize if needed
        getTokenDefaultActiveList().map((listUrl: string) => {
          if (!state.byUrl[listUrl]) {
            state.byUrl[listUrl] = NEW_LIST_STATE
          }
          return true
        })
      }
    }),
)
