import { useCallback, useMemo } from 'react'
import useActiveWeb3React from 'hooks/useActiveWeb3React'
import { get1inchSwapData } from 'config/axios'
import { useSwapState } from '../../../state/swap/hooks'
import { useUserSlippageTolerance } from '../../../state/user/hooks'


export function usePloyCallData() {
  const { account, chainId, library } = useActiveWeb3React()
  const [allowedSlippage] = useUserSlippageTolerance()
  const { polyDataIndex } = useSwapState()

  const { 
    fromTokenAddress,
    toTokenAddress,
    amountDecimal,
  } = polyDataIndex || {}
  const params = useMemo(() => (
    {
      fromTokenAddress,
      toTokenAddress,
      amount: amountDecimal,
      fromAddress: account,
      slippage: allowedSlippage / 100,
    }
  ), [fromTokenAddress, toTokenAddress, amountDecimal, account, allowedSlippage])

  const polySwapCallback = useCallback(
    async () => {
      const callData = await get1inchSwapData(chainId, params)
      delete callData.tx.gasPrice // ethersjs will find the gasPrice needed
      delete callData.tx.gas // ethersjs will find the gasLimit for users
      callData.tx.value = `0x${Number(callData.tx.value).toString(16)}`
      const res = await library.getSigner().sendTransaction(callData.tx)
      return res.hash
    },
    [chainId, params, library],
  )
  return {
    polySwapCallback,
  }
}