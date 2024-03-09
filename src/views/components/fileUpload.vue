<template>
  <div class="page-box bg-white dark:bg-dark p-4">
    <upload
      v-model:file-list="fileList"
      v-model:active-index="activeIndex"
      :action="uploadUrl"
      :before-upload="beforeUpload"
      :on-change="onChange"
      :on-success="onSuccess"
      :on-error="onError"
      :headers="uploadHeaders"
      showReplace
      showActive
    />
  </div>
</template>

<script setup lang="ts">
import { Ref, ref, unref } from 'vue'
import { ElMessage } from 'element-plus'
import { AxiosError } from 'axios'
import upload from '@/components/upload/index.vue'
import type { UploadFile } from '@/components/upload/types'
import { uploadUrl, uploadHeaders } from '@/config'

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

const onChange = (file: UploadFile) => {
  console.log('onFileChange-size', file.size! / 1024)
}

const onSuccess = (data: Recordable | any, file: UploadFile) => {
  if (!String(data?.code).startsWith('200')) {
    ElMessage.error(data?.msg || '上传失败')
    fileList.value = unref(fileList).filter(item => item.uid !== file.uid)
  }
}

const onError = (err: AxiosError, file: UploadFile) => {
  ElMessage.error('上传失败')
  fileList.value = unref(fileList).filter(item => item.uid !== file.uid)
}
</script>

<style lang="scss" scoped>
.page-box {
  width: 100%;
  height: 700px;
}
</style>
