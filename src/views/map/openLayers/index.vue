<template>
  <div id="mapDiv" class="w-full h-full"></div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import ol_utils from '@/utils/map/ol'

const olUtils = new ol_utils()

defineOptions({
  name: 'OpenLayersIndex'
})

onMounted(() => {
  olUtils.initMap('mapDiv')
})
</script>

<style lang="scss" scoped></style>
