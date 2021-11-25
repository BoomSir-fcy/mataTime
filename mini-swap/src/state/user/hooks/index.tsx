import { Pair, Token } from 'dsgswap-sdk'
import flatMap from 'lodash/flatMap'
import { useCallback, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { BASES_TO_TRACK_LIQUIDITY_FOR, PINNED_PAIRS } from 'config/constants'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { useAllTokens } from 'hooks/Tokens'
import { AppDispatch, AppState } from '../../index'
import {
  addSerializedPair,
  addSerializedToken,
  removeSerializedToken,
  SerializedPair,
  updateUserDeadline,
  updateUserExpertMode,
  updateUserSlippageTolerance,
  updateUserUsePloy,
  updateSystemUsePloy,
  setVDsgInviteAddress,
  updateUserSingleHopOnly,
  muteAudio,
  unmuteAudio,
  toggleTheme as toggleThemeAction,
  updateUseFarmGet,
  updateUseFarmPledge,
  updateUseNestGet,
  updateUseNestPledge
} from '../actions'
import { serializeToken, deserializeToken } from './helpers'

export function useAudioModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const audioPlay = useSelector<AppState, AppState['user']['audioPlay']>((state) => state.user.audioPlay)

  const toggleSetAudioMode = useCallback(() => {
    if (audioPlay) {
      dispatch(muteAudio())
    } else {
      dispatch(unmuteAudio())
    }
  }, [audioPlay, dispatch])

  return [audioPlay, toggleSetAudioMode]
}

export function useIsExpertMode(): boolean {
  return useSelector<AppState, AppState['user']['userExpertMode']>((state) => state.user.userExpertMode)
}

export function useExpertModeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const expertMode = useIsExpertMode()

  const toggleSetExpertMode = useCallback(() => {
    dispatch(updateUserExpertMode({ userExpertMode: !expertMode }))
  }, [expertMode, dispatch])

  return [expertMode, toggleSetExpertMode]
}

export function useThemeManager(): [boolean, () => void] {
  const dispatch = useDispatch<AppDispatch>()
  const isDark = useSelector<AppState, AppState['user']['isDark']>((state) => state.user.isDark)

  const toggleTheme = useCallback(() => {
    dispatch(toggleThemeAction())
  }, [dispatch])

  return [isDark, toggleTheme]
}

