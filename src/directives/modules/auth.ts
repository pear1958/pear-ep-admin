import { Directive, DirectiveBinding } from 'vue'
import { usePermissionStore } from '@/store/modules/permission'

// 后端返回按钮权限数据如 { home: ['xxx', 'yyy', 'zzz'], ... }
// Key 不一定要是routeName, 也可以是routePath, 只要保证每个页面唯一 & 可以区分即可

const auth: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<string | string[]>) {
    const { value } = binding
    const { curRouteName, buttonData } = usePermissionStore()

    const currentPageAuths = (buttonData as Recordable)[curRouteName] || []

    // 使用方式: v-auth="'xxx'" || v-auth="['yyy']" || v-auth="['xxx', 'yyy']"
    const bindData = Array.isArray(value) ? value : [value]

    const hasPermission = bindData.every(item => currentPageAuths.includes(item))

    if (!hasPermission) el.remove()
  }
}

export default auth
