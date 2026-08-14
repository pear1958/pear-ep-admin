import { computed, defineComponent, h, reactive, ref } from 'vue'
import { FormInstance, FormRules } from 'element-plus'
import { Icon } from '@iconify/vue'
import { delay } from 'pear-common-utils'
import JsonForm from '@/components/JsonForm'
import { FormItem } from '@/components/JsonForm/type'
import LabelComponent from './components/LabelComponent'
import Badge from './components/Badge'

export default defineComponent({
  name: 'AddEdit',
  emits: ['refresh'],
  setup(_, { emit, expose }) {
    const formRef = ref()
    const getFormInstance = (ins: FormInstance) => {
      formRef.value = ins
    }
    const formData = ref<Recordable>({})
    const showRejectReason = ref(false)

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
          suffix: () => h(<Icon icon="ep:calendar" />)
        }
        // style: {
        //   border: '1px solid red'
        // }
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
            showRejectReason.value = val === 'REJECT'
            formData.value.accidentType = ['SUSPECTED_ACCIDENT']
            formData.value.comment++
          }
        },
        slots: {
          header: () => <div>标题</div>
        }
        // formItemAttrs: {
        //   labelWidth: '120px',
        // }
      },
      {
        type: 'input',
        label: '拒绝原因：',
        field: 'rejectReason',
        show: showRejectReason.value,
        attrs: {
          maxlength: 30,
          placeholder: '请输入拒绝原因'
        }
      },
      {
        type: 'select',
        label: h(LabelComponent),
        field: 'accidentType',
        attrs: {
          multiple: true,
          clearable: true,
          placeholder: '请选择事故类型',
          options: [
            {
              label: '疑似事故',
              value: 'SUSPECTED_ACCIDENT'
            },
            {
              label: '事故',
              value: 'ACCIDENT'
            }
          ]
        }
      },
      {
        type: 'component',
        component: <Badge text="评论" v-model={formData.value.comment} />,
        label: '自定义组件：',
        field: 'comment'
      },
      {
        type: 'radio-group',
        label: '性别：',
        field: 'radio-group',
        attrs: {
          options: [
            {
              label: '男',
              value: 1
            },
            {
              label: '女',
              value: 2
            }
          ]
        }
      },
      {
        type: 'radio-group',
        children: 'radio-button',
        label: '水果：',
        field: 'radio-group-2',
        initValue: 1,
        attrs: {
          options: [
            {
              label: '苹果',
              value: 1
            },
            {
              label: '橘子',
              value: 2
            }
          ]
        }
      },
      {
        type: 'checkbox-group',
        label: '复选框：',
        arrayWithString: true,
        field: 'checkbox-group',
        attrs: {
          options: [
            {
              label: '苹果',
              value: 1
            },
            {
              label: '香蕉',
              value: 2
            },
            {
              label: '梨',
              value: 3
            }
          ]
        }
      },
      {
        type: 'checkbox-group',
        children: 'checkbox-button',
        label: '多选：',
        field: 'checkbox-group-2',
        initValue: [1],
        attrs: {
          options: [
            {
              label: '苹果',
              value: 1
            },
            {
              label: '香蕉',
              value: 2
            },
            {
              label: '梨',
              value: 3
            }
          ]
        }
      },
      {
        type: 'date-picker',
        label: '日期范围选择：',
        field: 'date-picker',
        attrs: {
          type: 'daterange',
          'range-separator': '至',
          'start-placeholder': '起始日期',
          'end-placeholder': '结束日期'
        }
      },
      {
        type: 'date-picker',
        label: '时间范围选择：',
        field: 'date-time-picker',
        span: 2,
        attrs: {
          type: 'datetimerange',
          'range-separator': '至',
          'start-placeholder': '起始时间',
          'end-placeholder': '结束时间'
        }
      }
      // {
      //   type: 'daterange',
      //   label: '申请时间',
      //   field: 'applyTime',
      //   startFieldName: 'applyTimeStart',
      //   endFieldName: 'applyTimeEnd',
      //   attrs: {
      //     format: 'YYYY-MM-DD HH:mm:ss',
      //     valueFormat: 'YYYY-MM-DD HH:mm:ss',
      //     placeholder: ['开始时间', '结束时间'],
      //     showTime: true,
      //     allowEmpty: [true, true]
      //   }
      // }
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

    const handleSubmit = async () => {
      try {
        // mock-api
        await delay(2000)
        emit('refresh')
        return true // or false
      } catch (e) {
        console.log('e', e)
      }
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
