<template>
  <div v-loading="loading">
    <iframe
      :src="iframeSrc"
      class="w-full"
      frameborder="0"
      ref="iframeRef"
      :style="{ height: mainIsFull ? '100vh' : 'calc(100vh - 48px - 32px)' }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, unref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useSystemStore } from '@/store/modules/system'

defineOptions({
  name: 'iframeView'
})

onMounted(() => {
  unref(iframeRef)!.onload = () => {
    loading.value = false
  }
})

const route = useRoute()

const loading = ref(true)

const iframeSrc = ref(route.meta?.iframeSrc as string)
const iframeRef = ref<HTMLElement>()

const mainIsFull = computed(() => useSystemStore().mainMaximize)

if (route.meta?.iframeLoading === false) {
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
