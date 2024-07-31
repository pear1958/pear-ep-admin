<template>
  <TablePro :columns="columns" />
</template>

<script lang="tsx" setup>
import { reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import TablePro from '@/components/Base/TablePro/index.vue'

const columns = ref([
  {
    prop: 'username',
    label: '用户姓名',
    search: { el: 'input', tooltip: '我是搜索提示' }
  },
  { prop: 'idCard', label: '身份证号', search: { el: 'input' } },
  { prop: 'email', label: '邮箱', search: { el: 'input' } },
  { prop: 'address', label: '居住地址', search: { el: 'input' } },
  { prop: 'address1', label: '居住地址1', search: { el: 'input' } },
  { prop: 'address2', label: '居住地址2', search: { el: 'input' } },
  { prop: 'address3', label: '居住地址3', search: { el: 'input' } }
])
</script>

<style lang="scss" scoped></style>
