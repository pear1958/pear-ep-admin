<template>
  <div class="px-2.5">
    <el-switch
      v-model="isDark"
      inline-prompt
      :active-icon="Sunny"
      :inactive-icon="Moon"
      @change="onDarkChange"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { Sunny, Moon } from '@element-plus/icons-vue'
import useSystemStore from '@/store/modules/system'
import { useTheme } from '@/hooks/useTheme'

const isDark = ref(useSystemStore().isDark)

function onDarkChange(checked: string | number | boolean) {
  useTheme().changeDark(checked as boolean)
}
</script>
