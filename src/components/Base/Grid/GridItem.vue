<template>
  <div v-show="visible" :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Ref, computed, inject, ref, useAttrs, watch } from 'vue'
import { BreakPoint, GridItemProps } from './type'
import { isEmpty } from 'pear-view-utils'

defineOptions({
  name: 'GridItem'
})

const props = withDefaults(defineProps<GridItemProps>(), {
  span: 1, // 搜索项所占用的列数, 默认为 1 列
  offset: 0, // 搜索字段左侧偏移列数
  suffix: false,
  xs: undefined,
  sm: undefined,
  md: undefined,
  lg: undefined,
  xl: undefined
})

const visible = ref(true)

const hiddenIndex = inject<Ref<number>>('hiddenIndex', ref(-1))
const breakPoint = inject<Ref<BreakPoint>>('breakPoint', ref('xl'))

const attrs = useAttrs() as { index: string }

watch(
  () => [hiddenIndex.value, breakPoint.value],
  newVal => {
    if (isEmpty(attrs.index)) return

    if (newVal[0] === -1) {
      visible.value = true
      return
    }

    visible.value = parseInt(attrs.index) < Number(newVal[0])
  },
  { immediate: true }
)

const cols = inject('cols', ref(4))
const gap = inject('gap', 0)

const style = computed(() => {
  const span = props[breakPoint.value]?.span ?? props.span
  const offset = props[breakPoint.value]?.offset ?? props.offset

  const spanNum = span + offset > cols.value ? cols.value : span + offset
  const marginLeft =
    offset !== 0 ? `calc(((100% + ${gap}px) * ${offset} / ${span + offset}) )` : 'unset'

  return props.suffix
    ? {
        gridColumnStart: cols.value + 1 - span - offset,
        gridColumnEnd: `span ${span + offset}`,
        marginLeft
      }
    : {
        gridColumn: `span ${spanNum}`,
        marginLeft
      }
})
</script>
