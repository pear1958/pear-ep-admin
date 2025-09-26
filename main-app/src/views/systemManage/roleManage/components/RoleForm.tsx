import { computed, defineComponent, ref, unref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { delay } from 'pear-common-utils'
import JsonForm from '@/components/JsonForm'
import { FormItem } from '@/components/JsonForm/type'
import { createRole, getRoleDetail, updateRole } from '@/api/modules/systemManage'
import { RoleStatus, roleStatus } from '@/utils/dict/data'
import { closeDialog } from '@/utils/ui/dialog'
import MenuTree from './MenuTree'

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

    const getDetail = async () => {
      const { data } = await getRoleDetail(_.id)

      Object.keys(formData.value).forEach(key => {
        formData.value[key] = data[key]
      })
    }

    const getData = () => {
      if (_.id) getDetail()
    }

    getData()

    const formItems = computed<FormItem[]>(() => [
      {
        type: 'input',
        label: '角色名称：',
        field: 'name',
        attrs: {
          placeholder: '请输入角色名称'
        },
        rules: [
          {
            required: true,
            message: '请输入角色名称',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'input',
        label: '角色值：',
        field: 'value',
        attrs: {
          placeholder: '请输入角色值'
        },
        rules: [
          {
            required: true,
            message: '请输入角色值',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'component',
        component: <MenuTree v-model={formData.value.menuIds} />,
        label: '菜单权限：',
        field: 'menuIds'
      },
      {
        type: 'radio-group',
        label: '状态：',
        field: 'status',
        initValue: RoleStatus.Enable,
        attrs: {
          options: roleStatus
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
        type: 'input',
        label: '备注：',
        field: 'remark',
        attrs: {
          maxlength: 120,
          placeholder: '请输入备注',
          type: 'textarea'
        }
      }
    ])

    const handleSubmit = async () => {
      await unref(formRef).validate(async valid => {
        if (!valid) return
        const params = cloneDeep(formData.value)
        await delay(2000)

        if (!_.id) {
          await createRole(params)
        } else {
          params.id = _.id
          await updateRole(params)
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
