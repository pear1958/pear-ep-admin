import { computed, onMounted, ref, unref } from 'vue'
import { ElMessage } from 'element-plus'
import { getRoleList, deleteRole } from '@/api/modules/systemManage'
import { FormItem } from '@/components/JsonForm/type'
import { formatDate } from '@/utils'
import { roleStatus, RoleStatus } from '@/utils/dict/data'
import { confirmModal } from '@/utils/element'
import { closeDialog, showDialog } from '@/utils/ui/dialog'
import RoleForm from './components/RoleForm'

const useConfig = () => {
  const tableRef = ref()
  const formData = ref<Recordable>({})

  onMounted(() => {
    // 建立引用
    formData.value = unref(tableRef).getFormData()
  })

  const getList = (params: Recordable) => {
    return getRoleList(params)
  }

  const refresh = () => {
    unref(tableRef).refresh()
  }

  const close = () => {
    closeDialog()
    refresh()
  }

  const openRoleDialog = (id?: string) => {
    showDialog(<RoleForm onRefresh={close} id={id} />, {
      title: `${!id ? '新增' : '编辑'}角色`,
      width: 650
    })
  }

  const handleDelete = async (id: number) => {
    await confirmModal('确认要删除？')
    await deleteRole(id)
    ElMessage.success('操作成功')
    refresh()
  }

  const formItems = computed<FormItem[]>(() => [
    {
      type: 'input',
      label: '角色名称：',
      field: 'name',
      attrs: {
        placeholder: '请输入角色名称'
      }
    },
    {
      type: 'input',
      label: '角色值：',
      field: 'value',
      attrs: {
        placeholder: '请输入角色值'
      }
    },
    {
      type: 'select',
      label: '状态：',
      field: 'status',
      attrs: {
        clearable: true,
        placeholder: '请选择状态',
        options: roleStatus
      }
    },
    {
      type: 'input',
      label: '备注：',
      field: 'remark',
      attrs: {
        placeholder: '请输入备注'
      }
    }
  ])

  const columns = computed(() => [
    {
      type: 'index',
      label: '序号',
      width: 70,
      align: 'center'
    },
    {
      prop: 'name',
      label: '角色名称',
      width: 220,
      align: 'center'
    },
    {
      prop: 'value',
      label: '角色值',
      width: 200,
      align: 'center'
    },
    {
      prop: 'status',
      label: '状态',
      align: 'center',
      customRender({ text }) {
        if (text === RoleStatus.Enable) {
          return <el-tag type="success">启用</el-tag>
        }
        if (text === RoleStatus.Disable) {
          return <el-tag type="danger">禁用</el-tag>
        }
        return '-'
      }
    },
    {
      prop: 'remark',
      label: '备注',
      align: 'center',
      customRender({ text }) {
        return text || '-'
      }
    },
    {
      prop: 'createdAt',
      label: '创建时间',
      width: 160,
      align: 'center',
      customRender({ record }) {
        return formatDate(record.createdAt, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      prop: 'updatedAt',
      label: '更新时间',
      width: 160,
      align: 'center',
      customRender({ record }) {
        return formatDate(record.updatedAt, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      label: '操作',
      width: 200,
      fixed: 'right',
      align: 'center',
      customRender({ record }) {
        return (
          <div>
            <el-button type="primary" link onClick={() => openRoleDialog(record.id)}>
              编辑
            </el-button>
            <el-button type="primary" link onClick={() => handleDelete(record.id)}>
              删除
            </el-button>
          </div>
        )
      }
    }
  ])

  return { tableRef, formItems, columns, getList, openRoleDialog }
}

export default useConfig
