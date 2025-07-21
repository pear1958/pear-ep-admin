import { defineStore } from 'pinia'
import { userState } from '../types'
import { getUserInfo, login, logout } from '@/api/modules/auth'
import usePermissionStore from './permission'
import router from '@/router'
import { removeToken, setToken } from '@/utils/auth'

const useUserStore = defineStore({
  id: 'user',
  state: (): userState => ({
    userInfo: null
  }),
  actions: {
    getUserInfo(): Promise<boolean> {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then(({ data }) => {
            this.userInfo = data
            resolve(true)
          })
          .catch(() => {
            reject(false)
          })
      })
    },
    login(params: Recordable): Promise<void> {
      return new Promise(async (resolve, reject) => {
        login(params)
          .then(({ data }) => {
            setToken(data.token)
            router.replace('/home')
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    },
    logout(): Promise<void> {
      return new Promise(async (resolve, reject) => {
        logout()
          .then(() => {
            removeToken()
            localStorage.clear()
            usePermissionStore().$reset()
            this.$reset()
            router.push('/login')
            resolve()
          })
          .catch(() => {
            reject()
          })
      })
    }
  }
})

export default useUserStore
