import { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'
import { IconifyOffline, iconifyOnline, regisOfflineIcons } from './Icon'

const components = {
  SvgIcon,
  IconifyOffline,
  iconifyOnline
}

export function registerGlobComp(app: App) {
  for (const [key, component] of Object.entries(components)) {
    app.component(key, component)
  }

  regisOfflineIcons()
}
