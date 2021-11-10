import axios, { AxiosRequestConfig } from 'axios';
import { toast } from 'react-toastify';
import { Dispatch } from 'store';

// const baseURL = "http://192.168.101.122:8888"

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
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2MzcxMzE1MDEsImlzcyI6ImRpbm9zYXVyMzM4OSIsIm5iZiI6MTYzNjUyNjcwMSwidWlkIjoiMjk5NjA0NzM4NyIsImFkZHJlc3MiOiIweDAzYmYzOGQ4YjY0YzEwRDI4NDI4ZkY5QjVBYzA1QzU3MDgzMTU2ZDMifQ.kCKKz9ZnldMSwWpOgHXgp5JyQDFRw2K164x_7DMPXbA';

    try {
      response = await axios({ ...configs, headers: { ...configs.headers, claims: token } });
      // response.data.code === 0 && toast.error("Token expiration");
      return response.data;
    } catch (e) {
      Dispatch.toast.show({ type: 'error', text: 'error' });
    }
  }

  async get(url: string, params?) {
    const config: AxiosRequestConfig = {
      method: 'GET',
      url,
      // baseURL,
      params
    };
    return this.request(config);
  }

  async post(url: string, data?) {
    const config: AxiosRequestConfig = {
      method: 'POST',
      url,
      data
      // baseURL,
    };
    return this.request(config);
  }
}

export default new Http();
