import { reactive, ref } from 'vue'
import { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { getValueByCasKey, isFunction } from 'pear-common-utils'
import { JsonTableProps } from './type'

export const useTable = (_: JsonTableProps) => {
  const loading = ref(false)
  const formData = ref()
  const state = reactive({
    tableData: [],
    pageNum: 1,
    pageSize: 10,
    total: 0
    // searchParams: {} // 储存表单查询参数 | table默认查询参数
  })

  const formRef = ref() // el-form实例

  // 暴露给父级组件使用
  const getFormInstance = (ins: FormInstance) => {
    formRef.value = ins
  }

  const defaultFields = {
    pageNumField: 'current',
    pageSizeField: 'pageSize',
    dataField: 'list',
    totalField: 'total'
  }

  const fields = Object.assign({}, defaultFields, _.fields)

  const handleCurrentChange = (val: number) => {
    state.pageNum = val
    search()
  }

  const handleSizeChange = (val: number) => {
    state.pageSize = val
    search()
  }

  const search = async () => {
    const params = {
      [fields.pageNumField]: state.pageNum,
      [fields.pageSizeField]: state.pageSize,
      ...cloneDeep(formData.value || {})
    }

    if (isFunction(_.beforeSearch)) {
      const temp = cloneDeep(params)
      const bool = _.beforeSearch(temp)
      if (!bool) return
    }

    if (!isFunction(_.search)) return

    loading.value = true

    try {
      const res = await _.search(params)
      if (isFunction(_.success)) {
        const resData = _.success(res)
        state.tableData = resData.list || []
        state.total = resData.total || 0
      } else {
        state.tableData = getValueByCasKey(res || {}, fields.dataField) || []
        state.total = getValueByCasKey(res || {}, fields.totalField) || 0
      }
    } catch (e) {
      // xxx
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    state.pageNum = 1
    state.pageSize = 10
    search()
  }

  // to-do
  // 4.所有按钮的功能 代码添加
  // 5.单选, 多选, 排序 以及其他功能测试
  // 6.默认参数调试

  return {
    loading,
    state,
    formData,
    handleCurrentChange,
    handleSizeChange,
    search,
    reset,
    formRef,
    getFormInstance
  }
}
