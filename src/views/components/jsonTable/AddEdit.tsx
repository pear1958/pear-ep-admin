import { Iconify } from '@/components/Global/components/Icon'
import JsonForm from '@/components/JsonForm'
import { FormItem } from '@/components/JsonForm/type'
import { FormInstance, FormRules } from 'element-plus'
import { computed, defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'AddEdit',
  setup() {
    const formRef = ref()
    const getFormInstance = (ins: FormInstance) => {
      formRef.value = ins
    }

    const formItems = computed<FormItem[]>(() => [
      {
        type: 'input',
        label: '设备号：',
        field: 'dvrId',
        initValue: 'fh92r23owhnrf92w3h',
        attrs: {
          maxlength: 30,
          placeholder: '请输入设备号'
        },
        slots: {
          suffix: () => <Iconify icon="ep:calendar" />
        }
      },
      {
        type: 'select',
        label: '审核状态：',
        field: 'reviewStatus',
        attrs: {
          placeholder: '请选择审核状态',
          options: [
            {
              label: '审核通过',
              value: 'PASSED'
            },
            {
              label: '审核拒绝',
              value: 'REJECT'
            }
          ],
          onChange: (val: string) => {
            console.log('审核状态改变', val)
            formData.value.dvrId = 'xxxxxxx'
          }
        },
        slots: {
          header: () => <div>标题</div>
        }
      }
    ])

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
    const formData = ref()

    return () => (
      <div>
        <div>1111</div>
        <JsonForm
          formItems={formItems.value}
          v-model:formData={formData.value}
          rules={rules}
          label-width="120px"
          getFormInstance={getFormInstance}
        />
      </div>
    )
  }
})
