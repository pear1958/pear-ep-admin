<template>
  <div>
    <!-- :canvas-width="200" :canvas-height="200" -->
    <upload v-model="form.imgList" format="array" />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import upload from '@/components/upload/index.vue'

const form = reactive({
  imgList: null
})
</script>

<style lang="scss" scoped></style>
