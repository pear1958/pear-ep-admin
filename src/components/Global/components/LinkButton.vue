<template>
  <span class="link-btn" :style="{ color, fontSize: size + 'px' }">
    <slot />
  </span>
</template>

<script setup lang="ts">
defineOptions({
  name: 'LinkButton'
})

defineProps({
  color: {
    type: String,
    default: ''
  },
  size: {
    type: Number,
    default: 14
  }
})
</script>

<style lang="scss" scoped>
.link-btn {
  @apply text-base-color cursor-pointer transition-colors;

  &:hover {
    color: var(--el-color-primary) !important;
  }
}
</style>
