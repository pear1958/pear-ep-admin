import { getCurrentInstance } from 'vue'

/**
 * eg: const { $data } = useGlobal()
 */
export default function useGlobal() {
  const app = getCurrentInstance()
  return {
    ...app?.appContext?.config?.globalProperties
  }
}
