<template>
  <el-dropdown trigger="click" @command="setComponentSize">
    <el-icon class="header-icon">
      <Operation />
    </el-icon>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="item in componentSizeList"
          :key="item.value"
          :command="item.value"
          :disabled="componentSize === item.value"
        >
          {{ item.label }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { Operation } from '@element-plus/icons-vue'
import useSystemStore from '@/store/modules/system'
import { ComponentSize } from '@/store/types'

const systemStore = useSystemStore()
const componentSize = computed(() => systemStore.componentSize)

const componentSizeList = [
  { label: '小型', value: 'small' },
  { label: '默认', value: 'default' },
  { label: '大型', value: 'large' }
]

const setComponentSize = (value: ComponentSize) => {
  systemStore.setState('componentSize', value)
}
</script>
