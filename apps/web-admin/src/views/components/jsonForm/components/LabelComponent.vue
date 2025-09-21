<template>
  <div class="flex-c">
    <span>自定义标签</span>
    <el-tooltip content="这是一段描述" placement="top">
      <Icon icon="ep:question-filled" class="cursor-pointer ml-0.5" />
    </el-tooltip>
    <span>：</span>
  </div>
</template>

<script lang="ts" setup>
import { Icon } from '@iconify/vue'
</script>

<style lang="scss" scoped></style>
