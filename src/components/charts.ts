import { PropType, computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'
import { useSystemStore } from '@/store/modules/system'
import { throttle } from '@/utils'

export default defineComponent({
  name: 'charts',
  props: {
    options: {
      type: Object as PropType<any>
    }
  },
  setup(props) {
    let chart: ECharts
    const chartRef = ref()
    const isCollapse = computed(() => systemStore.sideBar.isCollapse)
    const systemStore = useSystemStore()
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

    return {
      chartRef
    }
  },
  render() {
    return h('div', { class: 'chart w-full h-full', ref: el => (this.chartRef = el) })
  }
})
