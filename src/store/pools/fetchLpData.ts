import multicall from 'utils/multicall'
import { getLiquidityPool } from 'utils/addressHelpers'
import liquidityPoolABI from 'config/abi/liquidityPool.json'

export const fetchLpDataList = async () => {
  const address = getLiquidityPool()

  const calls = [
    {
      address,
      name: 'getAllPoolViews'
    }
  ]
  try {
    const [allPoolViews] = await multicall(liquidityPoolABI, calls)
    console.log(allPoolViews)
    return []
  } catch (error) {
    console.error(error)
    return []
  }

}