export function useUserSingleHopOnly(): [boolean, (newSingleHopOnly: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>()

  const singleHopOnly = useSelector<AppState, AppState['user']['userSingleHopOnly']>(
    (state) => state.user.userSingleHopOnly,
  )

  const setSingleHopOnly = useCallback(
    (newSingleHopOnly: boolean) => {
      dispatch(updateUserSingleHopOnly({ userSingleHopOnly: newSingleHopOnly }))
    },
    [dispatch],
  )

  return [singleHopOnly, setSingleHopOnly]
}

export function useUserSlippageTolerance(): [number, (slippage: number) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userSlippageTolerance = useSelector<AppState, AppState['user']['userSlippageTolerance']>((state) => {
    return state.user.userSlippageTolerance
  })

  const setUserSlippageTolerance = useCallback(
    (slippage: number) => {
      dispatch(updateUserSlippageTolerance({ userSlippageTolerance: slippage }))
    },
    [dispatch],
  )

  return [userSlippageTolerance, setUserSlippageTolerance]
}

export function useUserUsePoly(): [boolean, (usePoly: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userUsePoly = useSelector<AppState, AppState['user']['userUsePoly']>((state) => {
    return state.user.userUsePoly
  })

  const setUserUsePoly = useCallback(
    (usePoly: boolean) => {
      dispatch(updateUserUsePloy({ userUsePoly: usePoly }))
    },
    [dispatch],
  )

  return [userUsePoly, setUserUsePoly]
}

// 农场已完成
export function useUseFarmGet(): [boolean, (usePoly: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const useFarmGet = useSelector<AppState, AppState['user']['useFarmGet']>((state) => {
    return state.user.useFarmGet
  })

  const setUseFarmGet = useCallback(
    (usePoly: boolean) => {
      dispatch(updateUseFarmGet({ useFarmGet: usePoly }))
    },
    [dispatch],
  )

  return [useFarmGet, setUseFarmGet]
}

// 农场已质押
export function useUseFarmPledge(): [boolean, (usePoly: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const useFarmPledge = useSelector<AppState, AppState['user']['useFarmPledge']>((state) => {
    return state.user.useFarmPledge
  })

  const setUseFarmPledge = useCallback(
    (usePoly: boolean) => {
      dispatch(updateUseFarmPledge({ useFarmPledge: usePoly }))
    },
    [dispatch],
  )

  return [useFarmPledge, setUseFarmPledge]
}

// 龙巢已完成
export function useUseNestGet(): [boolean, (usePoly: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const useNestGet = useSelector<AppState, AppState['user']['useNestGet']>((state) => {
    return state.user.useNestGet
  })

  const setUseNestGet = useCallback(
    (usePoly: boolean) => {
      dispatch(updateUseNestGet({ useNestGet: usePoly }))
    },
    [dispatch],
  )

  return [useNestGet, setUseNestGet]
}

// 龙巢已质押
export function useUseNestPledge(): [boolean, (usePoly: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const useNestPledge = useSelector<AppState, AppState['user']['useNestPledge']>((state) => {
    return state.user.useNestPledge
  })

  const setUseNestPledge = useCallback(
    (usePoly: boolean) => {
      dispatch(updateUseNestPledge({ useNestPledge: usePoly }))
    },
    [dispatch],
  )

  return [useNestPledge, setUseNestPledge]
}

export function useSystemUsePoly(): [boolean, (usePoly: boolean) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userUsePoly = useSelector<AppState, AppState['user']['systemUsePoly']>((state) => {
    return state.user.systemUsePoly
  })

  const setSystemUsePoly = useCallback(
    (usePoly: boolean) => {
      dispatch(updateSystemUsePloy({ systemUsePoly: usePoly }))
    },
    [dispatch],
  )

  return [userUsePoly, setSystemUsePoly]
}

export function useVDsgInviteAddress(): [string, (address: string) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const inviteAddress = useSelector<AppState, AppState['user']['vDsgInviteAddress']>((state) => {
    return state.user.vDsgInviteAddress
  })

  const setInviteAddress = useCallback(
    (address: string) => {
      dispatch(setVDsgInviteAddress({ address }))
    },
    [dispatch],
  )

  return [inviteAddress, setInviteAddress]
}

export function useUserTransactionTTL(): [number, (slippage: number) => void] {
  const dispatch = useDispatch<AppDispatch>()
  const userDeadline = useSelector<AppState, AppState['user']['userDeadline']>((state) => {
    return state.user.userDeadline
  })

  const setUserDeadline = useCallback(
    (deadline: number) => {
      dispatch(updateUserDeadline({ userDeadline: deadline }))
    },
    [dispatch],
  )

  return [userDeadline, setUserDeadline]
}

export function useAddUserToken(): (token: Token) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (token: Token) => {
      dispatch(addSerializedToken({ serializedToken: serializeToken(token) }))
    },
    [dispatch],
  )
}

export function useRemoveUserAddedToken(): (chainId: number, address: string) => void {
  const dispatch = useDispatch<AppDispatch>()
  return useCallback(
    (chainId: number, address: string) => {
      dispatch(removeSerializedToken({ chainId, address }))
    },
    [dispatch],
  )
}

function serializePair(pair: Pair): SerializedPair {
  return {
    token0: serializeToken(pair.token0),
    token1: serializeToken(pair.token1),
  }
}

export function usePairAdder(): (pair: Pair) => void {
  const dispatch = useDispatch<AppDispatch>()

  return useCallback(
    (pair: Pair) => {
      dispatch(addSerializedPair({ serializedPair: serializePair(pair) }))
    },
    [dispatch],
  )
}

/**
 * Given two tokens return the liquidity token that represents its liquidity shares
 * @param tokenA one of the two tokens
 * @param tokenB the other token
 */
export function toV2LiquidityToken([tokenA, tokenB]: [Token, Token]): Token {
  return new Token(tokenA.chainId, Pair.getAddress(tokenA, tokenB), 18, 'Dsg-LP', 'Magician LPs')
}

/**
 * Returns all the pairs of tokens that are tracked by the user for the current chain ID.
 */
export function useTrackedTokenPairs(): [Token, Token][] {
  const { chainId } = useActiveWeb3React()
  const tokens = useAllTokens()

  // pinned pairs
  const pinnedPairs = useMemo(() => (chainId ? PINNED_PAIRS[chainId] ?? [] : []), [chainId])

  // pairs for every token against every base
  const generatedPairs: [Token, Token][] = useMemo(
    () =>
      chainId
        ? flatMap(Object.keys(tokens), (tokenAddress) => {
            const token = tokens[tokenAddress]
            // for each token on the current chain,
            return (
              // loop though all bases on the current chain
              (BASES_TO_TRACK_LIQUIDITY_FOR[chainId] ?? [])
                // to construct pairs of the given token with each base
                .map((base) => {
                  if (base.address === token.address) {
                    return null
                  }
                  return [base, token]
                })
                .filter((p): p is [Token, Token] => p !== null)
            )
          })
        : [],
    [tokens, chainId],
  )

  // pairs saved by users
  const savedSerializedPairs = useSelector<AppState, AppState['user']['pairs']>(({ user: { pairs } }) => pairs)

  const userPairs: [Token, Token][] = useMemo(() => {
    if (!chainId || !savedSerializedPairs) return []
    const forChain = savedSerializedPairs[chainId]
    if (!forChain) return []

    return Object.keys(forChain).map((pairId) => {
      return [deserializeToken(forChain[pairId].token0), deserializeToken(forChain[pairId].token1)]
    })
  }, [savedSerializedPairs, chainId])
  const combinedList = useMemo(
    () => userPairs.concat(generatedPairs).concat(pinnedPairs),
    [generatedPairs, pinnedPairs, userPairs],
  )

  return useMemo(() => {
    // dedupes pairs of tokens in the combined list
    const keyed = combinedList.reduce<{ [key: string]: [Token, Token] }>((memo, [tokenA, tokenB]) => {
      const sorted = tokenA.sortsBefore(tokenB)
      const key = sorted ? `${tokenA.address}:${tokenB.address}` : `${tokenB.address}:${tokenA.address}`
      if (memo[key]) return memo
      memo[key] = sorted ? [tokenA, tokenB] : [tokenB, tokenA]
      return memo
    }, {})

    return Object.keys(keyed).map((key) => keyed[key])
  }, [combinedList])
}
