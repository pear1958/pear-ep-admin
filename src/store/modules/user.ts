import { defineStore } from 'pinia'
import { userState } from '../types'
import { getUserInfoApi } from '@/api/modules/user'
import { Login } from '@/api/types'
import { usePermissionStore } from './permission'
import router from '@/router'

export const useUserStore = defineStore({
  id: 'user',
  state: (): userState => ({
    token: null,
    userInfo: null
  }),
  actions: {
    getUserInfo() {
      return new Promise((resolve, reject) => {
        getUserInfoApi()
          .then((res: any) => {
            this.userInfo = res.data
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
    login(params: Login.reqForm) {
      return Promise.resolve({ code: 200, data: true })
    },
    logout() {
      localStorage.clear()
      usePermissionStore().$reset()
      this.$reset()
      router.push('/login')
    }
  }
})
