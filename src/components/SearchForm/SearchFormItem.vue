<template>
  <component
    v-if="column.search?.el"
    :is="`el-${column.search.el}`"
    v-bind="handleSearchProps"
    v-model.trim="searchParam[column.search.key ?? handleProp(column.prop!)]"
    :data="column.search?.el === 'tree-select' ? optionsData : []"
    :options="['cascader', 'select-v2'].includes(column.search?.el) ? optionsData : []"
    :placeholder="placeholder"
    :clearable="clearable"
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
  >
    <!-- 自定义 Item 的节点内容 -->
    <template #default="{ data }" v-if="column.search.el === 'cascader'">
      <span>{{ data[fieldNames.label] }}</span>
    </template>

    <template v-if="column.search.el === 'select'">
      <component
        :is="`el-option`"
        v-for="(col, index) in optionsData"
        :key="index"
        :label="col[fieldNames.label]"
        :value="col[fieldNames.value]"
      ></component>
    </template>

    <slot v-else></slot>
  </component>
</template>

<script lang="ts" setup name="SearchFormItem">
import { computed, inject, ref, unref } from 'vue'
import { ColumnProps } from '../ProTable/type'
import { handleProp } from '@/utils/table'

const columnItem = {
  prop: 'gender',
  label: '性别',
  // 字典数据
  // enum: genderType,
  // 字典请求不带参数
  // enum: getUserGender,
  // 字典请求携带参数
  // enum: () => getUserGender({ id: 1 }),
  // 对应搜索框的 类型 & 透传给组件的 props
  search: { el: 'select', props: { filterable: true } },
  // 显示在下拉框中 数据所需 对应的 label 和 value 字段
  fieldNames: { label: 'genderLabel', value: 'genderValue' }
}

interface SearchFormItem {
  column: ColumnProps
  searchParam: { [key: string]: any }
}
const props = defineProps<SearchFormItem>()

// 判断 fieldNames 设置 label && value 的 key 值
const fieldNames = computed(() => ({
  label: props.column.fieldNames?.label ?? 'label',
  value: props.column.fieldNames?.value ?? 'value'
}))

// 将 search.props 透传给组件
const handleSearchProps = computed(() => {
  const label = unref(fieldNames).label
  const value = unref(fieldNames).value
  const searchEl = props.column.search?.el

  const searchProps = props.column.search?.props ?? {}

  let handleProps = searchProps


  // ---- ? -------
  if (searchEl === 'tree-select') {
    handleProps = { ...searchProps, props: { label, ...searchProps.props }, nodeKey: value }
  }

  if (searchEl === 'cascader') handleProps = { ...searchProps, props: { label, value, ...searchProps.props } }

  return handleProps
})

// 接收 enumMap
const enumMap = inject('enumMap', ref(new Map()))

const optionsData = computed(() => {
  // tree-select && cascader 正常返回
  let enumData = unref(enumMap).get(props.column.prop)

  if (!enumData) return []

  // 处理 Select V2 虚拟列表选择器 的数据
  if (props.column.search?.el === 'select-v2' && props.column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return { ...item, label: item[unref(fieldNames).label], value: item[unref(fieldNames).value] }
    })
  }

  return enumData
})

// 判断 placeholder
const placeholder = computed(() => {
  const search = props.column.search
  return search?.props?.placeholder ?? (search?.el === 'input' ? '请输入' : '请选择')
})

// 是否有清除按钮 (当搜索项有默认值时，清除按钮不显示)
const clearable = computed(() => {
  const search = props.column.search
  return search?.props?.clearable ?? (search?.defaultValue == null || search?.defaultValue == undefined)
})
</script>

<style lang="scss" scoped></style>
