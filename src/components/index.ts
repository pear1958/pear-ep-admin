import { App } from 'vue'

import svgIcon from './svgIcon.vue'
import { iconify } from './icon'
import imgViewer from './imgViewer.vue'

const components = {
  svgIcon,
  iconify,
  imgViewer
}

export function registerGlobComp(app: App) {
  for (const [key, component] of Object.entries(components)) {
    app.component(key, component)
  }
}
