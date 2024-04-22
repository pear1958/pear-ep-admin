<template>
  <div>
    <el-card>
      <template #header>
        <span class="text-[16px]">wangEditor编辑器使用示例</span>
      </template>

      <wangEditor v-model="html" @change="onChange" />
    </el-card>
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
