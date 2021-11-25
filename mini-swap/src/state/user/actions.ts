import { createAction } from '@reduxjs/toolkit'

export interface SerializedToken {
  chainId: number
  address: string
  decimals: number
  symbol?: string
  name?: string
}

export interface SerializedPair {
  token0: SerializedToken
  token1: SerializedToken
}

export const updateUserExpertMode = createAction<{ userExpertMode: boolean }>('user/updateUserExpertMode')
export const updateUserUsePloy = createAction<{ userUsePoly: boolean }>('user/updateUserUsePloy')
export const updateSystemUsePloy = createAction<{ systemUsePoly: boolean }>('user/updateSystemUsePloy')
export const updateUserSingleHopOnly = createAction<{ userSingleHopOnly: boolean }>('user/updateUserSingleHopOnly')
export const updateUserSlippageTolerance = createAction<{ userSlippageTolerance: number }>(
  'user/updateUserSlippageTolerance',
)
export const updateUserDeadline = createAction<{ userDeadline: number }>('user/updateUserDeadline')
export const addSerializedToken = createAction<{ serializedToken: SerializedToken }>('user/addSerializedToken')
export const removeSerializedToken = createAction<{ chainId: number; address: string }>('user/removeSerializedToken')
export const addSerializedPair = createAction<{ serializedPair: SerializedPair }>('user/addSerializedPair')
export const removeSerializedPair =
  createAction<{ chainId: number; tokenAAddress: string; tokenBAddress: string }>('user/removeSerializedPair')

export const muteAudio = createAction<void>('user/muteAudio')
export const unmuteAudio = createAction<void>('user/unmuteAudio')
export const toggleTheme = createAction<void>('user/toggleTheme')

export const setVDsgInviteAddress = createAction<{ address: string }>('user/setVDsgInviteAddress')
export const updateUseFarmGet = createAction<{ useFarmGet: boolean }>('user/updateUseFarmGet')
export const updateUseFarmPledge = createAction<{ useFarmPledge: boolean }>('user/updateUseFarmPledge')
export const updateUseNestGet = createAction<{ useNestGet: boolean }>('user/updateUseNestGet')
export const updateUseNestPledge = createAction<{ useNestPledge: boolean }>('user/updateUseNestPledge')
