<template>
  <div>
    <div>角色管理 - iconify</div>
    <div class="test">
      <!-- <Icon :icon="verticalLeftOutlined" /> -->
      <IconifyOffline icon="vertical-left-outlined" />
      <el-button type="primary" :icon="useIcon('vertical-left-outlined', { color: 'red' })">切换角色</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useIcon } from '@/components/Icon/src/useIcon'
</script>

<style lang="scss" scoped>
.test {
  color: yellow;
  font-size: 30px;
}
</style>
