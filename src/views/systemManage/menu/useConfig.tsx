import { computed, onMounted, ref, unref } from 'vue'
import { getMenuList } from '@/api/modules/systemManage'
import { FormItem } from '@/components/JsonForm/type'
import { formatDate } from '@/utils'

const useConfig = () => {
  const tableRef = ref()
  const formData = ref<Recordable>({})

  onMounted(() => {
    // 建立引用
    formData.value = unref(tableRef).getFormData()
  })

  const getList = (params: Recordable) => {
    return getMenuList(params)
  }

  const formItems = computed<FormItem[]>(() => [
    {
      type: 'input',
      label: '名称：',
      field: 'name',
      attrs: {
        placeholder: '请输入名称'
      }
    },
    {
      type: 'input',
      label: '节点路由：',
      field: 'path',
      attrs: {
        placeholder: '请输入节点路由'
      }
    },
    {
      type: 'input',
      label: '文件路径：',
      field: 'component',
      attrs: {
        placeholder: '请输入文件路径'
      }
    }
  ])

  const columns = computed(() => [
    {
      prop: 'name',
      label: '名称',
      width: 220,
      fixed: 'left'
    },
    {
      prop: 'icon',
      label: '图标',
      width: 240,
      align: 'center'
    },
    {
      prop: 'type',
      label: '类型',
      align: 'center'
    },
    {
      prop: 'path',
      label: '节点路由',
      width: 200,
      align: 'center'
    },
    {
      prop: 'component',
      label: '文件路径',
      width: 200,
      align: 'center'
    },
    {
      prop: 'permission',
      label: '权限标识',
      width: 240,
      align: 'center'
    },
    {
      prop: 'orderNo',
      label: '排序',
      align: 'center'
    },
    {
      prop: 'keepAlive',
      label: '路由缓存',
      width: 120,
      align: 'center'
    },
    {
      prop: 'show',
      label: '是否显示',
      width: 120,
      align: 'center'
    },
    {
      prop: 'status',
      label: '状态',
      align: 'center'
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
            <el-button type="primary" link>
              新增
            </el-button>
            <el-button type="primary" link>
              编辑
            </el-button>
            <el-button type="primary" link>
              删除
            </el-button>
          </div>
        )
      }
    }
  ])

  return { tableRef, formItems, columns, getList }
}

export default useConfig
