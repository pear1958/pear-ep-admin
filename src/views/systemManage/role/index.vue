<template>
  <!-- <TablePro :columns="columns" /> -->
  <div>Role</div>
</template>

<script lang="tsx" setup>
import { Ref, reactive, ref } from 'vue'
import { ElMessage } from 'element-plus'
import TablePro from '@/components/Base/TablePro/index.vue'
import { ColumnProps } from '@/components/Base/TablePro/type'

// const columns = ref<ColumnProps[]>([
//   { type: 'selection', fixed: 'left', width: 70 },
//   { type: 'sort', label: 'Sort', width: 80 },
//   { type: 'expand', label: 'Expand', width: 85 },
//   {
//     prop: 'username',
//     label: '用户姓名',
//     search: { el: 'input', tooltip: '我是搜索提示' },
//     render: scope => {
//       return (
//         <el-button
//           type="primary"
//           link
//           onClick={() => ElMessage.success('我是通过 tsx 语法渲染的内容')}
//         >
//           {scope.row.username}
//         </el-button>
//       )
//     }
//   },
//   {
//     prop: 'gender',
//     label: '性别',
//     // 字典数据（本地数据）
//     // enum: genderType,
//     // 字典请求不带参数
//     // enum: getUserGender,
//     // 字典请求携带参数
//     // enum: () => getUserGender({ id: 1 }),
//     search: { el: 'select', props: { filterable: true } },
//     fieldNames: { label: 'genderLabel', value: 'genderValue' }
//   },
//   {
//     // 多级 prop
//     prop: 'user.detail.age',
//     label: '年龄',
//     search: {
//       // 自定义 search 显示内容
//       render: ({ searchParam }) => {
//         return (
//           <div class="flx-center">
//             <el-input vModel_trim={searchParam.minAge} placeholder="最小年龄" />
//             <span class="mr10 ml10">-</span>
//             <el-input vModel_trim={searchParam.maxAge} placeholder="最大年龄" />
//           </div>
//         )
//       }
//     }
//   },
//   { prop: 'idCard', label: '身份证号', search: { el: 'input' } },
//   { prop: 'email', label: '邮箱' },
//   { prop: 'address', label: '居住地址' },
//   {
//     prop: 'status',
//     label: '用户状态',
//     // enum: getUserStatus,
//     search: { el: 'tree-select', props: { filterable: true } },
//     fieldNames: { label: 'userLabel', value: 'userStatus' },
//     render: scope => {
//       return (
//         <>
//           {BUTTONS.value.status ? (
//             <el-switch
//               model-value={scope.row.status}
//               active-text={scope.row.status ? '启用' : '禁用'}
//               active-value={1}
//               inactive-value={0}
//               onClick={() => changeStatus(scope.row)}
//             />
//           ) : (
//             <el-tag type={scope.row.status ? 'success' : 'danger'}>
//               {scope.row.status ? '启用' : '禁用'}
//             </el-tag>
//           )}
//         </>
//       )
//     }
//   },
//   {
//     prop: 'createTime',
//     label: '创建时间',
//     // headerRender,
//     width: 180,
//     search: {
//       el: 'date-picker',
//       span: 2,
//       props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
//       defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00']
//     }
//   },
//   { prop: 'operation', label: '操作', fixed: 'right', width: 330 }
// ])
</script>

<style lang="scss" scoped></style>
