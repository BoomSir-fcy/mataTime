import { Http } from '../http';

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
        coin_list: [],
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
