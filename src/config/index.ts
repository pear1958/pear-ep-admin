import axios from 'axios'
import { IConfigState } from '@/store/types'

const service = axios.create({
  baseURL: '',
  timeout: 10000
})

export const getPlatformConfig = (): Promise<IConfigState> => {
  return new Promise((reslove, reject) => {
    service({
      method: 'GET',
      url: 'platformConfig.json'
    })
      .then(({ data: config }) => {
        reslove(config)
      })
      .catch(() => {
        reject({})
        throw '请在public文件夹下添加platformConfig.json配置文件'
      })
  })
}

export const uploadUrl = `${import.meta.env.VITE_FILE_BASE_URL}/sourceData/document/uploadFile`
export const uploadHeaders = {
  'Authorization-Chengyun':
    'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJsb2dpblR5cGUiOiJsb2dpbiIsImxvZ2luSWQiOiJzenp4X3VzZXJfNjRmNjg4YjdhNmQxN2QwMDA3MDJjMDMyIiwicm5TdHIiOiJWaWFGdENmR3lJYmVkdmVQazRoWDlPTTdZUk9wUFVJSCIsIkNIRU5HWVVOOkFVVEg6dW5pVXNlcklkIjoic3p6eF91c2VyXzY0ZjY4OGI3YTZkMTdkMDAwNzAyYzAzMiJ9.iX6960PLM5dQNS4tVNAzihlB1n7qsu8PC9Zo_XGfvOo'
}
