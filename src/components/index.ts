import { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'

// 全局注册 @iconify/vue 图标库
import { IconOffline, IconOnline, IconFont } from './Icon'

const components = {
  SvgIcon,
  IconOffline,
  IconOnline,
  IconFont
}

export function registerGlobComp(app: App) {
  for (const [key, component] of Object.entries(components)) {
    app.component(key, component)
  }
}
