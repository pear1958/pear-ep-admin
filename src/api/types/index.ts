import type { AxiosRequestConfig, InternalAxiosRequestConfig } from 'axios'

export interface ResultData<T = any> {
  code: string
  msg: string
  data: T
  [key: string]: any
}

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  showLoading?: boolean
  fullRes?: boolean
}

export interface Config extends AxiosRequestConfig {
  showLoading?: boolean
  fullRes?: boolean
}
