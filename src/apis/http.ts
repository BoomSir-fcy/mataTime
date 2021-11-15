import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { Dispatch } from 'store';

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
    let token =
      localStorage.getItem('token') ||
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzcxMzQ0ODYsImlzcyI6ImRpbm9zYXVyMzM4OSIsIm5iZiI6MTYzNjUyOTY4NiwidWlkIjoiMTY3MDA0ODgwIiwiYWRkcmVzcyI6IjB4NmYzMGFkNmNBMTY2NGRmRDBiQjFGNjM5ZDlGYzgwNzE0OUNDMTNBYSJ9.kYbyMXHQYG03jHrDySEQ_EWRAwCIdktiMulClzsJ5sE';

    try {
      response = await axios({ ...configs, headers: { ...configs.headers, token: token } });
      // response.data.code === 0 && toast.error("Token expiration");
      return response.data;
    } catch (e) {
      console.log(e);
      // Dispatch.toast.show({ type: 'error', text: 'error' });
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
