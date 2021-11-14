import axios, { AxiosRequestConfig } from 'axios'
import qs from 'qs'
/* eslint-disable */

axios.defaults.timeout = 30 * 1000
axios.defaults.withCredentials = false
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.get.Accept = 'application/json'

/**
 * resetConfig
 */

interface AxiosConfig extends AxiosRequestConfig {
  cancleId?: string
  noLang?: boolean
  errMsg?: string
  hideErrMsg?: boolean
}

function resetConfig(config: AxiosConfig) {
  const resConfig: AxiosConfig = {
    ...config,
  }
  if (resConfig.noLang) return resConfig
  if (!resConfig.data) {
    resConfig.data = {}
  }
  if (!resConfig.params) {
    resConfig.params = {}
  }
  return resConfig
}

const request = axios.create()
request.interceptors.request.use(
  (config: AxiosConfig) => {
    return resetConfig(config)
  },
  (error) => Promise.reject(error),
)
// Add a response interceptor
request.interceptors.response.use(
  (response) => {
    return response.data
  },
  (error) => {
    return Promise.reject(error)
  },
)
export { request }
