declare namespace Api {
  namespace Coins {
    interface CoinInfo {
      add_time: string
      circulating_supply: string
      coin_id: string
      coin_image_url: string
      coin_name: string
      coin_symbol: string
      current_price: string
      price_change_24h: string
      total_volume: string
      price_change_percentage_24h: string
    }
    interface FetchCoinsListParams {
      page: number
      page_size: number
    }
    interface FetchCoinInfoParams {
      coin_id: string
    }
  }
}
