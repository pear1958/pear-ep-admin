<template>
  <div class="footer flex-c">
    <a href="https://github.com/pear1958/pear-ep-admin" target="_blank">
      Copyright 2023-2033 All rights reserved | Pear-Ep-Admin 版权所有
    </a>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Footer'
})
</script>

<style lang="scss" scoped>
.footer {
  height: $footerHeight;
  background-color: var(--el-bg-color);
  border-top: 1px solid var(--el-border-color-light);

  a {
    font-size: 12px;
    color: var(--el-text-color-secondary);
    text-decoration: none;
    letter-spacing: 0.5px;
  }
}
</style>
