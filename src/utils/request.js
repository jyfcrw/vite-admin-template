import axios from 'axios'
import * as rax from 'retry-axios'
import { ElMessage } from 'element-plus'
import store from '@/store'
import router from '@/router'

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  timeout: 60000, // request timeout
  headers: { 'X-Requested-With': 'XMLHttpRequest' }
})

service.defaults.raxConfig = {
  instance: service,
  retry: 1,
  shouldRetry: error => {
    const cfg = rax.getConfig(error);

    if (error.response?.status === 401 && store.getters['canRefreshAccessToken']) {
      if (cfg.currentRetryAttempt <= 1) {
        return (cfg.shouldRefreshToken = true)
      }
    }

    return rax.shouldRetryRequest(error)
  },
  onRetryAttempt: async error => {
    const cfg = rax.getConfig(error);

    if (cfg.shouldRefreshToken) {
      await store.dispatch('session/refreshAccessToken')
    }
  }
}

service.interceptors.request.use(
  config => {
    if (store.state.session.token.access) {
      config.headers['Authorization'] = store.state.session.token.access
    }
    if (config.withRefreshToken) {
      config.headers['X-Refresh-Token'] = store.state.session.token.refresh
    }

    console.log('request config: ', config)
    return config
  },
  error => {
    console.error(error)
    return Promise.reject(error)
  }
)

service.interceptors.response.use(
  response => {
    if (response.status === 200) {
      return Promise.resolve(response.data)
    } else {
      return Promise.reject(response)
    }
  },
  error => Promise.reject(error)
)

rax.attach(service)

service.interceptors.response.use(
  response => response,
  error => {
    console.error(error)

    ElMessage({
      message: error.response?.data.message || error.message,
      type: 'error',
      duration: 5 * 1000
    })

    if (error.response?.status === 401) {
      store.commit('session/clearToken')
      router.push({name: 'Login'})
    }

    return Promise.reject(error)
  }
)

export default service
