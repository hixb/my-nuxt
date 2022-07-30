import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

// 默认配置
const defaultConfig = {
  timeout: 5000,
  baseUrl: ""
}

class Service {
  constructor() {
    this.httpInterceptorsRequest();
    this.httpInterceptorsResponse();
  }

  private static axiosInstance = axios.create(defaultConfig);

  // 请求拦截
  private httpInterceptorsRequest() {
    Service.axiosInstance.interceptors.request.use((config: AxiosRequestConfig) => {
      return config;
    }, error => {
      return Promise.reject(error);
    })
  }

  // 响应拦截
  private httpInterceptorsResponse() {
    Service.axiosInstance.interceptors.response.use((response: AxiosResponse) => {
      return response;
    }, error => {
      return Promise.reject(error);
    })
  }

  // 封装 get 请求
  public get<T>(url: string, params: AxiosRequestConfig): Promise<T> {
    return Service.axiosInstance.get(url, params).then(res => res.data).catch();
  }

  // 封装 post 请求
  public post<T>(url: string, params: AxiosRequestConfig): Promise<T> {
    return Service.axiosInstance.post(url, params).then(res => res.data).catch();
  }
}

export const useService = new Service();
