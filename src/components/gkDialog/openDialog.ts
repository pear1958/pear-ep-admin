import { createApp, h, ref } from 'vue'
import Dialog from './index.vue'

const openDialog = (options: any) => {
  const { title, content, closeOnClickMask, alignCenter, width, top, handleOk, cancel } = options

  const destroy = () => {
    visible.value = false

    setTimeout(() => {
      app.unmount()
      div.remove()
    }, 200)
  }

  const div = document.createElement('div')

  document.body.appendChild(div)

  const visible = ref(false)

  setTimeout(() => {
    visible.value = true
  }, 0)

  const app = createApp({
    render() {
      return h(
        Dialog,
        {
          visible: visible.value,
          'onUpdate:visible': (newVisible: boolean) => {
            if (!newVisible) destroy()
          },
          closeOnClickMask,
          alignCenter,
          width,
          top,
          handleOk,
          cancel
        },
        { title: () => title, content: () => content }
      )
    }
  })

  app.mount(div)
}

export default openDialog
