import { computed, defineComponent, ref, unref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { delay } from 'pear-common-utils'
import JsonForm from '@/components/JsonForm'
import { FormItem } from '@/components/JsonForm/type'
import { createMenu, getAllMenu, getMenuDetail, updateMenu } from '@/api/modules/systemManage'
import { MenuType, menuType } from '@/utils/dict/data'
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
      }
    ])

    const handleSubmit = async () => {
      await unref(formRef).validate(async valid => {
        if (!valid) return
        const params = cloneDeep(formData.value)
        await delay(2000)

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
