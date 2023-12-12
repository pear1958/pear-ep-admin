import { ElMessage } from 'element-plus'

/**
 * @description 获取浏览器默认语言
 * @returns {String}
 */
export function getBrowserLang() {
  let browserLang = navigator.language ? navigator.language : navigator.browserLanguage
  return ['cn', 'zh', 'zh-cn'].includes(browserLang.toLowerCase()) ? 'zh' : 'en'
}

// 获取 assets 下面的图片
export const getImg = (name: string, dir: string = 'imgs') => {
  return new URL(`../assets/${dir}/${name}`, import.meta.url).href
}

export const debounce = <T>(fn: Function, wait: number = 500) => {
  let timer: NodeJS.Timeout | null = null

  return (event: T) => {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => fn(event), wait)
  }
}

// https://blog.csdn.net/xiaoyingyings/article/details/123405995
// https://vue3js.cn/interview/JavaScript/debounce_throttle.html#%E4%BB%A3%E7%A0%81%E5%AE%9E%E7%8E%B0
export const throttle = <T>(fn: Function, delay: number = 500) => {
  let prev = Date.now()

  return (event: T) => {
    const now = Date.now()

    if (now - prev > delay) {
      fn(event)
      prev = Date.now()
    }
  }
}

// 使用示例:
// const handle = (event: any) => {
//   console.log(Math.random())
//   console.log(event)
// }
// window.addEventListener('resize', debounce(handle, 1000))
// window.addEventListener('resize', throttle(handle, 1000))

export const copyText = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text)
  } catch (err) {
    console.error('复制操作不被支持或失败: ', err)

    // text是复制文本
    // 创建input元素
    const el = document.createElement('input')
    // 给input元素赋值需要复制的文本
    el.setAttribute('value', text)
    // 将input元素插入页面
    document.body.appendChild(el)
    // 选中input元素的文本
    el.select()
    // 复制内容到剪贴板
    document.execCommand('copy')
    // 删除input元素
    document.body.removeChild(el)
  }

  ElMessage.success('复制成功')
}
