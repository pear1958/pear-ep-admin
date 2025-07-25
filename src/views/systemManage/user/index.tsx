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
      delSelectUsers
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
                <el-button>导出</el-button>
                <el-button disabled={!hasSelect.value} onClick={delSelectUsers}>
                  删除
                </el-button>
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
          tableProps={{
            onSelectionChange: (val: Recordable[]) => {
              selectRows.value = val
            }
          }}
        />
      </div>
    )
  }
})
