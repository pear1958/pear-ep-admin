<template>
  <div v-loading="loading" class="content-full overflow-hidden">
    <iframe :src="iframeSrc" class="w-full h-full" frameborder="0" ref="iframeRef" />
  </div>
</template>

<script setup lang="ts">
import { ref, unref, onMounted } from 'vue'
import { useRoute } from 'vue-router'

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

if (route.meta?.iframeLoading == false) {
  loading.value = false
}
</script>

<style lang="scss" scoped></style>
