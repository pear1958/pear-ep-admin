import { PropType, defineComponent, h, watchEffect } from 'vue'
import { ElImageViewer } from 'element-plus'

export default defineComponent({
  name: 'imgViewer',
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    imgList: {
      type: Array as PropType<string[]>,
      default: []
    },
    initIndex: {
      type: Number,
      default: 0
    }
  },
  emits: ['update:visible'],
  setup(props, { emit }) {
    // 如果页面有滚动条
    watchEffect(() => {
      document.querySelector('body')!.style.overflow = props.visible ? 'hidden' : ''
    })

    return () =>
      h('div', [
        props.visible
          ? h(ElImageViewer, {
              urlList: props.imgList,
              initialIndex: props.initIndex,
              teleported: true,
              onClose: () => emit('update:visible', false)
            })
          : null
      ])
  }
})
