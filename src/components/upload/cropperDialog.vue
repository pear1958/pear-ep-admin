<template>
  <div>
    <el-dialog
      v-model="dialogVisible"
      title="图片裁剪"
      :width="1000"
      draggable
      :before-close="handleClose"
    >
      <div class="flex justify-center gap-12">
        <div class="w-[400px]">
          <div :class="{ circle }" class="w-[400px] h-[280px]">
            <img :src="uploadBase64" ref="imgRef" class="native-img" v-show="isReady" />
          </div>

          <div class="mt-5 flex-c flex-wrap gap-y-3" v-show="isReady">
            <el-button @click="handleOper('scaleX')">水平翻转</el-button>
            <el-button @click="handleOper('scaleY')">垂直翻转</el-button>
            <el-button @click="handleOper('rotate', 45)">顺时针旋转</el-button>
            <el-button @click="handleOper('rotate', -45)">逆时针旋转</el-button>
            <el-button @click="handleOper('reset')">重置</el-button>
            <el-button @click="downloadByBase64(cropperBase64, 'cropper.png')">下载</el-button>
          </div>
        </div>

        <div>
          <div class="w-[400px] h-[280px] preview-img-box" v-show="isReady">
            <img :src="cropperBase64" class="w-full h-full object-contain" v-if="cropperBase64" />
          </div>

          <template v-if="imgData">
            <div class="text-center mt-5">
              <template v-if="canvasWidth && canvasHeight">
                图像大小：{{ canvasWidth }} x {{ canvasHeight }} 像素
              </template>
              <template v-else>
                图像大小：{{ Math.round(imgData.width) }} x {{ Math.round(imgData.height) }} 像素
              </template>
            </div>

            <div class="text-center mt-3">
              文件大小：{{ (imgData.size / 1000).toFixed(2) + 'KB' }} ({{ imgData.size }} 字节)
            </div>
          </template>
        </div>
      </div>

      <template #footer>
        <div>
          <el-button @click="handleClose">取消</el-button>
          <el-button type="primary" @click="handleOk" :loading="loading">确认上传</el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { PropType, ref, unref } from 'vue'
import Cropper from 'cropperjs'
import { uploadFile } from '@/api/modules/common'
import { debounce } from '@/utils'
import { downloadByBase64 } from '@/utils/file'
import { getRoundedCanvas } from './utils'

// 常用需求
// 1.指定比例, 可以缩放图片大小进行裁剪, 比如头像 背景图
// 2.指定裁剪框的宽高, 裁剪出指定 px 的图片

defineOptions({
  name: 'cropperDialog'
})

const props = defineProps({
  // 是否是圆形裁剪框
  circle: {
    type: Boolean,
    default: false
  },
  // cropperJs - options
  options: {
    type: Object as PropType<Cropper.Options>,
    default: () => ({})
  },
  // 指定需要生成的图片宽度
  canvasWidth: {
    type: Number,
    require: false
  },
  // 指定需要生成的图片高度
  canvasHeight: {
    type: Number,
    require: false
  }
})

const emit = defineEmits(['confirm'])

type ImgData = Cropper.Data & { size: number }

const uploadBase64 = ref()
const cropperBase64 = ref()
const cropperBlob = ref()
const imgData = ref<ImgData>()

const dialogVisible = ref(false)
const cropper = ref<Cropper>()
const imgRef = ref()
const isReady = ref(false)

const initCropper = () => {
  if (!imgRef.value) return

  const options = Object.assign(
    {
      // aspectRatio: 1, // 若规定了, 则裁剪框的比例将和此一样, X Y 将不能随意缩放
      viewMode: 2, // 将裁剪框限制为不超过画布的大小, 图片只能放大不能缩小
      autoCropArea: 1 // 定义自动裁剪区域大小 百分比 介于 0 和 1 之间的数字
    },
    props.options || {}
  ) as Cropper.Options

  if (props.canvasWidth && props.canvasHeight) {
    options.aspectRatio = props.canvasWidth / props.canvasHeight
  }

  cropper.value = new Cropper(imgRef.value, {
    ...options,
    ready() {
      isReady.value = true
      handleCroped()
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

  let options = {}

  // 裁剪出指定的宽高
  if (props.canvasWidth && props.canvasHeight) {
    options = {
      width: props.canvasWidth,
      height: props.canvasHeight
    }
  }

  let canvas = unref(cropper).getCroppedCanvas(options)

  if (props.circle) {
    canvas = getRoundedCanvas(canvas)
  }

  // https://developer.mozilla.org/zh-CN/docs/Web/API/HTMLCanvasElement/toBlob
  canvas.toBlob(blob => {
    if (!blob) return
    cropperBlob.value = blob
    const fileReader: FileReader = new FileReader()
    fileReader.readAsDataURL(blob)
    fileReader.onloadend = e => {
      if (!e.target?.result || !blob) return
      cropperBase64.value = e.target.result as string
      imgData.value = { size: blob.size, ...unref(cropper).getData() }
    }
  })
}

let scaleX = 1
let scaleY = 1

const handleOper = (eventName: string, arg?: number | number[]) => {
  if (eventName === 'scaleX') {
    arg = scaleX = scaleX === 1 ? -1 : 1
  }

  if (eventName === 'scaleY') {
    arg = scaleY = scaleY === 1 ? -1 : 1
  }

  unref(cropper)[eventName](arg)
}

const handleClose = () => {
  dialogVisible.value = false
  unref(cropper)?.destroy()
  isReady.value = false
  cropper.value = null
  uploadBase64.value = null
  cropperBase64.value = null
  cropperBlob.value = null
  scaleX = 1
  scaleY = 1
}

const loading = ref(false)

const handleOk = async () => {
  const formData = new FormData()
  const file = new File([cropperBlob.value], 'cropper.png')
  formData.append('file', file)

  loading.value = true

  try {
    const { data } = await uploadFile(formData)

    emit('confirm', {
      name: data.name,
      url: data.url
    })

    handleClose()
  } finally {
    loading.value = false
  }
}

const openDialog = () => {
  dialogVisible.value = true
}

const setUploadBase64 = (base64: string) => {
  uploadBase64.value = base64
}

defineExpose({
  openDialog,
  setUploadBase64,
  initCropper
})
</script>
