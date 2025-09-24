import { defineComponent, onMounted, unref } from 'vue'
import { ElButton } from 'element-plus'
import JsonTable from '@/components/JsonTable'
import useConfig from './useConfig'
import { getInsuranceList } from '@/api/modules/insurance'
import { closeDialog, showDialog } from '@/utils/ui/dialog'
import AddEdit from './AddEdit'

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

    const refresh = () => {
      console.log('refresh')
      closeDialog()
      unref(jsonTableRef).reset()
    }

    const openAddDialog = () => {
      showDialog(<AddEdit onRefresh={refresh} />, {
        title: '新增数据',
        width: 650
        // footer: null
        // footer: (
        //   <div>
        //     <ElButton type="primary" onClick={closeDialog}>
        //       自定义关闭
        //     </ElButton>
        //   </div>
        // )
      })
    }

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
                <el-button type="primary" onClick={openAddDialog}>
                  新增
                </el-button>
                <el-button type="primary">导出</el-button>
              </div>
            )
          }}
          extraParams={{
            test1: 'aaa',
            test2: 'bbb'
          }}
          fields={{
            // pageNumField: 'current',
            // dataField: 'list.data',
            // totalField: 'total'
            dataField: null,
            totalField: 'length'
          }}
          // pagination={false}
          // customToolbar={<div>222</div>}
          // tableProps={{
          //   onSelectionChange: (val: Recordable[]) => console.log('check-val', val)
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
