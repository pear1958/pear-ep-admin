import { h, defineComponent } from 'vue'
import { Icon, addIcon } from '@iconify/vue'

// element-plus icon
import Check from '@iconify-icons/ep/check'
import Menu from '@iconify-icons/ep/menu'
import User from '@iconify-icons/ep/user'

addIcon('check', Check)
addIcon('menu', Menu)
addIcon('user', User)

// Font Awesome 4
import FaUser from '@iconify-icons/fa/user'
import FaLock from '@iconify-icons/fa/lock'

addIcon('fa-user', FaUser)
addIcon('fa-lock', FaLock)

// 官方例子: https://icon-sets.iconify.design/ep/add-location/

// 调用示例 <IconOffline icon="check" width="15" height="15" style="margin-right: 4px" />

export default defineComponent({
  name: 'IconOffline',
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
