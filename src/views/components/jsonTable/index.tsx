import { defineComponent } from 'vue'
import JsonTable from '@/components/JsonTable'

export default defineComponent({
  name: 'jsonTable',
  setup() {
    return () => (
      <div class="page-box">
        <JsonTable />
      </div>
    )
  }
})
