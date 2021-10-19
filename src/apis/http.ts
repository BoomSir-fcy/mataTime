import axios, { AxiosRequestConfig } from "axios";
import { Dispatch } from "store";


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

    try {
      response = await axios({...configs});
      return response.data;
    } catch (e) {
      Dispatch.toast.show({type:'error', text: "error"});
    }
  }

  async get(url: string, params) {
    const config: AxiosRequestConfig = {
      method: "GET",
      url,
      params,
    };
    return this.request(config);
  }
}