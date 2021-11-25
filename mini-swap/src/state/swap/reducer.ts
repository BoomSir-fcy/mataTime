import { Price } from 'dsgswap-sdk'
import { createReducer, createAsyncThunk } from '@reduxjs/toolkit'
import {
  Field, replaceSwapState, selectCurrency, setRecipient, switchCurrencies, typeInput,
  updatePolyDataIndex, resetPolyData,
} from './actions'
import { PolySwapState, PolyData, PolyDataIndex, PolyAllowance } from '../types'
import get1inchSwapData, {
  fetchSpenderAddress,
  fetchAllowancceAmount,
  fetchPolyQuoteData,
} from './fetchPolySwapData'

export interface SwapState extends PolySwapState {
  readonly independentField: Field
  readonly typedValue: string
  readonly [Field.INPUT]: {
    readonly currencyId: string | undefined
  }
  readonly [Field.OUTPUT]: {
    readonly currencyId: string | undefined
  }
  // the typed recipient address or ENS name, or null if swap should go to sender
  readonly recipient: string | null
}

const initialState: SwapState = {
  independentField: Field.INPUT,
  typedValue: '',
  [Field.INPUT]: {
    currencyId: '',
  },
  [Field.OUTPUT]: {
    currencyId: '',
  },
  recipient: null,
  polyDataIndex: {
    lastQueryTimestamp: 0,
  }
}

// Async thunks
export const fetchPolySwapDataAsync = createAsyncThunk<PolyData, { chainId: number, polyQueryData: PolyDataIndex } >(
  'swap/fetchPolySwapDataAsync',
  async ({ chainId, polyQueryData }) => {
    const res: PolyData = await fetchPolyQuoteData(chainId, polyQueryData)

    return res
  },
)
export const fetchPolyAllowaceAsync = createAsyncThunk<
  {spender: string, allowance: { tokenAddress: string, allowance: string } },
  {chainId: number, account: string, tokenAddress: string}
  >(
    'swap/fetchSpenderAddressAsync',
    async ({ chainId, account, tokenAddress }, { getState }) => {
      const { swap } = getState() as { swap: SwapState }
      let spender = swap.polySpender
      if (!spender) {
        spender = await fetchSpenderAddress(chainId)
      }
      const allowance = await fetchAllowancceAmount(spender, account, tokenAddress)

      return {
        spender,
        allowance: {
          tokenAddress,
          allowance,
        },
      }
    },
  )
export const fetchPolySpenderAsync = createAsyncThunk<string, number>(
    'swap/fetchPolySpenderAsync',
    async (chainId, { getState }) => {
      const { swap } = getState() as { swap: SwapState }
      let spender = swap.polySpender
      if (!spender) {
        spender = await fetchSpenderAddress(chainId)
      }

      return spender
    },
  )
// export const fetchPolyAllowaceAsync = createAsyncThunk<PolyData, { chainId: number, polyQueryData: PolyDataIndex } >(
//   'swap/fetchPolySwapDataAsync',
//   async ({ chainId, polyQueryData }) => {
//     const res: PolyData = await get1inchSwapData(chainId, polyQueryData)
//     return res
//   },
// )

export default createReducer<SwapState>(initialState, (builder) =>
  builder
    .addCase(
      replaceSwapState,
      (state, { payload: { typedValue, recipient, field, inputCurrencyId, outputCurrencyId } }) => {
        return {
          ...state,
          [Field.INPUT]: {
            currencyId: inputCurrencyId,
          },
          [Field.OUTPUT]: {
            currencyId: outputCurrencyId,
          },
          independentField: field,
          typedValue,
          recipient,
        }
      },
    )
    .addCase(selectCurrency, (state, { payload: { currencyId, field } }) => {
      const otherField = field === Field.INPUT ? Field.OUTPUT : Field.INPUT
      if (currencyId === state[otherField].currencyId) {
        // the case where we have to swap the order
        return {
          ...state,
          independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
          [field]: { currencyId },
          [otherField]: { currencyId: state[field].currencyId },
        }
      }
      // the normal case
      return {
        ...state,
        [field]: { currencyId },
      }
    })
    .addCase(switchCurrencies, (state) => {
      return {
        ...state,
        independentField: state.independentField === Field.INPUT ? Field.OUTPUT : Field.INPUT,
        [Field.INPUT]: { currencyId: state[Field.OUTPUT].currencyId },
        [Field.OUTPUT]: { currencyId: state[Field.INPUT].currencyId },
      }
    })
    .addCase(typeInput, (state, { payload: { field, typedValue } }) => {
      return {
        ...state,
        independentField: field,
        typedValue,
      }
    })
    .addCase(setRecipient, (state, { payload: { recipient } }) => {
      state.recipient = recipient
    })
    .addCase(updatePolyDataIndex, (state, { payload }) => {
      state.polyDataIndex = {
        ...state.polyDataIndex,
        ...payload.data
      }
    })
    .addCase(resetPolyData, (state) => {
      state.polyData = null
    })
    .addCase(fetchPolyAllowaceAsync.fulfilled, (state, { payload }) => {
      const { spender, allowance } = payload
      const { allowance: allowanceString, tokenAddress } = allowance
      state.polySpender = spender
      state.polyAllowance[tokenAddress] = allowanceString
    })
    .addCase(fetchPolySpenderAsync.fulfilled, (state, { payload }) => {
      state.polySpender = payload
    })
    .addCase(fetchPolySwapDataAsync.fulfilled, (state, { payload }) => {
      state.polyData = payload
    }),
)
