import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

const piniaPersistConfig = (key: string, paths?: string[]): PersistedStateOptions => ({
  key,
  storage: localStorage,
  paths // 默认值为 undefined
})

export default piniaPersistConfig
