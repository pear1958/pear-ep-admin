import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePermissionStore } from '@/store/modules/permission'

/**
 * 页面按钮权限
 * */
export const useAuthBtns = () => {
  const { name } = useRoute()
  const { buttonData } = usePermissionStore()
  const authButtons = buttonData[name as string] || []

  const buttonsObj = computed(() => {
    const resObj: { [key: string]: boolean } = {}
    authButtons.forEach(btnName => (resObj[btnName] = true))
    return resObj
  })

  return {
    buttonsObj
  }
}
