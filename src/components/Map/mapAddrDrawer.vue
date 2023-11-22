<template>
  <Drawer v-model="visible" @update:modelValue="updateVisible">
    <div>11111</div>
  </Drawer>
</template>

<script setup lang="ts">
import AMapLoader from '@amap/amap-jsapi-loader'
import { Drawer } from '@/components'

defineOptions({
  name: 'mapAddrDrawer'
})

const props = defineProps({
  visible: {
    type: Boolean,
    required: true
  }
})

const emit = defineEmits<{
  (e: 'update:visible', val: boolean): void
}>()

const updateVisible = (val: boolean) => {
  emit('update:visible', val)
}
</script>

<style lang="scss" scoped></style>
