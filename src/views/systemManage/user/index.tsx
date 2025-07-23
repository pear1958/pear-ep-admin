import { defineComponent, onMounted, unref } from 'vue'
import JsonTable from '@/components/JsonTable'
import useConfig from './useConfig'

export default defineComponent({
  name: 'UserManage',
  setup() {
    const { columns, formItems, tableRef, formData, getList, openAddDialog } = useConfig()

    onMounted(() => {
      // 建立引用
      formData.value = unref(tableRef).getFormData()
    })

    return () => (
      <div class="page-box">
        <JsonTable
          ref={tableRef}
          search={getList}
          columns={columns.value}
          searchbarProps={{
            formItems: formItems.value
          }}
          toolbar={{
            title: '用户管理',
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
            pageNumField: 'current',
            dataField: 'items',
            totalField: 'meta.totalItems'
          }}
        />
      </div>
    )
  }
})
