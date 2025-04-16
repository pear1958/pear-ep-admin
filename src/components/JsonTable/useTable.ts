import { reactive, ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import { JsonTableProps } from './type'
import { getInsuranceList } from '@/api/modules/insurance'

export const useTable = (_: JsonTableProps) => {
  const loading = ref(false)
  const formData = ref()
  const state = reactive({
    tableData: [],
    pageNum: 1,
    pageSize: 10,
    total: 127,
    searchParams: {} // 储存表单查询参数 | table默认查询参数
  })

  const defaultFields = {
    pageNumField: 'current',
    pageSizeField: 'pageSize',
    dataField: 'list',
    totalField: 'total'
  }

  const fields = Object.assign({}, defaultFields, _.fields)

  const handleCurrentChange = (val: number) => {
    state.pageNum = val
    handleSearch()
  }

  const handleSizeChange = (val: number) => {
    state.pageSize = val
    handleSearch()
  }

  const handleSearch = async () => {
    loading.value = true
    state.searchParams = cloneDeep(formData.value || {})
    const params = {
      [fields.pageNumField]: state.pageNum,
      [fields.pageSizeField]: state.pageSize,
      ...state.searchParams
    }
    const res = (await getInsuranceList(params)) as Recordable
    console.log('res', res)
    state.tableData = res[fields.dataField]
    state.total = res[fields.totalField]
    loading.value = false
  }

  return {
    loading,
    state,
    formData,
    handleCurrentChange,
    handleSizeChange,
    handleSearch
  }
}
