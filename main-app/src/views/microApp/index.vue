<template>
  <div class="micro-app-container">
    <micro-app
      :name="microAppMeta.name"
      :url="microAppMeta.url"
      :baseroute="baseRoute"
      @created="handleCreated"
      @beforemount="handleBeforeMount"
      @mounted="handleMount"
      @unmount="handleUnmounted"
      @error="handleError"
      @datachange="handleDataChange"
      disablesandbox
      inline
      :data="microAppData"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import microApp from '@micro-zoe/micro-app'
import { EventCenterForMicroApp } from '@micro-zoe/micro-app'

// @ts-ignore 因为vite子应用关闭了沙箱，我们需要为子应用appname-vite创建EventCenterForMicroApp对象来实现数据通信
window.eventCenterForAppNameVite = new EventCenterForMicroApp('appname-vite')

defineOptions({
  name: ''
})

const microAppData = ref({ msg: '来自基座的数据' })

const route = useRoute()

// 从路由元信息中获取微应用配置
const microAppMeta: Recordable = route.meta.microApp || {}

console.log('microAppMeta', microAppMeta)

// 1.主应用中微应用的基础路由（ 如 /react-vite-19 ）
// 2.告诉微应用：“你在主应用中被挂载到了哪个路径下”
// 3.microApp 会自动将这个路径注入到微应用的 window.__MICRO_APP_BASE_ROUTE__ 变量中
// 4.微应用在初始化路由时，读取 window.__MICRO_APP_BASE_ROUTE__ 作为路由的 base
//（如 Vue Router 的 createWebHistory(base)），确保路由基于主应用的挂载路径工作
const baseRoute = route.path.split('/:')[0]

console.log('baseRoute', baseRoute)

const handleCreated = () => {
  console.log('child-vite 创建了')
}

function handleBeforeMount(): void {
  console.log('child-vite 即将被渲染')
}

const handleMount = () => {
  console.log('child-vite 已经渲染完成')

  setTimeout(() => {
    microAppData.value = { msg: '来自基座的新数据' }
  }, 2000)
}

const handleUnmounted = () => {
  console.log('child-vite 卸载了')
}

function handleError(): void {
  console.log('child-vite 加载出错了')
}

function handleDataChange(e: CustomEvent): void {
  console.log('来自子应用 child-vite 的数据:', e.detail.data)
}
</script>

<style lang="scss" scoped>
.micro-app-container {
  width: 100%;
  height: 100vh;
}
</style>
