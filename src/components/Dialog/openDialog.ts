import { createApp, h } from 'vue'
import Dialog from './Dialog.vue'

const openDialog = (options: any) => {
  const { title, content, closeOnClickOverlay, ok, cancel } = options

  const destroy = () => {
    // @ts-ignore
    app.unmount(div)
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
            if (!newVisible) {
              destroy()
            }
          },
          ok,
          cancel,
          closeOnClickOverlay
        },
        { title: () => title, content: () => content }
      )
    }
  })

  app.mount(div)
}

export { openDialog }
