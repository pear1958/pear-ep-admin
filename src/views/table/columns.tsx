import { reactive } from 'vue'
import { ElMessage } from 'element-plus'
import { ColumnProps, HeaderRenderScope } from '@/components/Base/TablePro/types'
import { getUserGender, getUserStatus } from '@/api/modules/user'

// 表格配置项
export const columns = reactive<ColumnProps[]>([
  { type: 'selection', fixed: 'left', width: 70 },
  { type: 'sort', label: '排序', width: 80 },
  { type: 'expand', label: '展开', width: 85 },
  {
    prop: 'username',
    label: '用户姓名',
    search: { el: 'input', tooltip: '我是搜索提示' },
    render: scope => {
      return (
        <el-button
          type="primary"
          link
          onClick={() => ElMessage.success('我是通过 tsx 语法渲染的内容')}
        >
          {scope.row.username}
        </el-button>
      )
    }
  },
  {
    prop: 'gender',
    label: '性别',
    // --------------- 字典请求不带参数 -------------------------
    enum: getUserGender,
    // --------------- 字典请求携带参数 ------------------------
    // enum: () => getUserGender({ id: 1 }),
    // --------------- 字典数据 - 本地数据 -------------------
    // enum: [
    //   {
    //     genderLabel: '男',
    //     genderValue: 1
    //   },
    //   {
    //     genderLabel: '女',
    //     genderValue: 2
    //   }
    // ],
    search: { el: 'select', props: { filterable: true } },
    fieldNames: { label: 'genderLabel', value: 'genderValue' }
  },
  {
    // 多级 prop
    prop: 'user.detail.age',
    label: '年龄',
    search: {
      // 自定义 search 显示内容
      render: ({ searchParams }) => {
        return (
          <div class="flex-c">
            <el-input vModel_trim={searchParams.minAge} placeholder="最小年龄" />
            <span class={'mx-2.5'}>-</span>
            <el-input vModel_trim={searchParams.maxAge} placeholder="最大年龄" />
          </div>
        )
      }
    }
  },
  { prop: 'idCard', label: '身份证号', search: { el: 'input' } },
  { prop: 'email', label: '邮箱' },
  { prop: 'address', label: '居住地址' },
  {
    prop: 'status',
    label: '用户状态',
    enum: getUserStatus,
    // enum: [
    //   {
    //     userLabel: '启用',
    //     userStatus: 1,
    //     tagType: 'success'
    //   },
    //   {
    //     userLabel: '禁用',
    //     userStatus: 0,
    //     tagType: 'danger'
    //   }
    // ],
    search: { el: 'select', props: { filterable: true } },
    fieldNames: { label: 'userLabel', value: 'userStatus' },
    render: scope => {
      return (
        <el-tag type={scope.row.status ? 'success' : 'danger'}>
          {scope.row.status ? '启用' : '禁用'}
        </el-tag>
      )
    }
  },
  {
    prop: 'createTime',
    label: '创建时间',
    headerRender: (scope: HeaderRenderScope) => (
      <el-button type="primary" onClick={() => ElMessage.success('我是通过 tsx 语法渲染的表头')}>
        {scope.column.label}
      </el-button>
    ),
    width: 180,
    search: {
      el: 'date-picker',
      span: 2,
      props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss', clearable: true },
      defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00']
    }
  },
  { prop: 'operation', label: '操作', fixed: 'right', width: 330 }
])
