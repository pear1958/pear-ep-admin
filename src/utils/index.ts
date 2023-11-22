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
