import axios, { AxiosRequestConfig } from 'axios';
import eventBus from '../utils/eventBus';
import { storage } from 'config';
import history from '../routerHistory';

const baseURL =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_API_HOST
    : 'http://192.168.101.122:8888';

axios.defaults.timeout = 30 * 1000;
// axios.defaults.withCredentials = false
// axios.defaults.headers.common['token'] = "";

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.get.Accept = 'application/json';

axios.interceptors.response.use(
  response => {
    eventBus.dispatchEvent(new MessageEvent('http', {
      data: response.data,
    }))
    if (response.data) {
      return response;
    }
    return Promise.reject(response);
  },
  error => {
    return Promise.reject(error.response);
  }
);

export class Http {
  async request(configs: AxiosRequestConfig) {
    let response;
    let token = localStorage.getItem(storage.Token);

    try {
      response = await axios({
        ...configs,
        headers: { ...configs.headers, token: token }
      });
      // const { code, msg } = response.data
      // if (code === 0) {
      //   toast.error(msg || '服务器出错！')
      // }
      return response.data;
    } catch (e: any) {
      eventBus.dispatchEvent(new MessageEvent('httpError', {
        data: e,
      }))
      // if (e?.status === 401) return history.push('/login');
    }
  }

  async get(url: string, params?) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      baseURL,
      params
    };
    return this.request(config);
  }

  async post(url: string, data?) {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      baseURL
    };
    return this.request(config);
  }

  static checkSuccess(res: Api.Error) {
    return res && res.code === 1;
  };
}

export default new Http();
