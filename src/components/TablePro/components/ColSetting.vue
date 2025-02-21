<template>
  <el-drawer v-model="visible" title="列设置" size="450px">
    <el-table :data="settingColumns" :border="true" row-key="prop" class="col-table">
      <el-table-column prop="label" align="center" label="列名" />

      <el-table-column v-slot="scope" prop="isShow" align="center" label="显示">
        <el-switch v-model="scope.row.isShow" />
      </el-table-column>

      <el-table-column v-slot="scope" prop="sortable" align="center" label="排序">
        <el-switch v-model="scope.row.sortable" />
      </el-table-column>

      <template #empty>
        <img src="@/assets/imgs/notData.png" alt="notData" />
        <div>暂无可配置列</div>
      </template>
    </el-table>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ColumnProps } from '../types'

defineOptions({ name: 'ColSetting' })

defineProps<{ settingColumns: ColumnProps[] }>()

const visible = ref<boolean>(false)

const openColSetting = () => {
  visible.value = true
}

defineExpose({
  openColSetting
})
</script>

<style lang="scss" scoped>
.col-table {
  :deep(.el-table__empty-text) {
    padding: 100px 0;
    line-height: 30px;
  }
}
</style>
