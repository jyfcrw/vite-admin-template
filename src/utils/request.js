import axios from 'axios'
import { ElMessage } from 'element-plus'
import store from '@/store'

// create an f instance
const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

// request interceptor
service.interceptors.request.use(
  config => {
    console.log('request config: ', config)
    if (store.state.session.token.access) {
      config.headers['Authorization'] = store.state.session.token.access
    }
    if (config.withRefreshToken) {
      config.headers['X-Refresh-Token'] = store.state.session.token.refresh
    }
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  res => {
    // const { data } = res
    if (res.status === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    console.log(error)
    ElMessage({
      message: error.response?.data.message || error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)
export default service
