import { LayoutType } from '@/store/types'

export const setHeaderHeight = (layout: LayoutType) => {
  const heightMap = {
    classic: '64px',
    vertical: '48px'
  }
  document.documentElement.style.setProperty('--pear-header-height', heightMap[layout])
}
