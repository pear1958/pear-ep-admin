<template>
  <el-progress :percentage="progress" v-bind="$attrs"></el-progress>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

const props = defineProps({
  // 进度条进度
  percentage: {
    type: Number,
    required: true
  },
  // 是否有动画效果
  isAnimate: {
    type: Boolean,
    default: false
  },
  // 动画时长(毫秒)
  time: {
    type: Number,
    default: 3000
  }
})

// 标识动画加载过程中改变的值
const progress = ref(0)

onMounted(() => {
  const { isAnimate, time, percentage } = props

  if (!isAnimate) return

  // 每百分之一需要执行多少秒
  const perCentiExecTime = Math.ceil(time / percentage)

  const timer = setInterval(() => {
    progress.value += 1
    if (progress.value >= percentage) clearInterval(timer)
  }, perCentiExecTime)
})
</script>
