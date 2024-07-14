import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

const piniaPersistConfig = (key: string, paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: localStorage,
    paths // 默认值为 undefined
  }

  return persist
}

export default piniaPersistConfig
