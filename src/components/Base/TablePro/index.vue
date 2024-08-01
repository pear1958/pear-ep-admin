<template>
  <div>
    <SearchForm
      :searchCols="searchCols"
      :columns="searchColumns"
      :searchParams="searchParams"
      :search="search"
      :reset="reset"
      v-show="showSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive, Ref, useSlots } from 'vue'
import SearchForm from '../SearchForm/index.vue'
import { ColumnProps, TableProProps } from './type'

// useSlots

const props = withDefaults(defineProps<TableProProps>(), {
  searchCols: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  columns: () => []
})

const showSearch = ref(true)

const searchParams = reactive({})

// 接收 columns 并设置为响应式
const tableColumns: Ref<ColumnProps[]> = ref(props.columns)

// console.log('tableColumns', tableColumns)

const flatColumns = computed(() => flatColumnsFunc(tableColumns.value))

// 扁平化 columns 的方法
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
  columns.forEach(async col => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children))

    flatArr.push(col)

    // column 添加默认 isShow && isSetting && isFilterEnum 属性值
    col.isShow = col.isShow ?? true
    col.isSetting = col.isSetting ?? true
    col.isFilterEnum = col.isFilterEnum ?? true

    // 设置 enumMap
    // await setEnumMap(col)
  })

  return flatArr.filter(item => !item._children?.length)
}

// 过滤需要搜索的配置项 && 排序
const searchColumns = computed(() => {
  return flatColumns.value
    ?.filter(item => item.search?.el || item.search?.render)
    .sort((a, b) => a.search!.order! - b.search!.order!)
})

const search = () => {
  console.log('搜索')
}

const reset = () => {
  console.log('重置')
}
</script>

<style lang="scss" scoped></style>
