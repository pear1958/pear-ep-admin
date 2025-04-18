import { defineComponent, onMounted, unref } from 'vue'
import JsonTable from '@/components/JsonTable'
import useConfig from './useConfig'
import { getInsuranceList } from '@/api/modules/insurance'

export default defineComponent({
  name: 'jsonTable',
  setup() {
    const { columns, formItems, jsonTableRef, formData } = useConfig()

    onMounted(() => {
      // 建立引用
      formData.value = unref(jsonTableRef).getFormData()
    })

    const getList = (params: Recordable) => {
      console.log('params', params)
      return getInsuranceList(params)
    }

    // to-do
    // 所有按钮的功能 代码添加
    // 默认参数调试

    return () => (
      <div class="page-box">
        <JsonTable
          ref={jsonTableRef}
          search={getList}
          columns={columns.value}
          searchbarProps={{
            formItems: formItems.value,
            disabled: !unref(formData).dvrId
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
          extraParams={{
            test1: 'aaa',
            test2: 'bbb'
          }}
          // customToolbar={<div>222</div>}
          // tableProps={{
          //   onSelectionChange: (val: Recordable[]) => console.log('check-val', val)
          // }}
          // fields={{
          //   pageNumField: 'current',
          //   dataField: 'list.data',
          //   totalField: 'total'
          // }}
          // beforeSearch={beforeSearch}
          // success={success}
          // showSearch={false}
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
