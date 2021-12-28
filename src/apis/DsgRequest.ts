import { request } from './DSGhttp'

// const baseURL = 'https://api.dsgmetaverse.com'
const baseURL = process.env.REACT_APP_DSG_API_HOST;

interface QueryParams {
  [elem: string]: any
}

export const get = (url: string, params?: QueryParams): Promise<any> =>
  request({
    url,
    params,
    baseURL,
    method: 'get',
    withCredentials: false,
  })
export const post = (url: string, data?: QueryParams, config = {}): Promise<any> =>
  request({
    url,
    data,
    baseURL,
    method: 'post',
    withCredentials: false,
    ...config,
  })
// 获取NFT列表
export const getNftsList = (account: string): Promise<any> => get(`/nfts/${account.toLowerCase()}`)
// Nft详情
export const getNftInfo = (token: string, id: string | number): Promise<any> => get(`/nft/${token}/${id}`)
// 获取接口返回的请求地址
export const getUrl = (url: string): Promise<any> => get(url)
