<template>
  <div class="bg-white dark:bg-dark p-4">
    <el-button type="primary" @click="toggle">打开对话框</el-button>

    <!-- <div class="mt-4">
      <el-button type="primary" @click="showDialog">函数式调用对话框</el-button>
    </div> -->

    <gk-dialog v-model:visible="visible" title="测试标题" :handleOk="handleOk" :cancel="cancel">
      <template v-slot:content>
        <p>第一行</p>
        <p>第二行</p>
      </template>
    </gk-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import gkDialog from '@/components/common/gkDialog/index.vue'
import openDialog from '@/components/common/gkDialog/openDialog'

const visible = ref(false)

const toggle = () => {
  visible.value = true
}

const handleOk = () => {
  console.log('确认')
  return true
}

const cancel = () => {
  console.log('取消')
}

const showDialog = () => {
  openDialog({
    title: '标题',
    content: '这里是内容',
    visible: true,
    handleOk: () => {
      console.log('确认')
    },
    cancel: () => {
      console.log('取消')
    }
  })
}
</script>

<style lang="scss" scoped></style>
