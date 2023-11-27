import { h, defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'IconOnline',
  components: { Icon },
  props: {
    // 图标名称
    icon: {
      type: String,
      default: ''
    }
  },
  render() {
    const attrs = this.$attrs

    return h(
      Icon,
      {
        icon: this.icon,
        style: attrs?.style ? Object.assign(attrs.style, { outline: 'none' }) : { outline: 'none' },
        ...attrs
      },
      {
        default: () => []
      }
    )
  }
})
