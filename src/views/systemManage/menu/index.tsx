import { defineComponent } from 'vue'
import JsonTable from '@/components/JsonTable'
import useConfig from './useConfig'

export default defineComponent({
  name: 'MenuManage',
  setup() {
    const { tableRef, columns, formItems, getList } = useConfig()

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
            title: '菜单管理',
            buttons: (
              <div>
                <el-button type="primary">新增</el-button>
                <el-button>导出</el-button>
                <el-button>删除</el-button>
              </div>
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
