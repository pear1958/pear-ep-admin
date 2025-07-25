import { ref, render, unref, createVNode } from 'vue'
import { DialogProps, ElDialog, ElButton } from 'element-plus'
import { genUUID } from 'pear-common-utils'
import { app } from '@/main'

/**
 * 弹窗不显示时, 弹窗内的生命周期不会执行
 * 关闭时, 弹窗的 状态/数据 会被重置
 * onClosed 事件失效
 */

const dialogIds = []
const dialogRefMap = {}

export const closeDialog = () => {
  const id = dialogIds[dialogIds.length - 1]
  const div = document.getElementById(id)
  if (!div) return
  render(null, div)
  div.parentNode?.removeChild(div)
  dialogIds.pop()
}

const handleClose = async () => {
  let result = true
  const id = dialogIds[dialogIds.length - 1]

  if (unref(dialogRefMap[id])?.onCancel) {
    result = await unref(dialogRefMap[id]).onCancel()
  }
  result && closeDialog()
}

export const showDialog = (Compo: any, props?: Partial<DialogProps> & Recordable) => {
  // 创建div元素
  const div = document.createElement('div')
  const id = genUUID()
  div.id = id
  document.body.appendChild(div)
  // 储存id
  dialogIds.push(id)
  // 储存组件ref
  dialogRefMap[id] = ref()

  const loading = ref(false)

  const params = {
    modelValue: true, // 可见
    onConfirm: async () => {
      loading.value = true
      let result = true
      const id = dialogIds[dialogIds.length - 1]

      try {
        if (unref(dialogRefMap[id])?.handleSubmit) {
          result = await unref(dialogRefMap[id]).handleSubmit()
          if (result) {
            loading.value = false
            closeDialog()
          }
        }
      } finally {
        console.log('result', result)
        loading.value = false
      }
    },
    beforeClose: handleClose, // 点击关闭按钮或者对话框的遮罩区域时被调用
    onCancel: handleClose, // 点击取消按钮时被调用
    ...props
  }

  // 使用 createVNode 创建节点并关联app上下文
  const vnode = createVNode(ElDialog, params, {
    default: () => createVNode(Compo, { ref: dialogRefMap[id] }),
    footer: () =>
      createVNode(
        'div',
        {
          class: 'footer-box',
          style: {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }
        },
        [
          props?.hasOwnProperty('footer')
            ? props.footer
            : [
                createVNode(ElButton, { onClick: params.onCancel }, () => '取消'),
                createVNode(
                  ElButton,
                  {
                    type: 'primary',
                    onClick: params.onConfirm,
                    loading: loading.value
                  },
                  () => '确定'
                )
              ]
        ]
      )
  })

  // 关联应用上下文
  vnode.appContext = app._context

  render(vnode, div)
}
