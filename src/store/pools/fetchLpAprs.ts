
import { getLiquidityPoolContract, getSinglePoolContract } from 'utils/contractHelpers'
import BigNumber from 'bignumber.js'
import { simpleRpcProvider } from 'utils/providers'
import { SinglePoolData } from './types'

// getNftMarketContract
// getNftMarketContract

interface CulFarm {
  [pid: string]: {
    pid: string,
    allocPoint: string
  }
}

interface EveDonate {
  [pid: string]: BigNumber
}
/**
 * @dev 计算交易手续费分红年化率
 * @param farms 赚取MBT农场
 * @returns 返回Aprs[]
 */
export const fetchLpRewardsApr = async (farms: SinglePoolData[]) => {
  try {
    const culFarm = {}
    farms.forEach(item => {
      culFarm[item.pid] = {
        pid: item.pid,
        allocPoint: item.allocPoint
      }
    })
    const blockNumber = await simpleRpcProvider.getBlockNumber()
    const contract = getSinglePoolContract()
    const filterFrom = contract.filters.Donate()
    const eveSales = await contract.queryFilter(filterFrom, blockNumber - 100, blockNumber)

    const res = {}
    eveSales.reverse().forEach((item, index) => {
      if (index > 11) return
      if (res[item.args.pid.toNumber()]) {
        res[item.args.pid.toNumber()] = res[item.args.pid.toNumber()].plus(item.args.realAmount.toJSON().hex)
      } else {
        res[item.args.pid.toNumber()] = new BigNumber(item.args.realAmount.toJSON().hex)
      }
    })
    const result = culAprHandle(culFarm, res)
    return result
  } catch (error) {
    console.error(error)
    return []
  }
}

const culAprHandle = (culFarm: CulFarm, eveSales: EveDonate) => {

  return Object.values(culFarm).map(item => {
    const donate = eveSales[item.pid] || new BigNumber(0)
    return {
      ...item,
      fourRealAmount: donate.times(6).times(365).times(100).toNumber()
    }
  })
}
