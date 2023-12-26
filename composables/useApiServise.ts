import axios, { type AxiosError, type AxiosInstance, type AxiosResponse, type CreateAxiosDefaults } from 'axios'

interface Result {
  code: number
  msg: string
}

interface ServiceReturnData<T = any> extends Result {
  data?: T
}

const URL: string = ''

enum RequestEnums {
  TIMEOUT = 5000,
  OVERDUE = 600,
  FAIL = 999,
  SUCCESS = 200,
}

const config: CreateAxiosDefaults = {
  baseURL: URL,
  timeout: RequestEnums.TIMEOUT,
  withCredentials: true,
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
}

class ApiService {
  service: AxiosInstance = axios.create(config)

  public constructor() {
    this.service.interceptors.request.use(
      (config: any) => {
        const token = localStorage.getItem('token') || ''

        return {
          ...config,
          headers: {
            'x-access-token': token, // 请求头中携带token信息
          },
        }
      },
      (error: AxiosError) => Promise.reject(error),
    )

    this.service.interceptors.response.use(
      (response: AxiosResponse) => {
        const { data } = response

        if (data.code === RequestEnums.OVERDUE) {
          // 登录信息失效，应跳转到登录页面，并清空本地的token
          localStorage.setItem('token', '')
          // router.replace({
          //   path: '/login'
          // })
          return Promise.reject(data)
        }

        if (data.code && data.code !== RequestEnums.SUCCESS) {
          console.error(data)
          return Promise.reject(data)
        }

        return data
      },
      (error: AxiosError) => {
        const { response } = error

        response && this.handleCode(response.status)

        if (!window.navigator.onLine)
          console.error('网络连接失败')
        // 可以跳转到错误页面，也可以不做操作
        // return router.replace({
        //   path: '/404'
        // });
      },
    )
  }

  handleCode(code: number): void {
    switch (code) {
      case 401:
        console.error('登录失败，请重新登录')
        break
      default:
        console.error('请求失败')
        break
    }
  }

  get<T>(url: string, params?: object): Promise<ServiceReturnData<T>> {
    return this.service.get(url, { params })
  }

  post<T>(url: string, params?: object): Promise<ServiceReturnData<T>> {
    return this.service.post(url, params)
  }

  put<T>(url: string, params?: object): Promise<ServiceReturnData<T>> {
    return this.service.put(url, params)
  }

  delete<T>(url: string, params?: object): Promise<ServiceReturnData<T>> {
    return this.service.delete(url, { params })
  }
}

// 状态码
export function useApiService() {
  return {
    apiService: new ApiService(),
    statusCodes: RequestEnums,
  }
}
