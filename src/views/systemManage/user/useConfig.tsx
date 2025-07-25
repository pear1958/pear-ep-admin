import { computed, onMounted, ref, unref } from 'vue'
import { ElMessage } from 'element-plus'
import { FormItem } from '@/components/JsonForm/type'
import { formatDate } from '@/utils'
import { deleteUser, editUser, getUserList } from '@/api/modules/systemManage'
import { closeDialog, showDialog } from '@/utils/ui/dialog'
import UserForm from './UserForm'
import { confirmModal } from '@/utils/element'
import { UserStatus } from '@/utils/dict/data'

const useConfig = () => {
  const tableRef = ref()
  const formData = ref<Recordable>({})
  const selectRows = ref<Recordable[]>([])
  const hasSelect = computed(() => !!selectRows.value?.length)

  onMounted(() => {
    // 建立引用
    formData.value = unref(tableRef).getFormData()
  })

  const getList = (params: Recordable) => {
    // console.log('params', params)
    return getUserList(params)
  }

  const refresh = () => {
    unref(tableRef).refresh()
  }

  const beforeChange = async (row: Recordable) => {
    await confirmModal(`确认要${row.status === UserStatus.Disable ? '启' : '禁'}用该用户`)
    await editUser({ ...row, status: +!row.status })
    ElMessage.success('操作成功')
    refresh()
  }

  const delUser = async (id: number) => {
    await confirmModal('确认要删除该用户？')
    await deleteUser(id)
    ElMessage.success('操作成功')
    refresh()
  }

  const close = () => {
    refresh()
    closeDialog()
  }

  const openUserDialog = (id?: string) => {
    showDialog(<UserForm onRefresh={close} id={id} />, {
      title: `${!id ? '新增' : '编辑'}用户`,
      width: 650
    })
  }

  const delSelectUsers = async () => {
    await confirmModal(`确认要删除？`)
    // await deleteUser(id)
    ElMessage.success('操作成功')
    refresh()
  }

  const formItems = computed<FormItem[]>(() => [
    {
      type: 'input',
      label: '用户名：',
      field: 'username',
      attrs: {
        placeholder: '请输入用户名'
      }
    },
    {
      type: 'input',
      label: '邮箱：',
      field: 'email',
      attrs: {
        placeholder: '请输入邮箱'
      }
    },
    {
      type: 'input',
      label: '手机：',
      field: 'phone',
      attrs: {
        placeholder: '请输入手机'
      }
    },
    {
      type: 'input',
      label: '备注：',
      field: 'remark',
      attrs: {
        placeholder: '请输入备注'
      }
    },
    {
      type: 'date-picker',
      label: '创建时间：',
      field: 'date-time-picker',
      span: 2,
      attrs: {
        type: 'datetimerange',
        'range-separator': '至',
        'start-placeholder': '起始时间',
        'end-placeholder': '结束时间'
      }
    }
  ])

  const columns = ref([
    {
      type: 'selection',
      align: 'center'
    },
    {
      type: 'index',
      label: '序号',
      align: 'center',
      width: 70
    },
    {
      prop: 'avatar',
      label: '头像',
      align: 'center',
      width: 120,
      customRender({ text: url }) {
        if (!url) return '-'
        return (
          <el-image
            src={url}
            style={{ width: '60px', height: '60px', borderRadius: '50%' }}
            preview-src-list={[url]}
            z-index={99}
          />
        )
      }
    },
    {
      prop: 'username',
      label: '用户名',
      align: 'center'
    },
    {
      prop: 'nickname',
      label: '昵称',
      align: 'center'
    },
    {
      prop: 'dept',
      label: '所在部门',
      align: 'center',
      width: 120,
      customRender({ record }) {
        return record.dept?.name ? <el-tag type="info">{record.dept?.name}</el-tag> : '-'
      }
    },
    {
      prop: 'roles',
      label: '所属角色',
      align: 'center',
      width: 140,
      customRender({ record }) {
        return record.roles?.length ? (
          <div className="flex-c flex-wrap gap-1">
            {record.roles.map((item: Recordable) => {
              return <el-tag type="success">{item.name}</el-tag>
            })}
          </div>
        ) : (
          '-'
        )
      }
    },
    {
      prop: 'email',
      label: '邮箱',
      align: 'center',
      width: 180
    },
    {
      prop: 'phone',
      label: '手机',
      align: 'center'
    },
    {
      prop: 'remark',
      label: '备注',
      align: 'center'
    },
    {
      prop: 'status',
      label: '状态',
      align: 'center',
      customRender({ record }) {
        if ([UserStatus.Enabled, UserStatus.Disable].includes(record.status)) {
          return (
            <el-switch
              v-model={record.status}
              inline-prompt
              active-text="启用"
              inactive-text="禁用"
              active-value={UserStatus.Enabled}
              inactive-value={UserStatus.Disable}
              before-change={() => beforeChange(record)}
            />
          )
        }
        return '-'
      }
    },
    {
      prop: 'createdAt',
      label: '创建时间',
      align: 'center',
      width: 160,
      customRender({ record }) {
        return formatDate(record.createdAt, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      prop: 'updatedAt',
      label: '更新时间',
      align: 'center',
      width: 160,
      customRender({ record }) {
        return formatDate(record.updatedAt, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      label: '操作',
      width: 180,
      fixed: 'right',
      align: 'center',
      customRender({ record }) {
        return (
          <div>
            <el-button type="primary" link onClick={() => openUserDialog(record.id)}>
              编辑
            </el-button>
            <el-button type="primary" link onClick={() => delUser(record)}>
              删除
            </el-button>
          </div>
        )
      }
    }
  ])

  return {
    tableRef,
    formData,
    columns,
    formItems,
    getList,
    openUserDialog,
    selectRows,
    hasSelect,
    delSelectUsers
  }
}

export default useConfig
