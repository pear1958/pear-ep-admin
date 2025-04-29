import { defineStore } from 'pinia'
import { userState } from '../types'
import { getUserInfo, login, logout } from '@/api/modules/user'
import usePermissionStore from './permission'
import router from '@/router'

const useUserStore = defineStore({
  id: 'user',
  state: (): userState => ({
    token: null,
    userInfo: null
  }),
  actions: {
    getUserInfo(): Promise<boolean> {
      return new Promise((resolve, reject) => {
        getUserInfo()
          .then((data: Recordable) => {
            this.userInfo = data
            resolve(true)
          })
          .catch(() => {
            reject(false)
          })
      })
    },
    setToken(token: null | string) {
      this.token = token
    },
    login(params: Recordable): Promise<void> {
      return new Promise(async (resolve, reject) => {
        login(params)
          .then(() => {
            localStorage.setItem('token', 'test-token')
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
