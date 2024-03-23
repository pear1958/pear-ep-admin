<template>
  <div>
    <!-- 1280 x 720 circle -->
    <cropper :src="picture" @change="onChange" @error="onError" @ready="showImg = true" />

    <div v-if="imgData" class="mt-3 w-[400px]">
      <div class="h-[280px] flex-c" v-if="showImg">
        <el-image v-if="base64Url" :src="base64Url" fit="contain" />
      </div>
      <!-- <p class="text-center">
        图像大小：{{ parseInt(imgData.width) }} x {{ parseInt(imgData.height) }} 像素
      </p> -->
      <p class="text-center mt-[3px]">
        文件大小：{{ (imgData.size / 1000).toFixed(2) + 'KB' }} ({{ imgData.size }} 字节)
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import cropper from '@/components/cropper/index.vue'
import picture from '@/assets/imgs/picture.jpg'
// import picture from '@/assets/imgs/bg-x.jpg'
// import picture from '@/assets/imgs/avatar.jpg'

const base64Url = ref('')
const imgData = ref()
const showImg = ref(false)

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
