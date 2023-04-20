<template>
  <el-drawer v-model="showDrawer" title="I am the title">
    <span>Hi, there!</span>
  </el-drawer>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import emitter from '@/utils/mitt'

const showDrawer = ref(false)

emitter.on('openSetDrawer', () => {
  showDrawer.value = true
})
</script>

<style lang="scss" scoped></style>
