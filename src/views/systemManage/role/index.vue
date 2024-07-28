<template>
  <div class="page-box bg-white">
    <!-- <div>测试高度</div>
    <div>测试高度</div>
    <div>测试高度</div> -->

    <el-table :data="tableData" border>
      <el-table-column fixed prop="date" label="Date" width="150" />
      <el-table-column prop="name" label="Name" width="120" />
      <el-table-column prop="state" label="State" width="120" />
      <el-table-column prop="city" label="City" width="120" />
      <el-table-column prop="address" label="Address" width="600" />
      <el-table-column prop="zip" label="Zip" width="120" />
      <el-table-column fixed="right" label="Operations" min-width="120">
        <template #default="scope">
          <el-button link type="primary">Remove</el-button>
        </template>
      </el-table-column>
    </el-table>

    <div class="p-4 flex-end">
      <el-pagination background layout="prev, pager, next" :total="1000" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'

defineOptions({
  name: 'role'
})

const data = Array(150)
  .fill('')
  .map((item, index) => ({
    date: '2016-05-01',
    name: index,
    state: 'California',
    city: 'Los Angeles',
    address: 'No. 189, Grove St, Los Angeles',
    zip: 'CA 90036'
  }))

const tableData = ref(data)
</script>

<style lang="scss" scoped>
.page-box {
  height: 100%;
  // border: 1px solid red;
  box-sizing: border-box;
  height: calc(100vh - $headerHeight - $tabHeight - 2 * $mainPadding);
  display: flex;
  flex-direction: column;

  :deep(.el-table) {
    flex: 1;
  }
}
</style>
