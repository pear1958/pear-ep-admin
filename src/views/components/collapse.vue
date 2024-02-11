<template>
  <div class="bg-white dark:bg-dark p-4">
    <collapse v-model="openedValue">
      <collapse-item name="a" title="Consistency">
        <div>11111111111</div>
        <div>11111111111</div>
        <div>11111111111</div>
      </collapse-item>

      <collapse-item name="b" title="Feedback">
        <div>2222222222222</div>
        <div>2222222222222</div>
        <div>2222222222222</div>
      </collapse-item>

      <collapse-item name="c" title="Efficiency" disabled>
        <div>33333333333333</div>
        <div>33333333333333</div>
        <div>33333333333333</div>
      </collapse-item>
    </collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import collapse from '@/components/collapse/collapse.vue'
import collapseItem from '@/components/collapse/collapseItem.vue'

const openedValue = ref(['a'])
</script>

<style lang="scss" scoped></style>
