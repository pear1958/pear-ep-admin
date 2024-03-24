<template>
  <div>
    <!-- :canvas-width="200" :canvas-height="200" -->
    <uploadCropper />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import uploadCropper from '@/components/cropper/index.vue'
</script>

<style lang="scss" scoped></style>
