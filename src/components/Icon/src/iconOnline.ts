import { h, defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

// Iconify Icon在Vue里在线使用（用于外网环境）
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
    const attrs = this.$attrs as any

    return h(
      Icon,
      {
        icon: `${this.icon}`,
        style: attrs?.style ? Object.assign(attrs.style, { outline: 'none' }) : { outline: 'none' },
        ...attrs
      },
      {
        default: () => []
      }
    )
  }
})
