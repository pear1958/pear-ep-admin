<template>
  <div>
    <el-dropdown>
      <span>Dropdown List</span>

      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item>Action 1</el-dropdown-item>
          <el-dropdown-item>Action 2</el-dropdown-item>
          <el-dropdown-item>Action 3</el-dropdown-item>
          <el-dropdown-item disabled>Action 4</el-dropdown-item>
          <el-dropdown-item divided>Action 5</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script lang="ts" setup>
defineOptions({
  name: 'systemManageRole'
})
</script>

<style lang="scss" scoped>
.el-tooltip__trigger {
  outline: none;
}
</style>
