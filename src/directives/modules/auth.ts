import { App, Directive, DirectiveBinding } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'

// 后端返回按钮权限数据如 { home: ['xxx', 'yyy', 'zzz'], ... }
// Key 不一定要是routeName, 也可以是routePath, 只要保证每个页面唯一 & 可以区分即可

export function setupAuthDirective(app: App) {
  app.directive('auth', {
    mounted(el: HTMLElement, binding: DirectiveBinding) {
      const { value } = binding
      const { curRouteName, buttonData } = usePermissionStore()

      const currentPageAuths = (buttonData as Recordable)[curRouteName] || []

      // 使用方式: v-auth="'xxx'" || v-auth="['yyy']" || v-auth="['xxx', 'yyy']"
      const bindData = Array.isArray(value) ? value : [value]

      const hasPermission = bindData.every(item => currentPageAuths.includes(item))

      if (!hasPermission) el.remove()
    }
  } as Directive)
}
