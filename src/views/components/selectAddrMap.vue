<template>
  <div class="bg-white dark:bg-dark p-4">
    <el-button @click="openDrawer">点击打开</el-button>

    <div class="my-5">
      <div>数据: {{ mapData }}</div>
    </div>

    <mapAddrDrawer v-model:visible="visible" v-model:map-data="mapData" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { mapAddrDrawer } from '@/components'
import { IMapData } from '@/components/Map/mapAddrDrawer.vue'

defineOptions({
  name: 'selectAddrMap'
})

const visible = ref(false)

const mapData = ref(null)

// const mapData = ref({
//   addr: '四川省成都市武侯区桂溪街道天府三街中国建设银行(成都生产基地)',
//   lng: 104.058302,
//   lat: 30.546434
// })

const openDrawer = () => {
  visible.value = true
}
</script>

<style lang="scss" scoped></style>
