import axios from 'axios'

const service = axios.create({
  baseURL: '/api',
  timeout: 5000,
  headers: { 'X-Requested-With': 'XMLHttpRequest' },
})
service.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 统一处理错误返回
service.interceptors.response.use(
  (response) => {
    const res = response
    if (res.status !== 200) {
      return Promise.reject(res.message || 'error')
    } else {
      if (res.data.status === 401 || res.data.code === 401) {
        location.href = '/'
        return
      }

      return res.data
    }
  },
  (error) => {
    return Promise.reject(error.response)
  }
)
export default service
