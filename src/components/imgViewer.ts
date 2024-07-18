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
  setup(props) {
    // 如果页面有滚动条
    watchEffect(() => {
      document.querySelector('body')!.style.overflow = props.visible ? 'hidden' : ''
    })
  },
  render() {
    const { visible, imgList, initIndex } = this

    return h('div', [
      visible
        ? h(ElImageViewer, {
            urlList: imgList,
            initialIndex: initIndex,
            teleported: true,
            onClose: () => this.$emit('update:visible', false)
          })
        : null
    ])
  }
})
