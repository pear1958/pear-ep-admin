<template>
  <div class="upload-box">
    <div
      v-for="(item, index) in fileList"
      :key="item.uid"
      class="uploaded"
      :class="{ active: showActive && activeIndex == index }"
      @click="showActive && emit('update:activeIndex', index)"
    >
      <el-progress type="circle" :percentage="item.percent" v-if="['ready', 'uploading'].includes(item.status!)" />

      <template v-if="['success', undefined].includes(item.status!)">
        <img class="img" :src="item.src" />

        <div class="replace-box" @click.stop="handleReplace(index)" v-if="showReplace">替换图片</div>

        <div class="select-del-icon" @click.stop="handleRemove(index)" v-if="showActive && activeIndex == index">
          <!-- 红色背景, 白色叉叉的按钮 -->
          <iconify icon="close" />
        </div>

        <div class="hover-del-icon" v-if="index !== activeIndex" @click.stop="handleRemove(index)">
          <iconify icon="delete" />
        </div>

        <div class="hover-preview-icon" @click.stop="handlePreview(index)">
          <iconify icon="zoom-in" />
        </div>
      </template>

      <el-progress
        type="circle"
        :percentage="item.percent"
        status="exception"
        v-if="['error'].includes(item.status!)"
      />
    </div>

    <dragger :onFile="files => uploadFiles(files)" v-if="fileList.length < maxLength">
      <div class="upload" @click="handleClick">
        <iconify icon="plus" />
      </div>
    </dragger>

    <input
      class="file-input"
      style="display: none"
      ref="fileInputRef"
      @change="handleFileChange"
      type="file"
      :accept="accept"
      :multiple="false"
    />

    <img-viewer v-model:visible="showViewer" :imgList="imgList" :initIndex="initIndex" />
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, unref, computed } from 'vue'
import axios, { AxiosError, AxiosProgressEvent, AxiosResponse } from 'axios'
import dragger from './dragger.vue'
import { UploadFile } from './types'
import { deepClone } from '@/utils'

defineOptions({
  name: 'upload'
})

const props = defineProps({
  fileList: {
    type: Array as PropType<UploadFile[]>,
    default: []
  },
  // 上传的地址
  action: {
    type: String,
    require: true
  },
  // 当前选中图片的Index, 若 showActive 为false, 则不用传
  activeIndex: {
    type: Number
  },
  maxLength: {
    type: Number,
    default: 10
  },
  // 是否显示替换图片按钮
  showReplace: {
    type: Boolean,
    default: false
  },
  // 是否显示当前选中图片的样式
  showActive: {
    type: Boolean,
    default: false
  },
  // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者 Promise 则停止上传。
  beforeUpload: {
    type: Function as PropType<(file: File) => boolean | Promise<File>>
  },
  // 文件上传时的钩子
  onProgress: {
    type: Function as PropType<(percentage: number, file: UploadFile) => void>
  },
  // 文件上传成功时的钩子
  onSuccess: {
    type: Function as PropType<(data: any, file: UploadFile) => void>
  },
  // 文件上传失败时的钩子
  onError: {
    type: Function as PropType<(err: any, file: UploadFile) => void>
  },
  // 文件状态改变时的钩子，上传成功或者失败时都会被调用
  onChange: {
    type: Function as PropType<(file: UploadFile) => void>
  },
  // 文件列表移除文件时的钩子
  onRemove: {
    type: Function as PropType<(file: UploadFile) => void>
  },
  // 设置上传的请求头部
  headers: {
    type: Object
  },
  // 上传的文件字段名
  name: {
    type: String,
    default: 'file'
  },
  // 上传时附带的额外参数
  data: {
    type: Object
  },
  // 支持发送 cookie 凭证信息
  withCredentials: {
    type: Boolean,
    default: false
  },
  // 可选参数, 接受上传的文件类型
  accept: {
    type: String
  }
})

if (props.showActive && props.activeIndex == undefined) {
  console.error('未绑定activeIndex')
}

const showViewer = ref(false)
const initIndex = ref(0)
const imgList = computed(() => props.fileList.map(item => item.src))

