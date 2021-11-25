import { ChainId, BASE_URL, POLY_BASE_URL, getValueWithChainId } from 'dsgswap-sdk'
import { request } from './axios'

interface QueryParams {
  [elem: string]: any
}

export const get = (url: string, params?: QueryParams): Promise<any> =>
  request({
    url,
    params,
    baseURL: getValueWithChainId(BASE_URL),
    method: 'get',
    withCredentials: false,
  })
export const get1inch = (url: string, params?: QueryParams): Promise<any> =>
  request({
    url,
    params,
    method: 'get',
    withCredentials: false,
    baseURL: getValueWithChainId(POLY_BASE_URL),
  })
export const post = (url: string, data?: QueryParams, config = {}): Promise<any> =>
  request({
    url,
    data,
    baseURL: getValueWithChainId(BASE_URL),
    method: 'post',
    withCredentials: false,
    ...config,
  })

export const getNftInfo = (token: string, id: string | number): Promise<any> => get(`/nft/${token}/${id}`)
export const getMysteryNftInfo = (id: string | number): Promise<any> => get(`/mysterybox/box/${id}`)
export const getNftsList = (account: string): Promise<any> => get(`/nfts/${account.toLowerCase()}`)
export const getMarketSales = (data: QueryParams): Promise<any> => get('/market/sales', data)
export const getMarketSalesSum = (data: QueryParams): Promise<any> => get('/market/sum', data)
export const nftsFilter = (data: QueryParams): Promise<any> => get('/nfts-filter', data)
export const getMysteryboxFactories = (): Promise<any> => get('mysterybox/factories')

export const get1inchQuoteData = (chainId: number, data: QueryParams): Promise<any> => get1inch(`/${chainId}/quote`, data)
export const get1inchSwapData = (chainId: number, data: QueryParams): Promise<any> => get1inch(`/${chainId}/swap`, data)
export const get1inchApproveCallData = (chainId: number, data: QueryParams): Promise<any> => get1inch(`/${chainId}/approve/calldata`, data)
export const get1inchApproveSpender = (chainId: number, data?: QueryParams): Promise<any> => get1inch(`/${chainId}/approve/spender`, data)

export const postTest = (params: QueryParams): Promise<any> => post('/nfts/test', params)
