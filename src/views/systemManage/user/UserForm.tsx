import { computed, defineComponent, ref, unref } from 'vue'
import { ElMessage, FormInstance } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { delay } from 'pear-common-utils'
import JsonForm from '@/components/JsonForm'
import { FormItem } from '@/components/JsonForm/type'
import Upload from '@/components/Upload/index.vue'
import {
  createUser,
  getDeptList,
  getRoleList,
  getUserDetail,
  editUser
} from '@/api/modules/systemManage'
import { convertToTree } from '@/utils'
import { UserStatus, userStatus } from '@/utils/dict/data'

export default defineComponent({
  name: 'UserForm',
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

    const getDetail = async () => {
      const { data } = await getUserDetail(_.id)

      Object.keys(formData.value).forEach(key => {
        if (key === 'deptId') {
          formData.value.deptId = data.dept?.id
          return
        }

        if (key === 'roleIds') {
          formData.value.roleIds = data.roles?.map((_: Recordable) => _.id)
          return
        }

        formData.value[key] = data[key]
      })
      console.log('formData.value', formData.value)
    }

    const getData = () => {
      if (_.id) getDetail()
      getDeptOptions()
      getRoleOptions()
    }

    getData()

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
          placeholder: !_.id ? '请输入密码' : '无需修改请留空',
          'show-password': true,
          clearable: true
        },
        rules: !_.id
          ? [
              {
                required: true,
                message: '请输入密码',
                trigger: 'change'
              }
            ]
          : []
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
      await unref(formRef).validate(async valid => {
        if (!valid) return
        const params = cloneDeep(formData.value)

        await delay(2000)

        if (!_.id) {
          await createUser(params)
        } else {
          // params.id = _.id
          if (!params.password) delete params.password
          await editUser(params)
        }

        ElMessage.success('操作成功')
        emit('refresh')
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