const emit = defineEmits<{
  (e: 'update:fileList', list: UploadFile[]): void
  (e: 'update:activeIndex', index: number): void
}>()

let uploadType: 'add' | 'replace' = 'add'
let replaceIndex: number

const fileInputRef = ref()

// 触发文件上传
const handleClick = () => {
  unref(fileInputRef).click()
}

// 点选文件
const handleFileChange = (e: any) => {
  const files = e.target.files
  if (!files) return
  uploadFiles(files)
  unref(fileInputRef).value = ''
}

const uploadFiles = (files: FileList) => {
  const postFiles = Array.from(files)

  postFiles.forEach(file => {
    if (!props.beforeUpload) {
      post(file)
      return
    }
    const result = props.beforeUpload(file)
    if (!result) return
    if (result instanceof Promise) result.then(processedFile => post(processedFile))
    post(file)
  })
}

// 更新上传的 文件列表 中文件的状态
const updateFileList = (updateFile: UploadFile, updateObj: Partial<UploadFile>) => {
  const fileList = props.fileList.map((file: UploadFile) => {
    return file.uid === updateFile.uid ? { ...file, ...updateObj } : file
  })

  emit('update:fileList', fileList)
}

// 调用http上传文件
const post = (file: File) => {
  const _file: UploadFile = {
    uid: Date.now() + 'upload-file',
    name: file.name,
    size: file.size,
    percent: 0,
    status: 'ready',
    raw: file,
    src: '',
    response: null
  }

  const reader = new FileReader()

  reader.readAsDataURL(file)

  reader.onload = (res: ProgressEvent<FileReader>) => {
    const base64Url = res.target?.result as string
    _file.src = base64Url

    // console.log('_file', _file)

    const fileList = deepClone(props.fileList)

    if (uploadType == 'add') {
      fileList.push(_file)
    }

    if (uploadType == 'replace') {
      fileList[replaceIndex] = _file
    }

    emit('update:fileList', fileList)

    // 重置为初始值
    uploadType = 'add'

    const { name, data, action, headers, withCredentials, onProgress, onSuccess, onError, onChange } = props

    // console.log('headers', headers)

    const formData = new FormData()

    formData.append(name, file)

    if (data) Object.keys(data).forEach(key => formData.append(key, data[key]))

    axios
      .post(action as string, formData, {
        headers: {
          ...headers,
          'Content-Type': 'multipart/form-data'
        },
        // 是否默认携带本地cookie
        withCredentials,
        onUploadProgress: (event: AxiosProgressEvent) => {
          const percent = Math.round((event.loaded * 100) / (event.total as number)) || 0 // eg: 72

          // console.log('percent', percent)

          updateFileList(_file, { percent, status: 'uploading' })

          _file.status = 'uploading'
          _file.percent = percent

          onProgress && onProgress(percent, _file)
        }
      })
      .then((res: AxiosResponse) => {
        console.log('--成功--', res)

        updateFileList(_file, { status: 'success', response: res.data })

        _file.status = 'success'
        _file.response = res.data

        onSuccess && onSuccess(res.data, _file)
        onChange && onChange(_file)
      })
      .catch((err: AxiosError) => {
        console.log('err', err)

        updateFileList(_file, { status: 'error', error: err })

        _file.status = 'error'
        _file.error = err

        onError && onError(err, _file)
        onChange && onChange(_file)
      })
  }
}

const handleReplace = (index: number) => {
  replaceIndex = index
  uploadType = 'replace'
  handleClick()
}

const handleRemove = (index: number) => {
  const fileList = deepClone(props.fileList)

  if (props.showActive) {
    const isDelCurPrev = index < props.activeIndex!
    const isDelCurAndLast = Boolean(index == props.activeIndex && index == fileList.length - 1 && fileList[index - 1])

    if (isDelCurPrev || isDelCurAndLast) {
      let i = props.activeIndex!
      i--
      emit('update:activeIndex', i)
    }
  }

  const file = fileList.splice(index, 1)
  emit('update:fileList', fileList)
  props.onRemove && props.onRemove(file[0])
}

const handlePreview = (index: number) => {
  initIndex.value = index
  showViewer.value = true
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
