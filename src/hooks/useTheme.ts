import { storeToRefs } from 'pinia'
import { getDarkColor, getLightColor } from 'pear-common-utils'
import useSystemStore from '@/store/modules/system'

export function useTheme() {
  const systemStore = useSystemStore()
  const { isDark, themeColor, grayMode, weakMode } = storeToRefs(systemStore)

  const changeDark = (dark: boolean) => {
    const html = document.documentElement as HTMLElement
    html.classList[dark ? 'add' : 'remove']('dark')
    systemStore.setState('isDark', dark)
  }

  const changeTheme = (color: string) => {
    if (!color) return

    const html = document.documentElement as HTMLElement

    // 为了兼容暗黑模式下主题颜色也正常，以下方法计算主题颜色 由深到浅 的具体颜色

    // https://github.com/element-plus/element-plus/blob/dev/packages/theme-chalk/src/common/var.scss
    // https://doc.buildadmin.com/senior/web/styles.html#%E9%A2%84%E8%AE%BE%E9%A2%9C%E8%89%B2%E5%8F%98%E9%87%8F

    html.style.setProperty('--el-color-primary', color)

    // 颜色加深或变浅
    for (let i = 1; i <= 9; i++) {
      html.style.setProperty(
        `--el-color-primary-light-${i}`,
        isDark.value ? `${getDarkColor(color, i / 10)}` : `${getLightColor(color, i / 10)}`
      )
    }

    html.style.setProperty(
      '--el-color-primary-dark-2',
      isDark.value ? `${getLightColor(color, 0.2)}` : `${getDarkColor(color, 0.3)}`
    )

    systemStore.setState('themeColor', color)
  }

  // 页面初始化时, 还原 主题 & 暗黑模式 等
  const initThemeAndDark = () => {
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      systemStore.setState('isDark', true)
    }
    changeDark(isDark.value)
    changeTheme(themeColor.value)
    if (grayMode.value) changeGrayOrWeak('gray', true)
    if (weakMode.value) changeGrayOrWeak('weak', true)
  }

  const changeGrayOrWeak = (type: 'gray' | 'weak', value: boolean) => {
    if (!value) return document.body.removeAttribute('style')

    const styles = {
      gray: 'filter: grayscale(1)',
      weak: 'filter: invert(80%)'
    }

    document.body.setAttribute('style', styles[type])

    const propName = type === 'gray' ? 'weakMode' : 'grayMode'
    systemStore.setState(propName, false)
  }

  return {
    changeDark,
    changeTheme,
    initThemeAndDark,
    changeGrayOrWeak
  }
}
