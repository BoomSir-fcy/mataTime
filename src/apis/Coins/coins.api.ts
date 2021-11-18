import { Http } from '../http';

export class CoinsApi extends Http {
  // 获取币种列表
  async fetchCoinsList(params: Api.Coins.FetchCoinsListParams) {
    const res: {
      code: number
      data: {
        coin_list: Api.Coins.CoinInfo[]
        page: number
        page_size: number
        total_count: number
      }
    } = await this.get('v1/coin/show_coin', { ...params });
    if (res.code === 1) {
      return res.data
    }
    return {
      ...params,
      coin_list: [],
      total_count: 0,
    }
  }
  // 获取币种详情
  async fetchCoinInfoById(params: Api.Coins.FetchCoinInfoParams) {
    const res: Api.Coins.CoinInfo = await this.get('/v1/coin/show_coin', { ...params });
    return res;
  }
}
