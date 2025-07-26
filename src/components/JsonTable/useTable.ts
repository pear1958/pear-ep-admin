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
    pageNumField: 'page',
    pageSizeField: 'pageSize',
    dataField: 'list',
    totalField: 'total'
  }

  const fields = Object.assign({}, defaultFields, _.fields)

  const getFormData = () => formData.value

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

  // 点击搜索按钮
  const search = () => {
    state.pageNum = 1
    refresh()
  }

  const _reset = () => {
    state.pageNum = 1
    state.pageSize = 10
    refresh()
  }

  // 供外界手动重置的场景
  const reset = () => {
    if (unref(searchbarRef)) {
      // 重置formData - 并触发 _reset
      unref(searchbarRef).reset()
    } else {
      // 没有搜索栏的情况
      Object.keys(formData).forEach(key => {
        delete formData[key]
      })
    }
  }

  return {
    loading,
    state,
    formData,
    formRef,
    getFormInstance,
    getFormData,
    handleCurrentChange,
    handleSizeChange,
    refresh,
    search,
    reset,
    _reset
  }
}
