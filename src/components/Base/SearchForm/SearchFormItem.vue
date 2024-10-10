<template>
  <component
    :is="column.search?.render ?? `el-${column.search?.el}`"
    v-bind="{ ...handleSearchProps, ...placeholder, searchParams, clearable }"
    v-model.trim="searchParams[column.search?.key ?? handleProp(column.prop!)]"
    :data="column.search?.el === 'tree-select' ? columnEnumData : []"
    :options="['cascader', 'select-v2'].includes(column.search?.el!) ? columnEnumData : []"
  >
    <template v-if="column.search?.el === 'cascader'" #default="{ data }">
      <span>{{ data[fieldNames.label] }}</span>
    </template>

    <template v-if="column.search?.el === 'select'">
      <el-option
        v-for="(item, index) in columnEnumData"
        :label="item[fieldNames.label]"
        :value="item[fieldNames.value]"
        :key="index"
      />
    </template>

    <slot v-else></slot>
  </component>
</template>

<script setup lang="ts">
import { computed, inject, ref, toRef, unref } from 'vue'
import { handleProp, isEmpty } from 'pear-common-utils'
import { ColumnProps } from '../TablePro/types'

defineOptions({
  name: 'SearchFormItem'
})

interface SearchFormItemProps {
  column: ColumnProps
  searchParams: Recordable
}

const props = defineProps<SearchFormItemProps>()

const column = toRef(props, 'column')

const fieldNames = computed(() => {
  return {
    label: unref(column).fieldNames?.label ?? 'label',
    value: unref(column).fieldNames?.value ?? 'value',
    children: unref(column).fieldNames?.children ?? 'children'
  }
})

// 处理透传的 searchProps (el 为 tree-select、cascader 的时候需要给下默认 label && value && children)
const handleSearchProps = computed(() => {
  const { label, value, children } = fieldNames.value

  const searchEl = unref(column).search?.el

  let searchProps = unref(column).search?.props ?? {}

  if (searchEl === 'tree-select') {
    searchProps = { ...searchProps, props: { ...searchProps, label, children }, nodeKey: value }
  }

  if (searchEl === 'cascader') {
    searchProps = { ...searchProps, props: { ...searchProps, label, value, children } }
  }

  return searchProps
})

// 处理默认 placeholder
const placeholder = computed(() => {
  const { search } = unref(column)

  if (
    ['datetimerange', 'daterange', 'monthrange'].includes(search?.props?.type) ||
    search?.props?.isRange
  ) {
    return {
      startPlaceholder: search?.props?.startPlaceholder ?? '开始时间',
      rangeSeparator: search?.props?.rangeSeparator ?? '至',
      endPlaceholder: search?.props?.endPlaceholder ?? '结束时间'
    }
  }

  const placeholder =
    search?.props?.placeholder ??
    (search?.el?.includes('input') ? '请输入' : '请选择') + unref(column).label

  return {
    placeholder
  }
})

// 没有默认值时, 才显示清除按钮
const clearable = computed(() => {
  const { search } = unref(column)
  return search?.props?.clearable ?? isEmpty(search?.defaultValue)
})

// el 为 select-v2 时需单独处理 enumData
const enumMap = inject('enumMap', ref(new Map()))

const columnEnumData = computed(() => {
  const { column } = props

  let enumData = unref(enumMap).get(column.prop)

  if (!enumData) return []

  if (column.search?.el === 'select-v2' && column.fieldNames) {
    enumData = enumData.map((item: { [key: string]: any }) => {
      return { ...item, label: item[fieldNames.value.label], value: item[fieldNames.value.value] }
    })
  }

  return enumData
})
</script>
