import { defineStore } from 'pinia'
import { LockState, LockInfo } from '../types'
import { useUserStore } from './user'
import piniaPersistConfig from '../utils/persist'

export const useLockStore = defineStore({
  id: 'lock',
  state: (): LockState => ({
    lockInfo: null
  }),
  actions: {
    setLockInfo(info: LockInfo) {
      this.lockInfo = Object.assign({}, this.lockInfo, info)
    },
    resetLockInfo() {
      this.lockInfo = null
    },
    async unLock(password?: string) {
      if (this.lockInfo?.password === password) {
        this.resetLockInfo()
        return true
      }

      const userStore = useUserStore()

      try {
        // const username = userStore.userInfo?.username ?? ''

        // const { code } = await userStore.login({
        //   username,
        //   password: password!
        // })

        // if (String(code).startsWith('2')) {
        //   this.resetLockInfo()
        //   return true
        // }

        return false
      } catch (error) {
        return false
      }
    }
  },
  persist: piniaPersistConfig('lockConfig')
})
