import BigNumber from 'bignumber.js'
import { request, gql } from 'graphql-request'
import { GRAPH_API_SWAPTS } from 'config/constants/endpoints'
import { BIG_ZERO } from 'utils/bigNumber'

export interface DsgTotalData {
  totalVolumeUSD: string
}

export const MAX_LOTTERIES_REQUEST_SIZE = 100

// reserveUSD
export const getTime24HoursData = async (token: string): Promise<DsgTotalData> => {
  try {
    const response0 = await request(
      GRAPH_API_SWAPTS,
      gql`
        query getPairHourDatas($first: Int!) {
          pairs(first: $first, where: { volumeUSD_gt: "0", token0: "${token}"}) {
            name
            id
            volumeUSD
            pairHourData(first:24, orderBy: hourStartUnix, orderDirection: desc) {
              hourlyVolumeUSD
              hourStartUnix
            }
          }
        }
      `,
      { first: 100, where: {} },
    )
    const response1 = await request(
      GRAPH_API_SWAPTS,
      gql`
        query getPairHourDatas($first: Int!) {
          pairs(first: $first, where: { volumeUSD_gt: "0", token1: "${token}"}) {
            name
            id
            volumeUSD
            pairHourData(first:24, orderBy: hourStartUnix, orderDirection: desc) {
              hourlyVolumeUSD
              hourStartUnix
            }
          }
        }
      `,
      { first: 100, where: {} },
    )
    let totalVolumeUSD = new BigNumber(0)
    response0.pairs.forEach(item => {
      item.pairHourData.forEach(subItem => {
        totalVolumeUSD = totalVolumeUSD.plus(subItem.hourlyVolumeUSD)
      })
    })
    response1.pairs.forEach(item => {
      item.pairHourData.forEach(subItem => {
        totalVolumeUSD = totalVolumeUSD.plus(subItem.hourlyVolumeUSD)
      })
    })
    return {
      totalVolumeUSD: totalVolumeUSD.toString(),
    }
  } catch (error) {
    console.error(error)
    return null
  }
}
