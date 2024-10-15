import { useAccessTokenStore } from '@/stores/accessToken'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  responseType: 'json',
  timeout: 3000000,
  withCredentials: true
})

const addAuthInterceptor = (instance: AxiosInstance) => {
  // const store = useAccessTokenStore()

  instance.interceptors.request.use(
    (config) => {
      // const token = store.accessToken
      // if (token) {
      //   config.headers.Authorization = `Bearer ${token}`
      // }
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )

  instance.interceptors.response.use(
    (response: AxiosResponse) => {
      return response
    },
    (error) => {
      if (error.response && error.response.status === 401) {
        const pathname = window.location.pathname
        if (pathname !== '/login') {
          window.location.href = '/login'
        }
      }

      const err = {
        status: error.response?.status,
        data: error.response?.data || error.message
      }
      return Promise.reject<AxiosError>(err)
    }
  )
}

addAuthInterceptor(api)
export { api }
