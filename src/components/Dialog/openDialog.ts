import { createApp, h } from 'vue'
import Dialog from './Dialog.vue'

const openDialog = (options: any) => {
  const { title, content, closeOnClickMask, handleOk, cancel } = options

  const destroy = () => {
    app.unmount()
    div.remove()
  }

  const div = document.createElement('div')

  document.body.appendChild(div)

  const app = createApp({
    render() {
      return h(
        Dialog,
        {
          visible: true,
          'onUpdate:visible': (newVisible: boolean) => {
            if (!newVisible) destroy()
          },
          closeOnClickMask,
          handleOk,
          cancel
        },
        { title: () => title, content: () => content }
      )
    }
  })

  app.mount(div)
}

export { openDialog }
