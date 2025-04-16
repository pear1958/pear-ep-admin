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
          // showSearch={false}
          searchbarProps={{
            jsonFormAttrs: {
              formItems: formItems.value
            }
          }}
          toolbar={{
            title: '保险列表',
            buttons: (
              <div>
                <el-button type="primary">新增</el-button>
                <el-button type="primary">导出</el-button>
              </div>
            )
          }}
          // customToolbar={<div>222</div>}
          // el-table原生的所有props
          tableProps={{
            stripe: true
          }}
          fieldMap={{
            pageNumField: 'current',
            totalField: 'totalNum'
          }}
          // search={use}
        >
          {/* {{
            // 父组件应该控制 append插槽在 暂无数据的时候不显示
            append: () => <div>append</div>
          }} */}
        </JsonTable>
      </div>
    )
  }
})
