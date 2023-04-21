import { h, defineComponent } from 'vue'
import { Icon } from '@iconify/vue'

export default defineComponent({
  name: 'IconifyOffline',
  components: { Icon },
  props: {
    icon: {
      default: null
    }
  },
  render() {
    const attrs = this.$attrs

    return h(
      Icon as any,
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
