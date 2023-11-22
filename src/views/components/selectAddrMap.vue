<template>
  <div class="bg-white p-4">
    <mapAddrDrawer />

    <el-button @click="openDrawer">点击打开</el-button>
  </div>
</template>

<script setup lang="ts">
import { mapAddrDrawer } from '@/components'

defineOptions({
  name: 'selectAddrMap'
})

const visible = ref(false)

const openDrawer = () => {
  visible.value = true
}
</script>

<style lang="scss" scoped></style>
