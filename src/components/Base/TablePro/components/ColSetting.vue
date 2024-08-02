<template>
  <el-drawer v-model="visible" title="列设置" size="450px">
    <el-table
      :data="settingColumns"
      :border="true"
      row-key="prop"
      default-expand-all
      :tree-props="{ children: '_children' }"
    >
      <el-table-column prop="label" align="center" label="列名" />

      <el-table-column v-slot="scope" prop="isShow" align="center" label="显示">
        <el-switch v-model="scope.row.isShow"></el-switch>
      </el-table-column>

      <el-table-column v-slot="scope" prop="sortable" align="center" label="排序">
        <el-switch v-model="scope.row.sortable"></el-switch>
      </el-table-column>

      <template #empty>
        <div class="flex flex-col gap-4 items-center">
          <img
            src="@/assets/imgs/notData.png"
            class="w-[50px] h-[50px] rounded-full"
            alt="notData"
          />
          <div>暂无可配置列</div>
        </div>
      </template>
    </el-table>
  </el-drawer>
</template>

<script setup lang="ts" name="ColSetting">
import { ref } from 'vue'
import { ColumnProps } from '../types'

defineProps<{ settingColumns: ColumnProps[] }>()

const visible = ref<boolean>(false)

const openColSetting = () => {
  visible.value = true
}

defineExpose({
  openColSetting
})
</script>

<style scoped lang="scss"></style>
