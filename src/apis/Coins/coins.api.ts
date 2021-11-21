import { Http } from '../http';

export const defaultBtcCoin = {
  add_time: '1637408821',
  circulating_supply: '0',
  coin_id: 'bitcoin',
  coin_image_url: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png?1547033579',
  coin_name: 'Bitcoin',
  coin_symbol: 'btc',
  current_price: '0',
  price_change_24h: '0',
  total_volume: '0',
  price_change_percentage_24h: '0',
}

export const defaultEthCoin = {
  add_time: '1637408821',
  circulating_supply: '0',
  coin_id: 'ethereum',
  coin_image_url: 'https://assets.coingecko.com/coins/images/279/large/ethereum.png?1595348880',
  coin_name: 'ethereum',
  coin_symbol: 'eth',
  current_price: '0',
  price_change_24h: '0',
  total_volume: '0',
  price_change_percentage_24h: '0',
}

export class CoinsApi extends Http {
  // 获取币种列表
  async fetchCoinsList(params: Api.Coins.FetchCoinsListParams) {
    try {
      const res: Api.Response<{
        coin_list: Api.Coins.CoinInfo[]
        page: number
        page_size: number
        total_count: number
      }> = await this.get('v1/coin/show_coin', { ...params });
      if (res.code === 1) {
        return res.data
      }
      throw new Error(res.msg)
    } catch (error) {
      console.error(error)
      return {
        ...params,
        coin_list: [{ ...defaultBtcCoin }, { ...defaultEthCoin }],
        total_count: 0,
      }
    }
  }
  // 获取币种详情
  async fetchCoinInfoById(params: Api.Coins.FetchCoinInfoParams) {
    try {
      const res: Api.Response<Api.Coins.CoinInfo> = await this.get('/v1/coin/show_coin_by_coinid', { ...params });
      if (res.code === 1) {
        return res.data;
      }
      throw new Error(res.msg)
    } catch (error) {
      console.error(error)
      return null
    }
  }
}
