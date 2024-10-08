<template>
  <div class="upload-box">
    <el-upload
      v-model:file-list="fileList"
      :list-type="listType"
      :action="uploadAction"
      :headers="uploadHeaders"
      :before-upload="beforeUpload"
      :on-success="handleSucess"
      :on-remove="handleRemove"
      :on-preview="handlePreview"
      :on-error="handleError"
      :multiple="multiple"
      :limit="limit"
      v-bind="$attrs"
      :class="{
        'hide-upload-btn': isMaxLimit
      }"
    >
      <el-icon v-if="listType === 'picture-card'">
        <Plus />
      </el-icon>

      <el-button type="primary" v-else>点击上传</el-button>
    </el-upload>

    <CropperDialog
      ref="cropperRef"
      v-if="enableCropper"
      :circle="cropperParams.circle"
      :options="cropperParams.options"
      :canvasWidth="cropperParams.canvasWidth"
      :canvasHeight="cropperParams.canvasHeight"
      @confirm="onCropperConfirm"
    />

    <ImgViewer v-model:visible="showViewer" :imgList="imgList" :initIndex="initIndex" />
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick, PropType, unref, computed, watch, Ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, UploadFile, UploadRawFile, UploadUserFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import './index.scss'
import { uploadUrl, uploadHeaders } from '@/config'
import { isNumber, isString } from 'pear-common-utils'
import { IUploadResult } from '@/api/types'
import { validSize } from './utils'
import CropperDialog from './CropperDialog.vue'
import { ICropperParams, IFile } from './types'

defineOptions({
  name: 'uploadCropper'
})

const props = defineProps({
  modelValue: {
    type: [String, Array], // string | array | null | undefined
    require: true
  },
  // v-model绑定值的格式
  format: {
    type: String,
    default: 'array' // string | array | jsonArray
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
    default: null
  },
  multiple: {
    type: Boolean,
    default: false
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
  cropperParams: {
    type: Object as PropType<ICropperParams>,
    default: () => ({}) as ICropperParams
  }
})

const emit = defineEmits(['update:modelValue', 'change'])

const uploadAction = import.meta.env.VITE_API_BASE_URL + uploadUrl

const cropperRef = ref()

const fileList: Ref<(IFile | UploadUserFile)[]> = ref([])
const isMaxLimit = ref(false)
const showViewer = ref(false)
const initIndex = ref(0)
const imgList = computed(() => {
  return unref(fileList).map(item => (item.response as IUploadResult)?.data?.url || item.url)
})

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
      newVal = []
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

      checkIsMaxLimit()
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
  if (!props.enableCropper) {
    if (props.multiple) {
      console.log('启用图片裁剪时, 不支持多选文件, 请将multiple设置为false')
      return false
    }

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
    unref(cropperRef).setUploadBase64(e.target?.result as string)
  }
  reader.onloadend = async () => {
    unref(cropperRef).openDialog()
    await nextTick()
    unref(cropperRef).initCropper()
  }
  return false
}

function checkIsMaxLimit() {
  if (isNumber(props.limit)) {
    isMaxLimit.value = unref(fileList).length >= props.limit ? true : false
  }
}

const emitData = () => {
  checkIsMaxLimit()

  let data: string | string[] = unref(fileList).map(item => {
    return (item.response as IUploadResult)?.data.url || item.url
  })

  if (props.format === 'string') {
    data = data.join(props.separator)
  }

  if (props.format === 'jsonArray') {
    data = JSON.stringify(data)
  }

  // console.log('--data--', data)

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

const router = useRouter()

const handlePreview = (file: IFile) => {
  if (props.listType === 'text') {
    const url = file.response?.data?.url || file.url
    const lastIndex = url.lastIndexOf('.')
    const suffix = url.slice(lastIndex)

    if (['.docx', '.doc'].includes(suffix)) {
      localStorage.setItem('wordUrl', url)
      return router.push('/able/checkWord')
    }

    if (suffix === '.xlsx') {
      localStorage.setItem('excelUrl', url)
      return router.push('/able/checkExcel')
    }

    return window.open(url, '_blank')
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

const onCropperConfirm = (file: { name: string; url: string }) => {
  unref(fileList).push(file)
  emitData()
}
</script>
