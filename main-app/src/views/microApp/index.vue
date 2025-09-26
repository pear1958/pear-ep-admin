<template>
  <div class="micro-app-container">
    <micro-app :name="microAppMeta.name" :url="microAppMeta.url" :baseroute="baseRoute"></micro-app>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'

defineOptions({
  name: ''
})

const route = useRoute()

// 从路由元信息中获取微应用配置
const microAppMeta: Recordable = route.meta.microApp || {}

// 1.主应用中微应用的基础路由（ 如 /react-vite-19 ）
// 2.告诉微应用：“你在主应用中被挂载到了哪个路径下”
// 3.microApp 会自动将这个路径注入到微应用的 window.__MICRO_APP_BASE_ROUTE__ 变量中
// 4.微应用在初始化路由时，读取 window.__MICRO_APP_BASE_ROUTE__ 作为路由的 base
//（如 Vue Router 的 createWebHistory(base)），确保路由基于主应用的挂载路径工作
const baseRoute = route.path.split('/:')[0]
</script>

<style lang="scss" scoped></style>
