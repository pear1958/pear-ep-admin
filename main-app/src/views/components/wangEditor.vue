<template>
  <div>
    <el-card>
      <template #header>
        <span class="text-[16px]">wangEditor编辑器使用示例</span>
      </template>

      <WangEditor v-model="html" @change="onChange" />
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import WangEditor from '@/components/WangEditor.vue'

const html = ref('')

const onChange = (val: string) => {
  // console.log('val', val)
}
</script>

<style lang="scss" scoped></style>
