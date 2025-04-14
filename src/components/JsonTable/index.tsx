import { PropType, defineComponent } from 'vue'
import { FormItem } from '../JsonForm/type'

export default defineComponent({
  name: 'JsonTable',
  props: {
    searchOptions: {
      type: Array as PropType<FormItem[]>,
      default: () => []
    },
    columns: {
      type: Array
    }
  },
  setup() {
    return () => <div>JsonTable</div>
  }
})
