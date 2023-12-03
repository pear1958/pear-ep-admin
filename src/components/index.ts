import { App } from 'vue'

import svgIcon from './svgIcon.vue'
import { Iconify, useIcon, IconFont } from './Icon'
import imgViewer from './imgViewer'

import ChooseArea from './ChooseArea/index.vue'
import Progress from './Progress.vue'
import Tabs from './Tabs/Tabs.vue'
import TabItem from './Tabs/TabItem'
import Dialog from './Dialog/Dialog.vue'
import { openDialog } from './Dialog/openDialog'
import Upload from './Upload/Upload.vue'
import Charts from './Charts'
import Collapse from './Collapse/Collapse.vue'
import CollapseItem from './Collapse/CollapseItem.vue'
import Drawer from './Drawer.vue'
import mapAddrDrawer from './Map/mapAddrDrawer.vue'

const components = {
  svgIcon,
  Iconify,
  imgViewer
}

export function registerGlobComp(app: App) {
  for (const [key, component] of Object.entries(components)) {
    app.component(key, component)
  }
}

export {
  useIcon,
  IconFont,
  ChooseArea,
  Progress,
  Tabs,
  TabItem,
  Dialog,
  openDialog,
  Upload,
  Charts,
  Collapse,
  CollapseItem,
  Drawer,
  mapAddrDrawer
}
