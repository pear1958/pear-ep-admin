<template>
  <div class="bg-white dark:bg-dark p-4">
    <div>国际化演示</div>
    <el-table mb-1 :data="[]" />
    <el-pagination :total="100" class="mt-15" />

    <el-button type="primary" class="mt-4" @click="mock403">403页面</el-button>
    <el-button type="primary" class="mt-4" @click="mock404">404页面</el-button>

    <el-button type="primary" class="mt-4" @click="debounceFn">测试防抖</el-button>
    <el-button type="primary" class="mt-4" @click="throttleFn">测试节流</el-button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { debounce, throttle } from '@/utils'
import microApp from '@micro-zoe/micro-app'

const router = useRouter()

const mock403 = () => {
  router.push('/able/mock403')
}

const mock404 = () => {
  router.push('/no-exist-path-1255')
}

function handleClick1() {
  console.log('test-test-1')
}

function handleClick2() {
  console.log('test-test-2')
}

const debounceFn = debounce(handleClick1, 1000)
const throttleFn = throttle(handleClick2, 1000)

onMounted(() => {
  console.log(microApp.getGlobalData())
})

// const handleFn = (event: any) => {
//   console.log(Math.random())
//   console.log(event)
// }
// // window.addEventListener('resize', debounce(handleFn, 1000))
// window.addEventListener('resize', throttle(handleFn, 1000))
</script>

<style lang="scss" scoped></style>
