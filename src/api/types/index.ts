import { type InternalAxiosRequestConfig } from 'axios'

export interface ResultData<T> {
  code: string
  msg: string
  data: T
  [key: string]: any
}

export namespace Login {
  export interface reqForm {
    username: string
    password: string
  }

  export interface resType {
    token: string
    userInfo: object
  }

  export interface authButtons {
    [key: string]: string[]
  }
}

export interface CustomAxiosRequestConfig extends InternalAxiosRequestConfig {
  showLoading?: boolean
}
