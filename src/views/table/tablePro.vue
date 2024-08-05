<template>
  <TablePro
    ref="tableProRef"
    :columns="columns"
    :api="api"
    :fixedParams="fixedParams"
    :dataCallback="dataCallback"
    @search="onSearch"
  >
    <!-- 表格 header 按钮 -->
    <template #tableHeader="scope">
      <el-button type="primary" :icon="CirclePlus">新增用户</el-button>
      <el-button type="primary" :icon="Upload" plain>批量添加用户</el-button>
      <el-button type="primary" :icon="Download" plain>导出用户数据</el-button>
      <el-button type="primary" plain>To 子集详情页面</el-button>
      <el-button
        type="danger"
        :icon="Delete"
        plain
        :disabled="!scope.isSelected"
        @click="batchDelete(scope.selectIdList)"
      >
        批量删除用户
      </el-button>
    </template>

    <!-- Expand -->
    <template #expand="scope">
      {{ scope.row }}
    </template>

    <!-- usernameHeader -->
    <template #usernameHeader="scope">
      <el-button type="primary" @click="ElMessage.success('我是通过作用域插槽渲染的表头')">
        {{ scope.column.label }}
      </el-button>
    </template>

    <template #createTime="scope">
      <el-button type="primary" link @click="ElMessage.success('我是通过作用域插槽渲染的内容')">
        {{ scope.row.createTime }}
      </el-button>
    </template>

    <template #operation="scope">
      <el-button type="primary" link :icon="View">查看</el-button>
      <el-button type="primary" link :icon="EditPen">编辑</el-button>
      <el-button type="primary" link :icon="Refresh">重置密码</el-button>
      <el-button type="primary" link :icon="Delete">删除</el-button>
    </template>
  </TablePro>
</template>

<script setup lang="tsx" name="useProTable">
import { ref, reactive, unref } from 'vue'
import { ElMessage } from 'element-plus'
import {
  CirclePlus,
  Delete,
  EditPen,
  Download,
  Upload,
  View,
  Refresh
} from '@element-plus/icons-vue'
import TablePro from '@/components/Base/TablePro/index.vue'
import { deleteUser, getUserList } from '@/api/modules/user'
import { columns } from './columns'
import { handleData } from '@/utils/element'

const tableProRef = ref()
const fixedParams = reactive({ fixed: 'test' })

const api = (params: any) => {
  const newParams = JSON.parse(JSON.stringify(params))
  newParams.createTime && (newParams.startTime = newParams.createTime[0])
  newParams.createTime && (newParams.endTime = newParams.createTime[1])
  delete newParams.createTime
  return getUserList(newParams)
}

const dataCallback = (data: any) => {
  return {
    list: data.list,
    total: data.total
  }
}

const batchDelete = async (id: string[]) => {
  await handleData(deleteUser, { id }, '温馨提示', '是否删除所选用户信息', '删除成功')
  unref(tableProRef)?.clearSelection()
  unref(tableProRef)?.getTableList()
}

const onSearch = (params: Recordable) => {
  console.log('onSearch - params', params.value)
  console.log('tableProRef', unref(tableProRef))
}
</script>
