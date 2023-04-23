<template>
  <div>
    <SearchForm
      :columns="searchColumns"
      :search="() => null"
      :reset="() => null"
      :searchParam="searchParam"
      :searchCol="searchCol"
    />
  </div>
</template>

<script lang="ts" setup>
import { ColumnProps } from '@/components/ProTable/type'
import SearchForm from '@/components/SearchForm/index.vue'
import { provide, ref } from 'vue'

// const props = withDefaults(defineProps<any>(), {
//   columns: () => []
// })

const searchCol = ref({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })

const searchParam = ref({})

const enumMap = ref(new Map<string, { [key: string]: any }[]>())

provide('enumMap', enumMap)

const setEnumMap = async (col: ColumnProps) => {
  if (!col.enum) return
  // 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
  if (typeof col.enum !== 'function') return enumMap.value.set(col.prop!, col.enum!)
  const { data } = await col.enum()
  enumMap.value.set(col.prop!, data)
}

// 扁平化 columns
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
  columns.forEach(async col => {
    if (col._children?.length) flatArr.push(...flatColumnsFunc(col._children))
    flatArr.push(col)

    // 给每一项 column 添加 isShow && isFilterEnum 默认属性
    col.isShow = col.isShow ?? true
    col.isFilterEnum = col.isFilterEnum ?? true

    // 设置 enumMap
    setEnumMap(col)
  })

  return flatArr.filter(item => !item._children?.length)
}

const columns1 = [
  {
    prop: 'username',
    label: '用户姓名',
    search: { el: 'input' }
  },
  {
    prop: 'gender',
    label: '性别',
    // 字典数据
    // enum: genderType,
    // 字典请求不带参数
    // 字典请求携带参数
    // enum: () => getUserGender({ id: 1 }),
    search: { el: 'select', props: { filterable: true } },
    fieldNames: { label: 'genderLabel', value: 'genderValue' }
  },
  {
    prop: 'status',
    label: '用户状态',
    search: { el: 'tree-select', props: { filterable: true } },
    fieldNames: { label: 'userLabel', value: 'userStatus' }
  },
  {
    prop: 'createTime',
    label: '创建时间',
    width: 180,
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
      defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00']
    }
  }
]

// 接收 columns 并设置为响应式
const tableColumns = ref<any[]>(columns1)

// flatColumns
const flatColumns = ref<ColumnProps[]>()
flatColumns.value = flatColumnsFunc(tableColumns.value)

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter((item: any) => item.search?.el)
</script>

<style lang="scss" scoped></style>
