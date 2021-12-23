import axios, { AxiosRequestConfig } from 'axios';
import qs from 'qs';
import { storage } from 'config';
import eventBus from '../utils/eventBus';
import dispatchHttpErrorEvent from './httpErrorEvent';

const baseURL = process.env.REACT_APP_API_HOST;

axios.defaults.timeout = 30 * 1000;
// axios.defaults.withCredentials = false
// axios.defaults.headers.common['token'] = "";

axios.defaults.headers.post['Content-Type'] =
  'application/x-www-form-urlencoded;charset=UTF-8';
axios.defaults.headers.get.Accept = 'application/json';

axios.interceptors.response.use(
  response => {
    if (response.data) {
      return response;
    }
    return Promise.reject(response);
  },
  error => {
    return Promise.reject(error.response);
  },
);

export class Http {
  async request(configs: AxiosRequestConfig) {
    let response;
    let token = localStorage.getItem(storage.Token);

    try {
      response = await axios({
        ...configs,
        headers: { ...configs.headers, token: token },
      });

      dispatchHttpErrorEvent(response.data);
      return response.data;
    } catch (e: any) {
      if (e?.status === 401) {
        eventBus.dispatchEvent(new Event('unauthorized'));
      }
    }
  }

  async get(url: string, params?) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      baseURL,
      params,
    };
    return this.request(config);
  }

  async post(url: string, data?) {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url,
      data,
      baseURL,
    };
    return this.request(config);
  }

  static checkSuccess(res: Api.Error) {
    return res && res.code === 1;
  }
}

export default new Http();
