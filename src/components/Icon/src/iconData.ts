import { addIcon } from '@iconify/vue'

import reloadOutlined from '@iconify-icons/ant-design/reload-outlined'
import closeOutlined from '@iconify-icons/ant-design/close-outlined'
import verticalRightOutlined from '@iconify-icons/ant-design/vertical-right-outlined'
import verticalLeftOutlined from '@iconify-icons/ant-design/vertical-left-outlined'
import columnWidthOutlined from '@iconify-icons/ant-design/column-width-outlined'
import minusOutlined from '@iconify-icons/ant-design/minus-outlined'
import fullscreenOutlined from '@iconify-icons/ant-design/fullscreen-outlined'
import FullscreenExitOutlined from '@iconify-icons/ant-design/fullscreen-exit-outlined'

const offlineIcons = {
  'reload-outlined': reloadOutlined,
  'close-outlined': closeOutlined,
  'vertical-right-outlined': verticalRightOutlined,
  'vertical-left-outlined': verticalLeftOutlined,
  'column-width-outlined': columnWidthOutlined,
  'minus-outlined': minusOutlined,
  'fullscreen-outlined': fullscreenOutlined,
  'fullscreen-exit-outlined': FullscreenExitOutlined
}

export const regisOfflineIcons = () => {
  for (const [key, value] of Object.entries(offlineIcons)) {
    addIcon(key, value)
  }
}
