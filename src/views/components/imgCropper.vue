<template>
  <div>
    <imgCropper @change="onChange" @error="onError" />

    <div v-if="imgData" class="mt-1 w-[500px]">
      <div class="h-[350px]">
        <el-image v-if="base64Url" :src="base64Url" fit="contain" />
      </div>
      <p class="text-center">图像大小：{{ imgData.width }} × {{ imgData.height }}像素</p>
      <p class="text-center mt-[3px]">
        文件大小：{{ imgData.size / 1000 + 'KB' }} ({{ imgData.size }} 字节)
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import imgCropper from '@/components/imgCropper.vue'

const base64Url = ref('')
const imgData = ref()

const onChange = data => {
  console.log('onChange', data)
  base64Url.value = data.base64Url
  imgData.value = data.imgData
}

const onError = data => {
  console.log('onError', data)
}
</script>

<style lang="scss" scoped></style>
