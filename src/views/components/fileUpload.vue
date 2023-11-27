<template>
  <div class="page-box bg-white p-4">
    <Upload
      v-model:file-list="fileList"
      v-model:active-index="activeIndex"
      action="/dev-api/sourceData/document/uploadFile"
      :before-upload="beforeUpload"
      :on-change="onFileChange"
    />
  </div>
</template>

<script setup lang="ts">
import { Ref, ref } from 'vue'
import { Upload } from '@/components'
import { UploadFile } from '@/components/Upload/types'

// const fileList: Ref<UploadFile[]> = ref([
//   { name: '111', src: 'https://t7.baidu.com/it/u=4198287529,2774471735&fm=193&f=GIF' }
// ])

const fileList: Ref<UploadFile[]> = ref([])

const activeIndex = ref(0)

const beforeUpload = (file: File) => {
  const size = file.size / 1024

  // console.log('beforeUpload-file-size', size)

  if (size > 12000) {
    console.log('file-to-big 超过了12M')
    return false
  }

  return true
}

const onFileChange = (file: UploadFile) => {
  console.log('onFileChange-size', file.size! / 1024)
}
</script>

<style lang="scss" scoped>
.page-box {
  width: 100%;
  height: 700px;
}
</style>
