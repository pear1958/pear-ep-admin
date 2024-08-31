<template>
  <div class="loading-box" :class="size">
    <span class="dot dot-spin">
      <i></i>
      <i></i>
      <i></i>
      <i></i>
    </span>
  </div>
</template>

<script setup lang="ts">
import { PropType } from 'vue'

defineOptions({
  name: 'Loading'
})

export type LoadingSize = 'small' | 'default' | 'large'

defineProps({
  size: {
    type: String as PropType<LoadingSize>,
    default: 'default'
  }
})
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
