import useAccessToken from '@/composables/useAccessToken'
import axios, { AxiosError, type AxiosInstance, type AxiosResponse } from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_API_BASE_URL || 'https://api-v2-test.solusi-ku.id',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  },
  responseType: 'json',
  timeout: 3000000,
  withCredentials: true
})

const { accessToken, removeAccessToken } = useAccessToken()

const addAuthInterceptor = (instance: AxiosInstance) => {
  instance.interceptors.request.use(
    (config) => {
      if (accessToken.value) {
        const token = accessToken.value
        config.headers.Authorization = `Bearer ${token}`
      }
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
      if (
        (error.response && error.response.status === 401) ||
        error.response.data.error.includes('Invalid lender token')
      ) {
        const pathname = window.location.pathname
        if (pathname !== '/login') {
          removeAccessToken()
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
