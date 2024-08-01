import { PropType, computed, defineComponent, h, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { EChartsType } from 'echarts/core'
import echarts from './config'
import { useSystemStore } from '@/store/modules/system'
import { throttle } from '@/utils'
import { ChartOption } from './type'

export default defineComponent({
  name: 'charts',
  props: {
    options: {
      type: Object as PropType<ChartOption>,
      default: () => ({})
    }
  },
  setup(props) {
    let chart: EChartsType
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

    watch(mainMaximize, resizeChart)

    watch(isCollapse, () => {
      setTimeout(resizeChart, 300)
    })

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
