import { App } from 'vue'

import SvgIcon from './components/SvgIcon.vue'
import { Iconify } from './components/Icon'
import ImgViewer from './components/ImgViewer'
import LinkButton from './components/LinkButton.vue'

const components = {
  SvgIcon,
  Iconify,
  ImgViewer,
  LinkButton
}

export function registerGlobComp(app: App) {
  for (const [key, component] of Object.entries(components)) {
    app.component(key, component)
  }
}
