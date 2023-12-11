import type { Directive, DirectiveBinding } from 'vue'

interface ElType extends HTMLElement {
  _handleClick: () => any
}

/**
 * 防抖按钮指令, 可自行扩展至input
 * 使用示例: <el-button v-debounce="handleClick">刷新</el-button>
 */
const debounce: Directive = {
  mounted(el: ElType, binding: DirectiveBinding<Function>) {
    if (typeof binding.value !== 'function') {
      throw '请绑定一个函数'
    }

    let timer: NodeJS.Timeout | null = null

    el._handleClick = () => {
      if (timer) clearInterval(timer)
      timer = setTimeout(() => binding.value(), 500)
    }

    el.addEventListener('click', el._handleClick)
  },
  beforeUnmount(el: ElType) {
    el.removeEventListener('click', el._handleClick)
  }
}

export default debounce
