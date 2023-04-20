import { App } from 'vue'
import SvgIcon from './SvgIcon/index.vue'

const components = {
  SvgIcon
}

export function registerGlobComp(app: App) {
  for (const [key, component] of Object.entries(components)) {
    app.component(key, component)
  }
}
