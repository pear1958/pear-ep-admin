<template>
  <div class="bg-white dark:bg-dark p-4">
    <el-button @click="visible = true" type="primary">打开Drawer</el-button>

    <gk-drawer v-model="visible" title="抽屉组件">
      <template #title>
        <h4>这是一段标题</h4>
      </template>

      <div v-for="item in 120">这是一段内容</div>
      <div>底部内容</div>

      <template #footer>
        <el-button @click="visible = false">取消</el-button>
        <el-button type="primary" @click="visible = false">确定</el-button>
      </template>
    </gk-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import gkDrawer from '@/components/gkDrawer/index.vue'

const visible = ref(false)
</script>

<style lang="scss" scoped></style>
