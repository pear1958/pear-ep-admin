import { defineStore } from 'pinia'
import { IConfigState } from '../types'

type Key = keyof IConfigState

export const useConfigStore = defineStore({
  id: 'platformConfig',
  state: (): IConfigState => ({
    mapConfig: {
      key: '',
      securityJsCode: ''
    }
  }),
  actions: {
    setConfig(data: IConfigState) {
      Object.keys(data).forEach((key: string) => {
        this[key as Key] = data[key as Key]
      })
    }
  }
})
