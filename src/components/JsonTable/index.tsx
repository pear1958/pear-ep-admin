import { PropType, Slot, defineComponent, onMounted } from 'vue'
import { JSX } from 'vue/jsx-runtime'
import { PaginationProps, TableProps } from 'element-plus'
import { Column, SearchbarProps } from './type'
import { useTable } from './useTable'
import './index.scss'
import JsonForm from '../JsonForm'

export const props = {
  showSearch: {
    type: Boolean,
    default: true
  },
  searchbarProps: {
    type: Object as PropType<SearchbarProps>,
    default: () => ({})
  },
  // 自定义searchbar, 可以直接使用jsx编写
  customSearchbar: {
    type: Object as PropType<Slot | JSX.Element>,
    default: () => ({})
  },
  // 搜索方法
  search: {
    type: Function as PropType<(params: Recordable) => void>
    // required: true
  },
  autoSearch: {
    type: Boolean,
    default: true
  },
  columns: {
    type: Array as PropType<Column[]>,
    default: () => []
  },
  tableProps: {
    type: Object as PropType<TableProps<Recordable[]>>
    // required: true
  },
  tableSlots: {
    type: Object as PropType<Slot | JSX.Element>,
    default: () => ({})
  },
  // 是否展示分页
  pagination: {
    type: Boolean,
    default: true
  },
  paginationProps: {
    type: Object as PropType<PaginationProps>,
    default: () => ({})
  },
  paginationSlots: {
    type: Object as PropType<Slot | JSX.Element>,
    default: () => ({})
  },
  // 工具栏, 可以直接使用jsx编写, 比如导出按钮
  toolbar: {
    type: Object as PropType<JSX.Element>,
    default: () => ({})
  },
  // showTotal: {
  //   type: Boolean,
  //   default: true,
  // },
  //
  // 当单元格的数据为空的时候, 显示的字符串
  emptyText: {
    type: String,
    default: ''
  },
  pageNumField: {
    type: String,
    default: 'pageNum'
  },
  pageSizeField: {
    type: String,
    default: 'pageSize'
  }
  // columnElipsis: {
  //   type: Object as PropType<LongTextElipsisType | boolean>,
  //   default: () => ({ line: 2 }),
  // },
  // getSearchbarInstance: {
  //   type: Function as PropType<(ins: ComponentPublicInstance) => void>,
  // },
}

export default defineComponent({
  name: 'JsonTable',
  props,
  inheritAttrs: false,
  setup(_) {
    const { loading, state, handleCurrentChange, handleSizeChange, handleSearch } = useTable(_)

    onMounted(() => {
      if (_.autoSearch) handleSearch()
    })

    return () => (
      <div class="json-table">
        {_.showSearch && (
          <JsonForm
            class="form"
            {...{ 'label-width': '120px', showSearch: true, ..._.searchbarProps.jsonFormAttrs }}
            // v-model:formData={formData.value}
          />
        )}

        <el-table
          class="table"
          data={state.tableData}
          {..._.tableProps}
          v-loading={loading.value}
          border
        >
          {_.columns.map(item => {
            return <el-table-column {...item} key={item.prop}></el-table-column>
          })}
        </el-table>

        {_.pagination && (
          <el-pagination
            class="pagination"
            background
            layout="total, sizes, prev, pager, next, jumper"
            current-page={state.pageNum}
            page-size={state.pageSize}
            total={state.total}
            page-sizes={[5, 10, 25, 50, 100]}
            onCurrentChange={handleCurrentChange}
            onSizeChange={handleSizeChange}
            {..._.paginationProps}
            slots={_.paginationSlots}
          />
        )}
      </div>
    )
  }
})
