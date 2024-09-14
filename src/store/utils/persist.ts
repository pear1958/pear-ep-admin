import { PersistedStateOptions } from 'pinia-plugin-persistedstate'

const obj = {
  local: localStorage,
  session: sessionStorage
}

const piniaPersistConfig = (key: string, storage: keyof typeof obj = 'local', paths?: string[]) => {
  const persist: PersistedStateOptions = {
    key,
    storage: obj[storage],
    paths // 默认值为 undefined
  }

  return persist
}

export default piniaPersistConfig
