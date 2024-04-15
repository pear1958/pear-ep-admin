import type { Directive, DirectiveBinding } from 'vue'

interface Params {
  text: string
  color: string
  font: string
}

/**
 * 使用示例: <div v-waterMark="{ text:'Ep-Admin', color:'#409eff' }"></div>
 */
const waterMark: Directive = {
  mounted(el: HTMLElement, binding: DirectiveBinding<Params>) {
    const { text, font, color } = binding.value || {}

    const canvas: HTMLCanvasElement = document.createElement('canvas')
    el.appendChild(canvas)

    canvas.width = 205
    canvas.height = 140
    canvas.style.display = 'none'

    const context = canvas.getContext('2d')

    context.rotate((-20 * Math.PI) / 180)
    context.font = font || '16px Microsoft JhengHei'
    context.fillStyle = color || 'rgba(64, 158, 255, 0.75)'
    context.textAlign = 'left'
    context.textBaseline = 'middle'
    context.fillText(text || 'Ep-Admin', canvas.width / 10, canvas.height / 2)

    el.style.backgroundImage = 'url(' + canvas.toDataURL('image/png') + ')'
  }
}

export default waterMark
