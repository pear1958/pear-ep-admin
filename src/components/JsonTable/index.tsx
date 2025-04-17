import { PropType, defineComponent, onMounted, ref, useSlots } from 'vue'
import { FormInstance, PaginationProps, TableProps } from 'element-plus'
import { Refresh, Operation } from '@element-plus/icons-vue'
import { isEmpty } from 'pear-common-utils'
import { Column, Fields, SuccessCbRes, Toolbar } from './type'
import { useTable } from './useTable'
import './index.scss'
import JsonForm from '../JsonForm'
import noDataImg from '@/assets/imgs/notData.png'
import { JsxNode } from '@/types/common'
import { JsonFormProps } from '../JsonForm/type'

export const props = {
  jsonFormProps: {
    type: Object as PropType<JsonFormProps>,
    default: () => ({})
  },
  showSearch: {
    type: Boolean,
    default: true
  },
  autoSearch: {
    type: Boolean,
    default: true
  },
  // 搜索之前的回调函数, 如果回调返回值为false, 则不会调用对应的搜索方法
  beforeSearch: {
    type: Function as PropType<(params?: Recordable) => boolean>
  },
  // 请求表格数据的api
  search: {
    type: Function as PropType<(params: Recordable) => Promise<any>>
  },
  // 返回数据的回调函数, 可以对数据进行处理
  success: {
    type: Function as PropType<(data: any) => SuccessCbRes>
  },
  // 传参和取值的字段名称配置
  fields: {
    type: Object as PropType<Fields>,
    default: () => ({})
  },
  columns: {
    type: Array as PropType<Column[]>,
    default: () => []
  },
  // el-table的所有属性
  tableProps: {
    type: Object as PropType<TableProps<Recordable>>,
    default: () => ({})
  },
  showToolbar: {
    type: Boolean,
    default: true
  },
  // 默认工具栏
  toolbar: {
    type: Object as PropType<Toolbar>,
    default: () => ({})
  },
  // 自定义工具栏
  customToolbar: {
    type: Object as PropType<JsxNode>,
    default: () => null
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
    type: Object as PropType<Recordable<() => JsxNode>>,
    default: () => null
  }
  // columnElipsis: {
  //   type: Object as PropType<LongTextElipsisType | boolean>,
  //   default: () => ({ line: 2 }),
  // },
}

export default defineComponent({
  name: 'JsonTable',
  props,
  inheritAttrs: false,
  setup(_, { expose }) {
    const slots = useSlots()
    const formData = ref()
    const formRef = ref() // el-form实例
    const jsonFormRef = ref() // 组件实例
    const { loading, state, handleCurrentChange, handleSizeChange, search, reset } = useTable(_)

    const getFormInstance = (ins: FormInstance) => {
      formRef.value = ins
    }

    onMounted(() => {
      if (_.autoSearch) search()
    })

    expose({
      formRef,
      jsonFormRef
    })

    return () => (
      <div class="json-table">
        {_.showSearch && (
          <JsonForm
            ref={jsonFormRef}
            class="form"
            label-width="120px"
            showSearch
            getFormInstance={getFormInstance}
            // 可以覆盖上面的默认值
            {..._.jsonFormProps}
            v-model:formData={formData.value}
            onSearch={search}
            onReset={reset}
          />
        )}

        {_.customToolbar && <div class="custom-toolbar">{_.customToolbar}</div>}

        {_.showToolbar && (
          <div class="toolbar">
            <div class="title">{_.toolbar.title || ''}</div>
            <div class="buttons">
              {_.toolbar.buttons && <div class="mr-3">{_.toolbar.buttons}</div>}
              <el-button icon={Refresh} circle />
              <el-button icon={Operation} circle />
            </div>
          </div>
        )}

        <el-table data={state.tableData} v-loading={loading.value} border {..._.tableProps}>
          {{
            default: () =>
              _.columns.map(item => {
                const { prop, customRender, slots } = item
                return (
                  <el-table-column {...item} key={prop}>
                    {{
                      default: ({ row, column, $index }) => {
                        const text = row[prop]
                        if (customRender && typeof customRender === 'function') {
                          return customRender({
                            text,
                            record: row,
                            index: $index,
                            column
                          })
                        }
                        if (isEmpty(text)) return '--'
                        return text
                      },
                      ...slots
                    }}
                  </el-table-column>
                )
              }),
            empty: () => (
              <div class="leading-7">
                <img src={noDataImg} alt="" />
                <div>{_.tableProps.emptyText || '暂无数据'}</div>
              </div>
            ),
            ...slots
          }}
        </el-table>

        {_.pagination && (
          <el-pagination
            class="pagination"
            background
            layout="total, sizes, prev, pager, next, jumper"
            current-page={state.pageNum}
            page-size={state.pageSize}
            total={state.total}
            page-sizes={[10, 20, 50, 100]}
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
