<template>
  <div v-show="visible" :style="style">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import { Ref, computed, inject, ref, useAttrs, watch } from 'vue'
import { isEmpty } from 'pear-common-utils'
import { BreakPoint, GridItemProps } from './type'

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

  // unset: 重置为 CSS 规范定义的初始值 0
  // 在 CSS Grid 布局中，gap（网格间距）并不包含在容器的 100% 宽度内，而是额外占据空间的
  // 公式中 +gap 不是直接加总间隙，而是通过数学等价简化，将虚拟列组的总间隙平均分配到每列中
  const marginLeft =
    offset !== 0 ? `calc(((100% + ${gap}px) / ${span + offset}) * ${offset})` : 'unset'

  return props.suffix
    ? {
        // 后缀项需要 固定在右侧（不随前面项的数量变化而改变位置）
        // 必须通过计算 gridColumnStart 强制指定起始位置，才能保证在网格最右侧显示
        // ------------------------
        // 定义网格项从哪条列线开始排列
        gridColumnStart: cols.value + 1 - span - offset,
        // 定义网格项到哪条列线结束
        gridColumnEnd: `span ${span + offset}`,
        marginLeft
      }
    : {
        // 简写属性 start / end || span num(跨越几列)
        // 普通项需要 按顺序流式排列（从左到右按顺序占位），用 span x 即可满足
        // span x 表示从当前位置开始，向右跨越 x 列（包含自身宽度和偏移）
        gridColumn: `span ${spanNum}`,
        // span + offset 计算的是 “总需求空间”（3 列）
        // gridColumn: span 3 负责 “预留总空间”；
        // marginLeft 负责在总空间内分配 “偏移部分”（1 列），剩下的自然是元素自身宽度（2 列）。
        marginLeft
      }
})
</script>
