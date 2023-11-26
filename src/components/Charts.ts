import { PropType, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
import type { ECharts } from 'echarts'
import { throttle } from '@/utils'

export default defineComponent({
  name: 'Charts',
  props: {
    options: {
      type: Object as PropType<any>
    }
  },
  setup(props) {
    let chart: ECharts
    const chartRef = ref()

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

    return () => h('div', { class: 'chart w-full h-full', ref: chartRef })
  }
})
