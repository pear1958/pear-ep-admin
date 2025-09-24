import { render } from 'vue'
import { Loading } from 'pear-view'

let div: HTMLDivElement | null

export const showLoading = (msg?: string) => {
  if (div) return
  div = document.createElement('div')
  div.setAttribute('class', 'pear-loading-box')
  document.body.appendChild(div)
  render(<Loading />, div)
}

export const closeLoading = () => {
  if (!div) return
  render(null, div)
  div.parentNode?.removeChild(div)
  div = null
}
