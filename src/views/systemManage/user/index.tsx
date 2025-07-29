import { defineComponent } from 'vue'
import JsonTable from '@/components/JsonTable'
import useConfig from './useConfig'

export default defineComponent({
  name: 'UserManage',
  setup() {
    const {
      columns,
      formItems,
      tableRef,
      getList,
      openUserDialog,
      selectRows,
      hasSelect,
      delSelectUsers,
      handleExport
    } = useConfig()

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
                <el-button type="primary" onClick={() => openUserDialog()}>
                  新增
                </el-button>
                <el-button onClick={() => handleExport()}>导出</el-button>
                <el-button disabled={!hasSelect.value} onClick={delSelectUsers}>
                  删除
                </el-button>
              </div>
            )
          }}
          fields={{
            dataField: 'items',
            totalField: 'meta.totalItems'
          }}
          tableProps={{
            onSelectionChange: (val: Recordable[]) => {
              selectRows.value = val
            }
          }}
          paginationProps={{
            'page-sizes': [2, 10, 50, 100]
          }}
          pageSize={2}
        />
      </div>
    )
  }
})
