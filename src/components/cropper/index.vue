<template>
  <div class="upload-box">
    <el-upload
      v-model:file-list="fileList"
      :list-type="listType"
      :action="uploadAction"
      :before-upload="beforeUpload"
      :on-success="handleSucess"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :on-error="handleError"
      :limit="limit"
      v-bind="$attrs"
      :class="{
        'hide-upload-btn': isMaxLimit
      }"
    >
      <el-icon>
        <Plus />
      </el-icon>
    </el-upload>

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
              <template v-else>图像大小：{{ imgData.width }} x {{ imgData.height }} 像素</template>
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

    <img-viewer v-model:visible="showViewer" :imgList="imgList" :initIndex="initIndex" />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, PropType, unref, computed, watch, Ref } from 'vue'
import { ElMessage, UploadFile, UploadRawFile, UploadUserFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import Cropper from 'cropperjs'
import './index.scss'
import { debounce } from '@/utils'
import { downloadByBase64 } from '@/utils/file'
import { uploadFile } from '@/api/modules/common'
import { uploadUrl } from '@/config'
import { isString } from '@/utils/is'
import { IUploadResult } from '@/api/types'
import { getRoundedCanvas, validSize } from './utils'

// 常用需求
// 1.指定比例, 可以缩放图片大小进行裁剪, 比如头像 背景图
// 2.指定裁剪框的宽高, 裁剪出指定 px 的图片

defineOptions({
  name: 'uploadCropper'
})

const emit = defineEmits(['update:modelValue', 'change'])

const props = defineProps({
  modelValue: {
    type: [String, Array], // string | array | null | undefined
    require: true
  },
  // v-model绑定值的格式
  format: {
    type: String,
    default: 'string' // string | array | jsonArray
  },
  // format为string时的分隔符
  separator: {
    type: String,
    default: ','
  },
  listType: {
    type: String as PropType<'picture' | 'text' | 'picture-card'>,
    default: 'picture-card'
  },
  limit: {
    type: Number,
    default: 1
  },
  fileType: {
    type: String as PropType<'img' | 'file' | 'video'>,
    default: 'img'
  },
  // 上传前需要效验的类型
  typeList: {
    type: Array,
    default: () => []
  },
  // 效验指定宽高的图片
  imgSize: {
    type: Array as PropType<number[]>,
    default: () => []
  },
  // 效验指定宽高比的图片
  ratioList: {
    type: Array as PropType<number[]>,
    default: () => []
  },
  enableCropper: {
    type: Boolean,
    default: false
  },
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

type IFile = UploadFile & { response: IUploadResult }

const uploadAction = `${import.meta.env.VITE_API_BASE_URL}/${uploadUrl}`

const fileList: Ref<(IFile | UploadUserFile)[]> = ref([])
const isMaxLimit = ref(false)
const showViewer = ref(false)
const initIndex = ref(0)
const imgList = computed(() => unref(fileList).map(item => item.url))

watch(
  () => props.modelValue,
  newVal => {
    // 默认处理成数组的格式
    if (props.format === 'string' && isString(newVal) && newVal.length) {
      newVal = newVal.split(props.separator)
    }

    if (props.format === 'jsonArray' && isString(newVal) && newVal.length) {
      try {
        newVal = JSON.parse(newVal)
      } catch (e) {
        newVal = []
      }
    }

    // 新增 v-model 绑定的值可能为 null | undefined
    if (!Array.isArray(newVal) || !newVal.length) {
      fileList.value = [] // 新增时清空数据
      isMaxLimit.value = false
      return
    }

    // 编辑时回填数据
    if (!unref(fileList).length) {
      fileList.value = (newVal as string[]).map(url => ({
        name: url.slice(url.lastIndexOf('/') + 1), // fileName
        url
      }))
    }
  },
  {
    deep: true,
    immediate: true
  }
)

const tip = computed(() => {
  const obj = {
    img: '图片',
    file: '文件',
    video: '视频'
  }
  const typeCn = obj[props.fileType]
  return `不是 ${props.typeList.join(', ')} 类型的${typeCn}, 请上传正确的${typeCn}类型`
})

const beforeUpload = async (file: UploadRawFile) => {
  // console.log('file', file)

  if (!props.enableCropper) {
    // 效验文件类型
    if (props.typeList.length) {
      const fileName = file.name
      const suffix = fileName.substring(fileName.lastIndexOf('.'))

      if (!props.typeList.includes(suffix)) {
        ElMessage.warning(tip.value)
        return false
      }
    }

    // 效验图片宽高  具体尺寸 | 比例
    if (props.imgSize.length || props.ratioList.length === 2) {
      const valid = await validSize(props, file)
      return valid
    }

    return true
  }

  const reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = e => {
    // 显示需要裁剪的图片
    uploadBase64.value = e.target?.result as string
  }
  reader.onloadend = async () => {
    dialogVisible.value = true
    await nextTick()
    initCropper()
  }
  return false
}

const emitData = () => {
  isMaxLimit.value = unref(fileList).length >= props.limit ? true : false

  let data: string | string[] = unref(fileList).map(item => {
    return (item.response as IUploadResult).data.url
  })

  if (props.format === 'string') {
    data = data.join(props.separator)
  }

  if (props.format === 'jsonArray') {
    data = JSON.stringify(data)
  }

  console.log('--data--', data)

  emit('update:modelValue', data)
  emit('change', data)
}

const handleSucess = (res: IUploadResult, uploadFile: UploadFile) => {
  console.log('res', res)

  if (!String(res?.code).startsWith('2')) {
    ElMessage.error(res.msg || '服务器开小差了, 请稍后再试')

    unref(fileList).forEach((item, index) => {
      if (item.uid === uploadFile.uid) {
        unref(fileList).splice(index, 1)
      }
    })

    return
  }

  emitData()
}

const handleRemove = () => {
  emitData()
}

const handlePreview = (file: IFile) => {
  if (props.listType === 'text') {
    return window.open(file.response.data.url, '_blank')
  }

  unref(fileList).forEach((item, index) => {
    if (item.uid === file.uid) {
      initIndex.value = index
    }
  })

  showViewer.value = true
}

const handleError = (err: Error) => {
  console.log('err', err)
  ElMessage.error('上传失败, 服务器开小差了')
}

// ----------------------- 图片裁剪相关逻辑 -------------------------

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
      aspectRatio: 1, // 若规定了, 则裁剪框的比例将和此一样, X Y 将不能随意缩放
      viewMode: 2, // 将裁剪框限制为不超过画布的大小, 图片只能放大不能缩小
      autoCropArea: 1 // 定义自动裁剪区域大小 百分比 介于 0 和 1 之间的数字
    },
    props.options
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

    unref(fileList).push({
      name: data.name,
      url: data.url
    })

    handleClose()
  } finally {
    loading.value = false
  }
}
</script>
