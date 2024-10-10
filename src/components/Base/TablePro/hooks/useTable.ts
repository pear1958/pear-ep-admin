import { reactive, toRefs } from 'vue'
import { isEmpty, objIsEmpty, getValueByCasKey } from 'pear-common-utils'
import { Table } from '../types/table'

export function useTable(
  api?: (params: any) => Promise<any> | null,
  fixedParams: Recordable = {}, // 其它固定参数
  pagination: boolean = true,
  paramsKeyMap?: Table.ParamsKeyMap,
  dataCallBack?: (data: any) => any,
  requestError?: (error: any) => void
) {
  const _paramsKeyMap = {
    pageNumKey: 'pageNum',
    pageSizeKey: 'pageSize',
    listKey: 'list',
    totalKey: 'total'
  }

  paramsKeyMap && Object.assign(_paramsKeyMap, paramsKeyMap)

  const state = reactive<Table.StateProps>({
    tableData: [],
    loading: false,
    pageParams: {
      pageNum: 1,
      pageSize: 10,
      total: 0
    },
    searchParams: {}, // 查询参数 = searchInitParams + 其它表单的参数
    totalParams: {}, // 总参数 = fixedParams + pageParams + searchParams
    // -----------------------
    searchInitParams: {} // 用来记住默认的搜索参数
  })

  const initTable = () => {
    if (!objIsEmpty(state.searchParams)) {
      searchParams2TotalParams()
    }
    getTableList()
  }

  const getTableList = async () => {
    if (!api) return

    const { pageNumKey, pageSizeKey, listKey, totalKey } = _paramsKeyMap

    try {
      Object.assign(
        state.totalParams,
        fixedParams,
        pagination
          ? {
              [pageNumKey]: state.pageParams.pageNum,
              [pageSizeKey]: state.pageParams.pageSize
            }
          : {}
      )

      state.loading = true

      let { data } = await api(state.totalParams)

      dataCallBack && (data = dataCallBack(data))

      state.tableData = pagination ? getValueByCasKey(data, listKey) : data

      if (pagination) {
        state.pageParams.total = getValueByCasKey(data, totalKey)
      }
    } catch (err) {
      requestError && requestError(err)
    } finally {
      state.loading = false
    }
  }

  const searchParams2TotalParams = () => {
    state.totalParams = {}

    for (let key in state.searchParams) {
      if (!isEmpty(state.searchParams[key])) {
        state.totalParams[key] = state.searchParams[key]
      }
    }
  }

  const search = () => {
    state.pageParams.pageNum = 1
    searchParams2TotalParams()
    getTableList()
  }

  const reset = () => {
    state.pageParams.pageNum = 1
    // 重置搜索表单的时, 如果有默认搜索参数, 则重置默认的搜索参数
    state.searchParams = { ...state.searchInitParams }
    searchParams2TotalParams()
    getTableList()
  }

  const handleCurrentChange = (page: number) => {
    state.pageParams.pageNum = page
    getTableList()
  }

  const handleSizeChange = (size: number) => {
    state.pageParams.pageNum = 1
    state.pageParams.pageSize = size
    getTableList()
  }

  return {
    ...toRefs(state),
    initTable,
    getTableList,
    searchParams2TotalParams,
    search,
    reset,
    handleCurrentChange,
    handleSizeChange
  }
}
