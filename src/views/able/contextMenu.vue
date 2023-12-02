<template>
  <div class="bg-white dark:bg-dark p-4 cursor-pointer">
    <div>右键菜单</div>

    <div class="flex-c mt-4 box" v-contextmenu:contextmenu>
      <span>右键点击此区域</span>
    </div>

    <contextmenu ref="contextmenu">
      <contextmenu-item @click="onClick">菜单1</contextmenu-item>
      <contextmenu-divider />
      <contextmenu-item>菜单2</contextmenu-item>
      <contextmenu-item>菜单3</contextmenu-item>
    </contextmenu>
  </div>
</template>

<script setup lang="ts">
import { directive, Contextmenu, ContextmenuItem, ContextmenuDivider } from 'v-contextmenu'
import 'v-contextmenu/dist/themes/default.css'

const vContextmenu = {
  ...directive
}

const onClick = () => {
  console.log('click')
}
</script>

<style lang="scss" scoped>
.box {
  width: 300px;
  height: 200px;
  border: 1px dashed var(--el-color-primary);
  border-radius: 8px;
}
</style>
