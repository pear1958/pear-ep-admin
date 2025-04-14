import { computed, defineComponent, onMounted, ref, unref } from 'vue'
import { FormInstance } from 'element-plus'
import JsonForm from '@/components/JsonForm'
import LabelComponent from './LabelComponent.vue'
import Badge from './Badge.vue'

export default defineComponent({
  name: 'jsonForm',
  setup() {
    const formData = ref<Recordable>({})
    const showRejectReason = ref(false)
    const formRef = ref()
    const getFormInstance = (ins: FormInstance) => {
      formRef.value = ins
    }

    // or:
    // watch(formData, getFormItems, { deep: true, immediate: true });
    // const getFormItems = (formData: Recordable) => {
    //   const items = [] // to-do
    //   formItems.value = items
    // }

    const formItems = computed(() => [
      {
        type: 'input',
        label: '设备号：',
        field: 'dvrId',
        initValue: 'fh92r23owhnrf92w3h',
        attrs: {
          maxlength: 30,
          placeholder: '请输入设备号'
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
            showRejectReason.value = val === 'REJECT'
            formData.value.accidentType = ['SUSPECTED_ACCIDENT']
            formData.value.comment++
          }
        },
        formItemAttrs: {
          // labelWidth: '120px'
        }
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
        label: <LabelComponent />,
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
        childType: 'radio-button',
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
        field: 'checkbox-group-2',
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
        childType: 'checkbox-button',
        label: '多选：',
        field: 'checkbox-group',
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

    const onChange = (params: Recordable) => {
      // console.log('params', params)
    }

    const submit = (params: Recordable) => {
      console.log('params', params)
      unref(formRef).validate((valid: boolean, fields) => {
        if (valid) {
          console.log('submit!')
        } else {
          console.log('error submit!', fields)
        }
      })
    }

    // 异步初始值
    onMounted(() => {
      setTimeout(() => {
        unref(formRef).setFieldsValue({ comment: 32 })
        // 建议最好不要再上层修改formData的值
        // unref(formData).comment = 30
      }, 2000)
    })

    return () => (
      <div class="bg-[#ffffff] h-full p-4 dark:bg-dark-content">
        <JsonForm
          formItems={formItems.value}
          formData={formData.value}
          onChange={onChange}
          label-width="120px"
          getFormInstance={getFormInstance}
          onSubmit={submit}
          showSearch
          // columns={3}
        />
      </div>
    )
  }
})
