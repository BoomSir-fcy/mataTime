import axios, { AxiosRequestConfig } from 'axios';
import history from '../routerHistory';

const baseURL = process.env.NODE_ENV === 'production' ? process.env.REACT_APP_API_HOST : '/';

axios.defaults.timeout = 30 * 1000;
// axios.defaults.withCredentials = false
// axios.defaults.headers.common['token'] = "";

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8';
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
  }
);

export class Http {
  async request(configs: AxiosRequestConfig) {
    let response;
    let token = localStorage.getItem('token') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Mzc3Mzk0NzIsImlzcyI6ImRpbm9zYXVyMzM4OSIsIm5iZiI6MTYzNzEzNDY3MiwidWlkIjoiMjYyMDY4MDYwNCIsImFkZHJlc3MiOiIweDc4YWY3MGZGMjBlODJhQ0M5MkI1YjQyYzBBNzMyNDM5M0YwRDgxOTUifQ.uRtCeVGCfKNRqfc4dsa4HX0IfvsrxxV7OBoZ-jg54PA';

    try {
      response = await axios({ ...configs, headers: { ...configs.headers, token: token } });
      return response.data;
    } catch (e: any) {
      if (e?.status === 401) return history.push('/login');
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
}

export default new Http();
