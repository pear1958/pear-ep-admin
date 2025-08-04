import { defineComponent } from 'vue'
import JsonTable from '@/components/JsonTable'
import useConfig from './useConfig'

export default defineComponent({
  name: 'RolePage',
  setup() {
    const { tableRef, columns, formItems, getList, openRoleDialog } = useConfig()

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
            title: '角色管理',
            buttons: (
              <el-button type="primary" onClick={() => openRoleDialog()}>
                新增
              </el-button>
            )
          }}
          fields={{
            dataField: 'items',
            totalField: 'meta.totalItems'
          }}
          paginationProps={{
            'page-sizes': [2, 10, 50, 100]
          }}
        />
      </div>
    )
  }
})
