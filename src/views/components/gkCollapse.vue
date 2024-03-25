<template>
  <div class="bg-white dark:bg-dark p-4">
    <gk-collapse v-model="openedValue">
      <gk-collapse-item name="a" title="Consistency">
        <div>11111111111</div>
        <div>11111111111</div>
        <div>11111111111</div>
      </gk-collapse-item>

      <gk-collapse-item name="b" title="Feedback">
        <div>2222222222222</div>
        <div>2222222222222</div>
        <div>2222222222222</div>
      </gk-collapse-item>

      <gk-collapse-item name="c" title="Efficiency" disabled>
        <div>33333333333333</div>
        <div>33333333333333</div>
        <div>33333333333333</div>
      </gk-collapse-item>
    </gk-collapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gkCollapse from '@/components/gkCollapse/collapse.vue'
import gkCollapseItem from '@/components/gkCollapse/collapseItem.vue'

const openedValue = ref(['a'])
</script>

<style lang="scss" scoped></style>
