import { defineComponent, onMounted, reactive, ref, unref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import JsonForm from '@/components/JsonForm'
import { useFormItems } from './useFormItems'

export default defineComponent({
  name: 'jsonForm',
  setup() {
    const formRef = ref()
    const getFormInstance = (ins: FormInstance) => {
      formRef.value = ins
    }
    const { formData, formItems } = useFormItems()

    const rules = reactive<FormRules>({
      dvrId: [
        { required: true, message: '请输入设备号', trigger: 'blur' },
        { min: 3, max: 60, message: 'Length should be 3 to 60', trigger: 'blur' }
      ],
      reviewStatus: [
        {
          required: true,
          message: '请选择审核状态',
          trigger: 'change'
        }
      ]
    })

    const onChange = (params: Recordable) => {
      // console.log('onChange', formData.value)
    }

    const submit = (data: Recordable) => {
      console.log('submit-data', data)
      unref(formRef).validate((valid: boolean, fields) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    // 异步设置值
    onMounted(() => {
      setTimeout(() => {
        unref(formRef).setFieldsValue({ comment: 32 })
      }, 2000)
    })

    return () => (
      <div class="page-box">
        <JsonForm
          formItems={formItems.value}
          v-model:formData={formData.value}
          rules={rules}
          onChange={onChange}
          label-width="120px"
          getFormInstance={getFormInstance}
          onSubmit={submit}
        />
      </div>
    )
  }
})
