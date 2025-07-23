import { reactive, ref, unref } from 'vue'
import { FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { isEmpty, isFunction } from 'pear-common-utils'
import { JsonTableProps } from './type'

const getValueByCasKey = <T = any>(data: Recordable, key: string) => {
  if (isEmpty(key)) return data as T
  key.split('.').forEach(key => (data = data[key]))
  return data as T
}

export const useTable = (_: JsonTableProps) => {
  const loading = ref(false)
  const formData = ref()
  const state = reactive({
    tableData: [],
    pageNum: 1,
    pageSize: 10,
    total: 0
  })

  const searchbarRef = ref()
  const formRef = ref() // el-form实例

  // 暴露给父级组件使用
  const getFormInstance = (ins: FormInstance) => {
    formRef.value = ins
  }

  const defaultFields = {
    pageNumField: 'pageNum',
    pageSizeField: 'pageSize',
    dataField: 'list',
    totalField: 'total'
  }

  const fields = Object.assign({}, defaultFields, _.fields)

  const handleCurrentChange = (val: number) => {
    state.pageNum = val
    refresh()
  }

  const handleSizeChange = (val: number) => {
    state.pageSize = val
    refresh()
  }

  const refresh = async () => {
    const params = {
      [fields.pageNumField]: state.pageNum,
      [fields.pageSizeField]: state.pageSize,
      ...cloneDeep(formData.value || {}),
      ...cloneDeep(_.extraParams)
    }

    if (isFunction(_.beforeSearch)) {
      const temp = cloneDeep(params)
      const bool = _.beforeSearch(temp)
      if (!bool) return
    }

    if (!isFunction(_.search)) return

    loading.value = true

    try {
      let { data } = await _.search(params)
      console.log('data', data)
      if (!data) return
      // 第一层数据结构支持自定义
      if (isFunction(_.success)) {
        data = _.success(data)
      }
      state.tableData = getValueByCasKey(data || {}, fields.dataField) || []
      state.total = getValueByCasKey(data || {}, fields.totalField) || 0
    } catch (err) {
      console.log('err', err)
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    state.pageNum = 1
    state.pageSize = 10

    if (unref(searchbarRef)) {
      unref(searchbarRef).reset()
    } else {
      // 没有搜索栏的情况
      Object.keys(formData).forEach(key => {
        delete formData[key]
      })
      refresh()
    }
  }

  const getFormData = () => formData.value

  // 点击搜索按钮
  const handleSearch = () => {
    state.pageNum = 1
    refresh()
  }

  return {
    loading,
    state,
    formData,
    handleCurrentChange,
    handleSizeChange,
    refresh,
    reset,
    formRef,
    searchbarRef,
    getFormInstance,
    handleSearch,
    getFormData
  }
}
