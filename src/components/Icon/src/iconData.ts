import { addIcon } from '@iconify/vue'

import reloadOutlined from '@iconify-icons/ant-design/reload-outlined'
import closeOutlined from '@iconify-icons/ant-design/close-outlined'
import verticalRightOutlined from '@iconify-icons/ant-design/vertical-right-outlined'
import verticalLeftOutlined from '@iconify-icons/ant-design/vertical-left-outlined'
import columnWidthOutlined from '@iconify-icons/ant-design/column-width-outlined'
import minusOutlined from '@iconify-icons/ant-design/minus-outlined'
import fullscreenOutlined from '@iconify-icons/ant-design/fullscreen-outlined'
import fullscreenExitOutlined from '@iconify-icons/ant-design/fullscreen-exit-outlined'
import userOutlined from '@iconify-icons/ant-design/user-outlined'
import poweroffOutlined from '@iconify-icons/ant-design/poweroff-outlined'
import searchOutlined from '@iconify-icons/ant-design/search-outlined'
import enterOutlined from '@iconify-icons/ant-design/enter-outlined'
import menuUnfoldOutlined from '@iconify-icons/ant-design/menu-unfold-outlined'
import menuFoldOutlined from '@iconify-icons/ant-design/menu-fold-outlined'

const offlineIcons = {
  'reload-outlined': reloadOutlined,
  'close-outlined': closeOutlined,
  'vertical-right-outlined': verticalRightOutlined,
  'vertical-left-outlined': verticalLeftOutlined,
  'column-width-outlined': columnWidthOutlined,
  'minus-outlined': minusOutlined,
  'fullscreen-outlined': fullscreenOutlined,
  'fullscreen-exit-outlined': fullscreenExitOutlined,
  'user-outlined': userOutlined,
  'poweroff-outlined': poweroffOutlined,
  'search-outlined': searchOutlined,
  'enter-outlined': enterOutlined,
  'menu-unfold-outlined': menuUnfoldOutlined,
  'menu-fold-outlined': menuFoldOutlined
}

// 在 src/layout/index.vue 中加载, 避免 Vite 首次启动慢
export const regisOfflineIcons = () => {
  for (const [key, value] of Object.entries(offlineIcons)) {
    addIcon(key, value)
  }
}
