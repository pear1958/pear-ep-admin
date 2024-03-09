<template>
  <div class="chart w-full h-full" ref="chartRef"></div>
</template>

<script setup lang="ts">
import { PropType, computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'
import { useSystemStore } from '@/store/modules/system'
import { throttle } from '@/utils'

defineOptions({
  name: 'charts'
})

const props = defineProps({
  options: {
    type: Object as PropType<any>
  }
})

let chart: ECharts
const chartRef = ref()
const systemStore = useSystemStore()
const isCollapse = computed(() => systemStore.sideBar.isCollapse)
const { mainMaximize } = storeToRefs(systemStore)

const updateChart = () => {
  if (!chart) return
  chart.clear()
  chart.setOption(props.options)
}

const resizeChart = throttle(() => {
  if (!chart) return
  chart.resize()
}, 200)

window.addEventListener('resize', resizeChart)

watch(
  () => [mainMaximize, isCollapse],
  () => {
    resizeChart()
  },
  { deep: true }
)

watch(
  () => props.options,
  () => {
    updateChart()
  },
  {
    immediate: true,
    deep: true
  }
)

onMounted(() => {
  chart = echarts.init(chartRef.value)
  chart.setOption(props.options)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', resizeChart)
})
</script>
