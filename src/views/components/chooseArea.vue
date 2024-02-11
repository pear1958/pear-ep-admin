<template>
  <div class="bg-white dark:bg-dark p-4">
    <choose-area @change="onChange" />
  </div>
</template>

<script setup lang="ts">
import chooseArea from '@/components/chooseArea/index.vue'

function onChange(params: any) {
  console.log('params', params)
}
</script>

<style lang="scss" scoped></style>
