<template>
  <div class="bg-white dark:bg-dark p-4">
    <GkCollapse v-model="openedValue">
      <GkCollapseItem name="a" title="Consistency">
        <div>11111111111</div>
        <div>11111111111</div>
        <div>11111111111</div>
      </GkCollapseItem>

      <GkCollapseItem name="b" title="Feedback">
        <div>2222222222222</div>
        <div>2222222222222</div>
        <div>2222222222222</div>
      </GkCollapseItem>

      <GkCollapseItem name="c" title="Efficiency" disabled>
        <div>33333333333333</div>
        <div>33333333333333</div>
        <div>33333333333333</div>
      </GkCollapseItem>
    </GkCollapse>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import GkCollapse from '@/components/Common/GkCollapse/index.vue'
import GkCollapseItem from '@/components/Common/GkCollapse/CollapseItem.vue'

const openedValue = ref(['a'])
</script>

<style lang="scss" scoped></style>
