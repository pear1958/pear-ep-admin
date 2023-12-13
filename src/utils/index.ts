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

export function debounce<T = any>(fn: Function, delay: number = 500, immediate: boolean = true) {
  let timer: NodeJS.Timeout | null = null

  return function (...args: T[]) {
    const context = this
    console.log('context', context)

    if (timer) clearTimeout(timer)

    if (immediate) {
      const delayEnd = !timer // 第一次执行完Fn后, 没到达delay, 则timer存在
      timer = setTimeout(() => (timer = null), delay)
      delayEnd && fn.apply(context, args)
    } else {
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, delay)
    }
  }
}

export function throttle<T = any>(fn: Function, delay: number = 500) {
  let timer: NodeJS.Timeout | null = null
  let preTime = 0

  // 将this放在函数参数列表上声明类型即可, 使用的时候this不会干扰形参传入顺序
  return function (...args: T[]) {
    const nowTime = Date.now()
    // 还有多少时间到下一次触发点, 保证最后一次函数会执行
    const remaining = delay - (nowTime - preTime)
    const context = this

    if (timer) clearTimeout(timer)

    // 确保第一次函数会执行
    if (remaining <= 0) {
      fn.apply(context, args)
      preTime = Date.now()
    } else {
      // 确保最后一次函数会执行
      timer = setTimeout(() => {
        fn.apply(context, args)
      }, remaining)
    }
  }
}

// 注意事项
// handle函数 写成正常函数, 而不是箭头函数, 确保this可以正常获取到
// eg: 箭头函数, this 为 undefined
// vue中 div元素等 @click 时 this 指向 组件实例
// vue中 el-xxx元素 @click 时 this 为 undefined
// html文件中 内联事件 onclick="debounceFn(this)" 时  this 指向 dom 元素
// html文件中 document.getElementById('test').onclick = debounceFn  this 指向 dom 元素

// 使用示例:
// @click="debounceFn"  const debounceFn = debounce(handleClick, 1000)
// @click="throttleFn"  const throttleFn = throttle(handleClick, 1000)

// const handleFn = (event: any) => {
//   console.log(Math.random())
//   console.log(event)
// }
// window.addEventListener('resize', debounce(handleFn, 1000))
// window.addEventListener('resize', throttle(handleFn, 1000))

// <el-select :remote-method="debounce < string > (getAddrList, 300)">
//   ...
// </el-select>

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
