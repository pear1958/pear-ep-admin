import { computed, defineComponent, h, reactive, ref } from 'vue'
import { ElMessage, FormInstance, FormRules } from 'element-plus'
import { delay } from 'pear-common-utils'
import JsonForm from '@/components/JsonForm'
import { FormItem } from '@/components/JsonForm/type'
import Upload from '@/components/Upload/index.vue'
import { createUser, getDeptList, getRoleList } from '@/api/modules/systemManage'
import { convertToTree } from '@/utils'
import { UserStatus, userStatus } from '@/utils/dict/data'

export default defineComponent({
  name: 'UserForm',
  emits: ['refresh'],
  setup(_, { emit, expose }) {
    const formRef = ref()
    const getFormInstance = (ins: FormInstance) => {
      formRef.value = ins
    }
    const formData = ref<Recordable>({})
    const deptList = ref([])
    const roleList = ref([])

    const getDeptOptions = async () => {
      const { data = [] } = await getDeptList()
      deptList.value = convertToTree(data)
    }

    const getRoleOptions = async () => {
      const { data } = await getRoleList()
      roleList.value = (data?.items || []).map((_: LabelValue) => ({
        label: _.name,
        value: _.id
      }))
    }

    getOptions()

    function getOptions() {
      getDeptOptions()
      getRoleOptions()
    }

    const formItems = computed<FormItem[]>(() => [
      {
        type: 'component',
        label: '头像：',
        field: 'avatar',
        component: <Upload v-model={formData.value.avatar} limit={1} bindFormat="string" />
      },
      {
        type: 'tree-select',
        label: '所属部门：',
        field: 'deptId',
        attrs: {
          placeholder: '请选择所属部门',
          data: deptList.value,
          filterable: true
        },
        rules: [
          {
            required: true,
            message: '请选择所属部门',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'select',
        label: '所属角色：',
        field: 'roleIds',
        attrs: {
          placeholder: '请选择所属角色',
          options: roleList.value,
          multiple: true,
          filterable: true
        },
        rules: [
          {
            required: true,
            message: '请选择所属角色',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'input',
        label: '用户名：',
        field: 'username',
        attrs: {
          placeholder: '请输入用户名'
        },
        rules: [
          {
            required: true,
            message: '请输入用户名',
            trigger: 'change'
          },
          { min: 2, max: 12, message: 'Length should be 2 to 12', trigger: 'blur' }
        ]
      },
      {
        type: 'input',
        label: '密码：',
        field: 'password',
        attrs: {
          placeholder: '请输入密码',
          'show-password': true,
          clearable: true
        },
        rules: [
          {
            required: true,
            message: '请输入密码',
            trigger: 'change'
          }
        ]
      },
      {
        type: 'input',
        label: '昵称：',
        field: 'nickname',
        attrs: {
          maxlength: 12,
          placeholder: '请输入昵称'
        }
      },
      {
        type: 'input',
        label: '邮箱：',
        field: 'email',
        attrs: {
          maxlength: 30,
          placeholder: '请输入邮箱'
        }
      },
      {
        type: 'input',
        label: '手机：',
        field: 'phone',
        attrs: {
          maxlength: 11,
          placeholder: '请输入手机'
        }
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
      },
      {
        type: 'radio-group',
        label: '状态：',
        field: 'status',
        initValue: UserStatus.Enabled,
        attrs: {
          options: userStatus
        }
      }
    ])

    const handleSubmit = async () => {
      console.log('formData.value', formData.value)
      const params = { ...formData.value }
      await delay(2000)
      await createUser(params)
      ElMessage.success('操作成功')
      emit('refresh')
      return true
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
