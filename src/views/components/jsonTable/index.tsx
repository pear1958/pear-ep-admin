import { defineComponent } from 'vue'
import JsonTable from '@/components/JsonTable'
import useConfig from './useConfig'
import { getInsuranceList } from '@/api/modules/insurance'

export default defineComponent({
  name: 'jsonTable',
  setup() {
    const { columns, formItems } = useConfig()

    const getList = (params: Recordable) => {
      console.log('params', params)
      return getInsuranceList(params)
    }

    // const success = (res: Recordable) => {
    //   console.log('res', res)
    //   return {
    //     list: res.list.data,
    //     total: res.total
    //   }
    // }

    return () => (
      <div class="page-box">
        <JsonTable
          search={getList}
          // success={success}
          columns={columns.value}
          // showSearch={false}
          jsonFormProps={{
            formItems: formItems.value,
            disabled: true
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
          // 可以不传
          fields={{
            pageNumField: 'current',
            dataField: 'list.data',
            totalField: 'total'
          }}
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
