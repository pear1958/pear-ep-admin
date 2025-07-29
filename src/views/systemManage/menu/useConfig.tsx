import { computed, onMounted, ref, unref } from 'vue'
import { getMenuList } from '@/api/modules/systemManage'
import { FormItem } from '@/components/JsonForm/type'
import { formatDate } from '@/utils'
import { isEmpty } from 'pear-common-utils'
import { KeepAlive, MenuShow, MenuStatus, MenuType } from '@/utils/dict/data'

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
      align: 'center',
      customRender({ text }) {
        const map = {
          [MenuType.Directory]: <el-tag type="warning">目录</el-tag>,
          [MenuType.Menu]: <el-tag type="success">菜单</el-tag>,
          [MenuType.Button]: <el-tag type="danger">按钮</el-tag>
        }
        return map[text] || '-'
      }
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
      align: 'center',
      customRender({ text }) {
        if (isEmpty(text)) return '-'
        return <el-tag type="primary">{text}</el-tag>
      }
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
      align: 'center',
      customRender({ record, text }) {
        if (record.type !== MenuType.Menu) return '-'
        if (text === KeepAlive.Disable) return '否'
        if (text === KeepAlive.Enable) return '是'
        return '-'
      }
    },
    {
      prop: 'show',
      label: '是否显示',
      width: 120,
      align: 'center',
      customRender({ text }) {
        if (text === MenuShow.Enable) {
          return <el-tag type="success">显示</el-tag>
        }
        if (text === MenuShow.Disable) {
          return <el-tag type="danger">隐藏</el-tag>
        }
        return '-'
      }
    },
    {
      prop: 'status',
      label: '状态',
      align: 'center',
      customRender({ text }) {
        if (text === MenuStatus.Enable) {
          return <el-tag type="success">启用</el-tag>
        }
        if (text === MenuStatus.Disable) {
          return <el-tag type="danger">禁用</el-tag>
        }
        return '-'
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
