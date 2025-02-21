import { computed, ref } from 'vue'

export const useSelection = (rowKey: string = 'id') => {
  const isSelected = ref<boolean>(false)
  const selectList = ref<Recordable[]>([])

  // 支持跨页多选
  const selectIdList = computed(() => {
    const ids: string[] = []
    selectList.value.forEach(item => ids.push(item[rowKey]))
    return ids
  })

  const onSelectChange = (rowArr: Recordable[]) => {
    rowArr.length ? (isSelected.value = true) : (isSelected.value = false)
    selectList.value = rowArr
  }

  return {
    isSelected,
    selectList,
    selectIdList,
    onSelectChange
  }
}
