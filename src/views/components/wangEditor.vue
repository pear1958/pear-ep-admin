<template>
  <div>
    <wangEditor v-model="html" @change="onChange" />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import wangEditor from '@/components/wangEditor.vue'

const html = ref('')

const onChange = (val: string) => {
  // console.log('val', val)
}
</script>

<style lang="scss" scoped></style>
