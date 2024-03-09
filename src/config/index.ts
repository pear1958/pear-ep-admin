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
