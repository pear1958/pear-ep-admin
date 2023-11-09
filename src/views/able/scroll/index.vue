<template>
  <div class="test">
    <el-button @click="visible = true" type="primary">打开Drawer</el-button>

    <com-drawer v-model="visible" title="抽屉组件">
      <template #title>
        <h4>标题觉得我啊</h4>
      </template>

      <div>这是一段内容</div>
    </com-drawer>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import ComDrawer from '@/components/comDrawer.vue'

const visible = ref(false)
</script>

<style lang="scss" scoped></style>
