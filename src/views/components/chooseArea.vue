<template>
  <div class="bg-white dark:bg-dark p-4">
    <ChooseArea @change="onChange" />
  </div>
</template>

<script setup lang="ts">
import ChooseArea from '@/components/ChooseArea/index.vue'

function onChange(params: any) {
  console.log('params', params)
}
</script>

<style lang="scss" scoped></style>
