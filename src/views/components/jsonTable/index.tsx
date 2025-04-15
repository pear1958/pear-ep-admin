import { defineComponent } from 'vue'
import JsonTable from '@/components/JsonTable'
import useConfig from './useConfig'

export default defineComponent({
  name: 'jsonTable',
  setup() {
    const { columns, formItems } = useConfig()

    return () => (
      <div class="page-box">
        <JsonTable
          columns={columns.value}
          searchbarProps={{
            jsonFormAttrs: {
              formItems: formItems.value
            }
          }}
        />
      </div>
    )
  }
})
