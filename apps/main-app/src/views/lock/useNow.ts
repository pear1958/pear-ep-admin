import { onMounted, onUnmounted, reactive, toRefs } from 'vue'
import dayjs from 'dayjs'

export function useNow() {
  let timer: IntervalHandle

  const state = reactive({
    year: 0,
    month: 0,
    day: 0,
    hour: '',
    minute: '',
    second: 0,
    week: '',
    meridiem: ''
  })

  const update = () => {
    const now = dayjs()
    state.year = now.get('y')
    state.month = now.get('M') + 1
    state.day = now.get('date')
    state.hour = now.format('HH')
    state.minute = now.format('mm')
    state.second = now.get('s')
    state.week = '星期' + ['日', '一', '二', '三', '四', '五', '六'][now.day()]
    state.meridiem = now.format('A')
  }

  const start = () => {
    update()
    clearInterval(timer)
    timer = setInterval(() => update(), 1000)
  }

  const stop = () => clearInterval(timer)

  onMounted(() => start())

  onUnmounted(() => stop())

  return {
    ...toRefs(state),
    start,
    stop
  }
}
