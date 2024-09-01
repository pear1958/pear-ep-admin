<template>
  <div id="mapDiv" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import cesiumUtils from '@/utils/map/cesium'

const utils = new cesiumUtils()

defineOptions({
  name: 'CesiumIndex'
})

onMounted(() => {
  utils.initMap('mapDiv')
})
</script>

<style lang="scss" scoped></style>
