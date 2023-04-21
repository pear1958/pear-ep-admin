import '@vue/runtime-core'

export {}

import SvgIcon from '../components/SvgIcon/index.vue'
import { IconifyOffline, IconifyOnline } from '../components/Icon'

declare module '@vue/runtime-core' {
  export interface GlobalComponents {
    SvgIcon: typeof SvgIcon
    IconifyOffline: typeof IconifyOffline
    IconifyOnline: typeof IconifyOnline
  }
}
