<template>
  <div>
    <div :class="{ circle }" class="w-[400px] h-[280px]">
      <img :src="src" ref="imgRef" class="img" v-show="isReady" />
    </div>

    <div class="mt-4 flex-c gap-y-2.5 flex-wrap">
      <el-button>上传图片</el-button>
      <el-button @click="handleOper('scaleX')">水平翻转</el-button>
      <el-button @click="handleOper('scaleY')">垂直翻转</el-button>
      <el-button @click="handleOper('rotate', 45)">顺时针旋转</el-button>
      <el-button @click="handleOper('rotate', -45)">逆时针旋转</el-button>
      <el-button @click="handleOper('reset')">重置</el-button>
      <el-button @click="handleDownload">下载</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, unref, onMounted, onUnmounted, PropType } from 'vue'
import Cropper from 'cropperjs'
import './index.scss'
import { downloadByBase64 } from '@/utils/file'
import { debounce } from '@/utils'

// 常用需求
// 1.指定比例, 可以缩放图片大小进行裁剪, 比如头像 背景图
// 2.指定裁剪框的宽高, 裁剪出指定 px 的图片

defineOptions({
  name: 'cropper'
})

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  circle: {
    type: Boolean,
    default: false
  },
  options: {
    type: Object as PropType<Cropper.Options>,
    default: () => ({})
  }
})

const emit = defineEmits(['change', 'error', 'ready'])

const imgRef = ref()
const cropper = ref<Cropper>()
const base64Url = ref()
const isReady = ref(false)

let scaleX = 1
let scaleY = 1

onMounted(() => {
  initCropper()
})

const initCropper = () => {
  if (!imgRef.value) return

  const options = Object.assign(
    {
      aspectRatio: 1, // 若规定了, 则裁剪框的比例将和此一样, X Y 将不能随意缩放
      viewMode: 2, // 将裁剪框限制为不超过画布的大小, 图片只能放大不能缩小
      autoCropArea: 1 // 定义自动裁剪区域大小 百分比 介于 0 和 1 之间的数字
    },
    props.options
  ) as Cropper.Options

  cropper.value = new Cropper(imgRef.value, {
    ...options,
    ready() {
      isReady.value = true
      handleCroped()
      setTimeout(() => {
        emit('ready', cropper.value)
      }, 400)
    },
    crop() {
      debounceHandleCroped()
    },
    zoom() {
      debounceHandleCroped()
    },
    cropmove() {
      debounceHandleCroped()
    }
  })
}

const debounceHandleCroped = debounce(handleCroped, 80)

function handleCroped() {
  if (!cropper.value) return

  let canvas = unref(cropper).getCroppedCanvas({
    width: 200,
    height: 200
  })

  if (props.circle) {
    canvas = getRoundedCanvas(canvas)
  }

  // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toBlob
  canvas.toBlob(blob => {
    if (!blob) return

    const fileReader: FileReader = new FileReader()

    fileReader.readAsDataURL(blob)

    fileReader.onloadend = e => {
      if (!e.target?.result || !blob) return

      base64Url.value = e.target.result

      emit('change', {
        base64Url: e.target.result,
        blob,
        imgData: { size: blob.size, ...unref(cropper).getData() }
      })
    }

    fileReader.onerror = () => {
      emit('error')
    }
  })
}

function getRoundedCanvas(sourceCanvas) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  const width = sourceCanvas.width
  const height = sourceCanvas.height
  canvas.width = width
  canvas.height = height
  context.imageSmoothingEnabled = true
  context.drawImage(sourceCanvas, 0, 0, width, height)
  context.globalCompositeOperation = 'destination-in'
  context.beginPath()
  context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
  context.fill()
  return canvas
}

const handleOper = (eventName: string, arg?: number | number[]) => {
  if (eventName === 'scaleX') {
    arg = scaleX = scaleX === 1 ? -1 : 1
  }

  if (eventName === 'scaleY') {
    arg = scaleY = scaleY === 1 ? -1 : 1
  }

  unref(cropper)[eventName](arg)
}

const handleDownload = () => {
  console.log('base64Url.value', base64Url.value)
  downloadByBase64(base64Url.value, 'cropping.png')
}

onUnmounted(() => {
  unref(cropper)?.destroy()
  isReady.value = false
  cropper.value = null
  base64Url.value = ''
  scaleX = 1
  scaleY = 1
})
</script>
