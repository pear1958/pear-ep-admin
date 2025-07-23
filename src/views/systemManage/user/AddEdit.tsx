import { computed, defineComponent, h, reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { delay } from 'pear-common-utils'
import { Iconify } from '@/components/Global/components/Icon'
import JsonForm from '@/components/JsonForm'
import { FormItem } from '@/components/JsonForm/type'
import Upload from '@/components/Upload/index.vue'

export default defineComponent({
  name: 'AddEdit',
  emits: ['refresh'],
  setup(_, { emit, expose }) {
    const formRef = ref()
    const getFormInstance = (ins: FormInstance) => {
      formRef.value = ins
    }
    const formData = ref<Recordable>({})

    const formItems = computed<FormItem[]>(() => [
      {
        type: 'component',
        label: '头像：',
        field: 'avatar',
        component: <Upload v-model={formData.value.avatar} limit={1} />
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
          placeholder: '请输入手机：'
        }
      },
      {
        type: 'input',
        label: '备注：',
        field: 'remark',
        attrs: {
          maxlength: 120,
          placeholder: '请输入备注'
        }
      }
    ])

    const rules = reactive<FormRules>({
      // dvrId: [
      //   { required: true, message: '请输入设备号', trigger: 'blur' },
      //   { min: 3, max: 60, message: 'Length should be 3 to 60', trigger: 'blur' }
      // ],
      avatar: [
        {
          required: true,
          message: '请上传头像'
        }
      ]
    })

    const handleSubmit = async () => {
      // mock-api
      await delay(2000)
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
        rules={rules}
        label-width={120}
        getFormInstance={getFormInstance}
      />
    )
  }
})
