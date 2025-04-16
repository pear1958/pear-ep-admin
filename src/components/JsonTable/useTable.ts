import { reactive, ref } from 'vue'
import { JsonTableProps } from './type'
import { delay } from 'pear-common-utils'
import { mockData } from './mock'

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
    pageNumField: 'pageNum',
    pageSizeField: 'pageSize',
    dataField: 'list',
    totalField: 'total'
  }

  const handleCurrentChange = (val: number) => {
    state.pageNum = val
  }

  const handleSizeChange = (val: number) => {
    state.pageSize = val
  }

  const handleSearch = async () => {
    loading.value = true
    // const params = {
    //   [_.pageNumField]: state.pageNum,
    //   [_.pageSizeField]: state.pageSize
    // }
    await delay(1500)
    state.tableData = mockData
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
