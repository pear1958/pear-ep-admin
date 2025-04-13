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
        initValue: '19832h3129u',
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
      // 使用setTimeout模拟异步
      setTimeout(() => {
        // unref(formRef).setFieldsValue({ amount: 200 })
        unref(formData).comment = 30
      }, 2000)
    })

    return () => (
      <div class="bg-[#ffffff] h-full p-4">
        <JsonForm
          formItems={formItems.value}
          formData={formData.value}
          onChange={onChange}
          label-width="120px"
          getFormInstance={getFormInstance}
          onSubmit={submit}
          // columns={3}
        />
      </div>
    )
  }
})
