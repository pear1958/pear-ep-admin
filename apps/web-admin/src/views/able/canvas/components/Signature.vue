<template>
  <div class="signature-container">
    <canvas
      ref="canvasRef"
      class="signature-pad"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      @touchstart.passive="startDrawing"
      @touchmove.passive="draw"
      @touchend="stopDrawing"
    ></canvas>

    <div class="controls">
      <button @click="clearCanvas">清除</button>
      <button @click="saveAsPNG">导出PNG</button>
      <label>
        颜色：
        <input type="color" v-model="penColor" />
      </label>
      <label>
        粗细：
        <input type="range" v-model="penSize" min="1" max="20" />
      </label>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'

const canvasRef = ref(null)
const isDrawing = ref(false)
const lastX = ref(0)
const lastY = ref(0)
const penColor = ref('#000000')
const penSize = ref(2)
let ctx: CanvasRenderingContext2D = null

// 初始化画布
onMounted(() => {
  const canvas = canvasRef.value as HTMLCanvasElement
  ctx = canvas.getContext('2d')

  // 高清屏适配
  const ratio = window.devicePixelRatio || 1
  const { width, height } = canvas.getBoundingClientRect()

  canvas.width = width * ratio
  canvas.height = height * ratio
  canvas.style.width = `${width}px`
  canvas.style.height = `${height}px`
  ctx.scale(ratio, ratio)

  // 初始化画笔样式
  updatePenStyle()
})

// 更新画笔样式
function updatePenStyle() {
  ctx.strokeStyle = penColor.value
  ctx.lineWidth = penSize.value
  ctx.lineCap = 'round'
  ctx.lineJoin = 'round'
}

// 开始绘制
function startDrawing(e) {
  isDrawing.value = true
  const pos = getCursorPos(e)
  // 记录起点
  lastX.value = pos.x
  lastY.value = pos.y
}

// 绘制过程
function draw(e) {
  if (!isDrawing.value) return
  e.preventDefault()

  updatePenStyle()
  const pos = getCursorPos(e)

  ctx.beginPath()
  // 笔移动到开始绘制的起点
  ctx.moveTo(lastX.value, lastY.value)
  // 当前的点
  ctx.lineTo(pos.x, pos.y)
  ctx.stroke()

  lastX.value = pos.x
  lastY.value = pos.y
}

// 停止绘制
function stopDrawing() {
  isDrawing.value = false
}

// 获取坐标
function getCursorPos(e) {
  const canvas = canvasRef.value
  const rect = canvas.getBoundingClientRect()
  let x, y

  if (e.touches) {
    x = e.touches[0].clientX - rect.left
    y = e.touches[0].clientY - rect.top
  } else {
    x = e.clientX - rect.left
    y = e.clientY - rect.top
  }

  return { x, y }
}

// 清除画布
function clearCanvas() {
  const canvas = canvasRef.value
  ctx.clearRect(0, 0, canvas.width, canvas.height)
}

// 导出图片
function saveAsPNG() {
  const canvas = canvasRef.value
  const link = document.createElement('a')
  link.download = 'signature.png'
  link.href = canvas.toDataURL('image/png')
  link.click()
}
</script>

<style scoped>
.signature-container {
  display: inline-block;
  border: 2px solid #ccc;
  border-radius: 4px;
  padding: 10px;
}

.signature-pad {
  width: 600px;
  height: 300px;
  touch-action: none;
  background: white;
}

.controls {
  margin-top: 10px;
  display: flex;
  gap: 15px;
  align-items: center;
}

button {
  padding: 6px 12px;
  cursor: pointer;
  background: #f0f0f0;
  border: 1px solid #ccc;
  border-radius: 4px;
}

button:hover {
  background: #e0e0e0;
}

label {
  display: flex;
  align-items: center;
  gap: 5px;
}
</style>
