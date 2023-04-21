import { addIcon } from '@iconify/vue'

import verticalLeftOutlined from '@iconify-icons/ant-design/vertical-left-outlined'

const offlineIcons = {
  'vertical-left-outlined': verticalLeftOutlined
}

export const regisOfflineIcons = () => {
  for (const [key, value] of Object.entries(offlineIcons)) {
    addIcon(key, value)
  }
}
