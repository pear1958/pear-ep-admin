import { computed, defineComponent, ref, unref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import JsonForm from '@/components/JsonForm'
import { FormItem } from '@/components/JsonForm/type'
import { createMenu, getAllMenu, getMenuDetail, updateMenu } from '@/api/modules/systemManage'
import {
  ExtOpenMode,
  ExtStatusDisable,
  ExtStatusEnable,
  MenuKeepAlive,
  MenuShow,
  MenuStatus,
  MenuType,
  extOpenMode,
  extStatus,
  menuKeepAlive,
  menuShow,
  menuStatus,
  menuType
} from '@/utils/dict/data'
import { closeDialog } from '@/utils/ui/dialog'

export default defineComponent({
  name: 'RoleForm',
  emits: ['refresh'],
  props: {
    id: {
      type: Number,
      default: null
    }
  },
  setup(_, { emit, expose }) {
    const formRef = ref<FormInstance>()
    const getFormInstance = (ins: FormInstance) => {
      formRef.value = ins
    }
    const formData = ref<Recordable>({})
    const menuOptions = ref([])

    const defaultProps = {
      label: 'name',
      children: 'children'
    }

    const getDetail = async () => {
      const { data } = await getMenuDetail(_.id)
      Object.keys(formData.value).forEach(key => {
        formData.value[key] = data[key]
      })
    }

    const getMenuOptions = async () => {
      const { data } = await getAllMenu()
      menuOptions.value = [
        {
          id: 'root',
          name: '根目录',
          children: data
        }
      ]
    }

    const getData = () => {
      if (_.id) getDetail()
      getMenuOptions()
    }

    getData()

    const isDir = computed(() => {
      return unref(formData).type === MenuType.Directory
    })

    const isMenu = computed(() => {
      return unref(formData).type === MenuType.Menu
    })

    const isButton = computed(() => {
      return unref(formData).type === MenuType.Button
    })

    const formItems = computed<FormItem[]>(() => [
      {
        type: 'radio-group',
        label: '菜单类型：',
        field: 'type',
        initValue: MenuType.Directory,
        attrs: {
          options: menuType
        },
        rules: [
          {
            required: true,
            message: '请选择菜单类型',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'input',
        label: '名称：',
        field: 'name',
        attrs: {
          placeholder: '请输入名称'
        },
        rules: [
          {
            required: true,
            message: '请输入名称',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'tree-select',
        label: '上级节点：',
        field: 'parentId',
        attrs: {
          placeholder: '请选择上级节点',
          clearable: true,
          'render-after-expand': false,
          data: menuOptions.value,
          props: defaultProps,
          'node-key': 'id',
          'check-strictly': true
        },
        rules: [
          {
            required: true,
            message: '请选择上级节点',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'input',
        label: '路由地址：',
        field: 'path',
        show: !isButton.value,
        attrs: {
          placeholder: '请输入路由地址'
        },
        rules: [
          {
            required: true,
            message: '请输入路由地址',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'input',
        label: '文件路径：',
        field: 'component',
        show: isMenu.value,
        attrs: {
          placeholder: '请输入文件路径'
        },
        rules: [
          {
            required: true,
            message: '请输入文件路径',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'input',
        label: '权限标识：',
        field: 'permission',
        show: !isDir.value,
        attrs: {
          placeholder: '请输入权限标识'
        },
        rules: [
          {
            required: true,
            message: '请输入权限标识',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'input',
        label: '图标：',
        field: 'icon',
        show: !isButton.value,
        attrs: {
          placeholder: '请输入图标地址'
        },
        rules: [
          {
            required: true,
            message: '请输入图标地址',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'input-number',
        label: '排序：',
        field: 'orderNo',
        initValue: 0,
        attrs: {
          placeholder: '请输入排序号',
          min: 1,
          max: 99999,
          'controls-position': 'right',
          align: 'left'
        },
        rules: [
          {
            required: true,
            message: '请输入排序号',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'radio-group',
        children: 'radio-button',
        label: '是否缓存：',
        field: 'keepAlive',
        show: unref(formData).type === MenuType.Menu,
        initValue: MenuKeepAlive.Enable,
        attrs: {
          options: menuKeepAlive
        },
        rules: [
          {
            required: true,
            message: '请选择是否缓存',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'radio-group',
        children: 'radio-button',
        label: '是否显示：',
        field: 'show',
        show: !isButton.value,
        initValue: MenuShow.Enable,
        attrs: {
          options: menuShow
        },
        rules: [
          {
            required: true,
            message: '请选择是否显示',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'radio-group',
        children: 'radio-button',
        label: '状态：',
        field: 'status',
        initValue: MenuStatus.Enable,
        attrs: {
          options: menuStatus
        },
        rules: [
          {
            required: true,
            message: '请选择状态',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'radio-group',
        children: 'radio-button',
        label: '是否为外链：',
        field: 'isExt',
        show: isMenu.value,
        initValue: ExtStatusDisable,
        attrs: {
          options: extStatus
        },
        rules: [
          {
            required: true,
            message: '请选择是否为外链',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'radio-group',
        children: 'radio-button',
        label: '外链打开方式：',
        field: 'extOpenMode',
        show: isMenu.value && unref(formData).isExt === ExtStatusEnable,
        initValue: ExtOpenMode.NewWindow,
        attrs: {
          options: extOpenMode
        },
        rules: [
          {
            required: true,
            message: '请选择外链打开方式',
            trigger: 'change'
          }
        ]
      }
    ])

    const handleSubmit = async () => {
      await unref(formRef).validate(async valid => {
        if (!valid) return
        const params = cloneDeep(formData.value)

        if (!_.id) {
          await createMenu(params)
        } else {
          params.id = _.id
          await updateMenu(params)
        }

        ElMessage.success('操作成功')
        emit('refresh')
        closeDialog()
      })
    }

    expose({
      handleSubmit
    })

    return () => (
      <JsonForm
        formItems={formItems.value}
        v-model:formData={formData.value}
        label-width={120}
        getFormInstance={getFormInstance}
      />
    )
  }
})
