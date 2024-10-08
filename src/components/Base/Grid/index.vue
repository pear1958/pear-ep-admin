<template>
  <div :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeMount, provide, watch, ComputedRef } from 'vue'
import { isArray, isNumber, isObject } from 'pear-common-utils'
import { GridProps } from './type'
import { useGrid } from './hooks'

defineOptions({
  name: 'Grid'
})

const props = withDefaults(defineProps<GridProps>(), {
  gap: 0,
  cols: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
  collapsed: false,
  collapsedRows: 1
})

const { breakPoint, hiddenIndex, findIndex } = useGrid()

const gridGap = computed(() => {
  const { gap } = props
  if (isNumber(gap)) return `${gap}px`
  if (isArray(gap)) return `${gap[0]}px ${gap[1]}px`
  return 'unset'
})

// 每行显示几列
const gridCols: ComputedRef<number> = computed(() => {
  const { cols } = props
  if (isNumber(cols)) return cols
  if (isObject(cols)) return cols[breakPoint.value]
  return 4
})

const style = computed(() => {
  return {
    display: 'grid',
    gridGap: gridGap.value,
    gridTemplateColumns: `repeat(${gridCols.value}, minmax(0, 1fr))` // 定义每一列的列宽
  }
})

provide('breakPoint', breakPoint)
provide('hiddenIndex', hiddenIndex)
provide('gap', isArray(props.gap) ? props.gap[1] : props.gap)
provide('cols', gridCols)

onBeforeMount(() => props.collapsed && findIndex(props, gridCols))

watch(
  () => breakPoint.value,
  () => {
    if (props.collapsed) findIndex(props, gridCols)
  }
)

watch(
  () => props.collapsed,
  value => {
    if (value) return findIndex(props, gridCols)
    hiddenIndex.value = -1
  }
)

defineExpose({ breakPoint })
</script>
