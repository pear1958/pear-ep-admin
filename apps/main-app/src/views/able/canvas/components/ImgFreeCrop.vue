<template>
  <div class="image-cropper">
    <!-- 图片上传区域 -->
    <div class="upload-section">
      <input type="file" @change="handleFileUpload" accept="image/*" />
      <canvas ref="canvasRef"></canvas>
    </div>

    <!-- 裁剪控制面板 -->
    <div class="controls">
      <div class="control-group">
        <label>
          起点X:
          <input type="number" v-model.number="cropX" min="0" />
        </label>
        <label>
          起点Y:
          <input type="number" v-model.number="cropY" min="0" />
        </label>
        <label>
          宽度:
          <input type="number" v-model.number="cropWidth" min="1" />
        </label>
        <label>
          高度:
          <input type="number" v-model.number="cropHeight" min="1" />
        </label>
      </div>
      <button @click="cropImage">裁剪图片</button>
      <button @click="download">下载结果</button>
    </div>

    <!-- 预览区域 -->
    <div class="preview" v-if="croppedImage">
      <img :src="croppedImage" />
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'

const canvasRef = ref(null)
const cropX = ref(0)
const cropY = ref(0)
const cropWidth = ref(200)
const cropHeight = ref(200)
const croppedImage = ref(null)
let ctx = null
let image = null

// 初始化Canvas
const initCanvas = img => {
  const canvas = canvasRef.value
  const ratio = window.devicePixelRatio || 1
  const maxWidth = 800

  // 计算缩放比例
  const scale = img.width > maxWidth ? maxWidth / img.width : 1
  canvas.width = img.width * scale * ratio
  canvas.height = img.height * scale * ratio
  canvas.style.width = `${img.width * scale}px`
  canvas.style.height = `${img.height * scale}px`

  ctx = canvas.getContext('2d')
  ctx.scale(ratio * scale, ratio * scale)
  ctx.drawImage(img, 0, 0)
}

// 文件上传处理
const handleFileUpload = e => {
  const file = e.target.files[0]
  if (!file) return

  const reader = new FileReader()
  reader.onload = event => {
    image = new Image()
    image.onload = () => initCanvas(image)
    image.src = event.target.result
  }
  reader.readAsDataURL(file)
}

// 实时绘制裁剪区域
watchEffect(() => {
  if (!ctx || !image) return

  // 重绘原始图片
  ctx.clearRect(0, 0, canvasRef.value.width, canvasRef.value.height)
  ctx.drawImage(image, 0, 0)

  // 绘制裁剪框
  ctx.strokeStyle = '#ff0000'
  ctx.lineWidth = 2
  ctx.setLineDash([5, 3])
  ctx.strokeRect(cropX.value, cropY.value, cropWidth.value, cropHeight.value)
})

// 执行裁剪
const cropImage = () => {
  if (!image) return

  // 创建离屏Canvas
  const offscreen = document.createElement('canvas')
  const offscreenCtx = offscreen.getContext('2d')

  // 设置尺寸
  offscreen.width = cropWidth.value
  offscreen.height = cropHeight.value

  // 执行裁剪绘制
  offscreenCtx.drawImage(
    image,
    cropX.value,
    cropY.value, // 源图像裁剪起点
    cropWidth.value,
    cropHeight.value, // 源图像裁剪尺寸
    0,
    0, // 目标Canvas起点
    cropWidth.value,
    cropHeight.value // 目标Canvas尺寸
  )

  croppedImage.value = offscreen.toDataURL('image/png')
}

// 下载结果
const download = () => {
  const link = document.createElement('a')
  link.download = 'cropped-image.png'
  link.href = croppedImage.value
  link.click()
}
</script>

<style scoped>
.image-cropper {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 1000px;
  margin: 0 auto;
}

canvas {
  border: 1px solid #ccc;
  margin-top: 10px;
}

.controls {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  align-items: center;
}

.control-group {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

label {
  display: flex;
  flex-direction: column;
  font-size: 0.9em;
}

input[type='number'] {
  width: 80px;
  padding: 5px;
}

button {
  padding: 8px 15px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}

.preview img {
  max-width: 300px;
  border: 2px solid #ddd;
}
</style>
