import { CHASTER_API_TOKEN, CHASTER_API_URL } from '@/constants'
import { Configuration } from '@chasterapp/chaster-js'
import type { BaseAPI } from '@chasterapp/chaster-js/dist/base'
import type { AxiosHeaders, AxiosRequestConfig } from 'axios'
import axios from 'axios'

const axiosConfig: AxiosRequestConfig = {}
const axiosInstance = axios.create()

axiosInstance.interceptors.request.use((config) => {
  const token = CHASTER_API_TOKEN
  if (token) {
    if (!config.headers) config.headers = {} as AxiosHeaders
    config.headers.authorization = `Bearer ${token}`
  }
  return config
})

export const createApiInstance = <T extends typeof BaseAPI>(
  BaseApi: T,
): InstanceType<T> => {
  const instance = new BaseApi(
    new Configuration({ baseOptions: axiosConfig }),
    CHASTER_API_URL,
    axiosInstance,
  )

  return instance as InstanceType<T>
}
