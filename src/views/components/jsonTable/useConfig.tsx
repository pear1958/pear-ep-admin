import { computed, ref } from 'vue'
import { Icon } from '@iconify/vue'
import { FormItem } from '@/components/JsonForm/type'
import LabelComponent from './components/LabelComponent'
import Badge from './components/Badge'
import { formatDate } from '@/utils'

const useConfig = () => {
  const jsonTableRef = ref()
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
      rules: [{ required: true, message: '请输入设备号', trigger: 'change' }],
      // formItemAttrs: {
      //   labelWidth: '120px'
      // },
      slots: {
        suffix: () => <Icon icon="ep:calendar" />
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
          formData.value.comment = 12
        }
      },
      slots: {
        header: () => <div>标题</div>
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
  ])

  const columns = ref([
    {
      type: 'expand',
      slots: {
        default: (props: Recordable) => {
          return <div>{JSON.stringify(props.row)}</div>
        }
      }
    },
    {
      type: 'index'
    },
    {
      type: 'selection',
      selectable: (row: Recordable) => row.index >= 2
    },
    {
      type: 'default',
      prop: 'id',
      label: '记录ID',
      slots: {
        header: () => {
          return <el-input placeholder="请输入记录ID" />
        }
      }
    },
    {
      prop: 'shopName',
      label: '4S店',
      customRender: ({ text }) => {
        return (
          <el-button type="primary" link>
            {text}
          </el-button>
        )
      }
    },
    {
      prop: 'benefitName',
      label: '权益名称'
    },
    {
      prop: 'insureTime',
      label: '投保时间',
      customRender({ record }) {
        return formatDate(record.insureTime, 'YYYY-MM-DD HH:mm:ss')
      }
    },
    {
      prop: 'vin',
      label: '车架号'
    },
    {
      prop: 'plateNumber',
      label: '车牌号'
    },
    {
      prop: 'vehicleModel',
      label: '品牌车型',
      width: 300
    },
    {
      label: '操作',
      width: 180,
      fixed: 'right',
      align: 'center',
      customRender({ record }) {
        return (
          <div>
            <el-button type="primary" link onClick={() => handleDetail(record)}>
              详情
            </el-button>
            <el-button type="primary" link>
              编辑
            </el-button>
            <el-button type="primary" link>
              删除
            </el-button>
          </div>
        )
      }
    }
  ])

  // const beforeSearch = () => {
  //   // do something
  //   return true
  // }

  // const success = (res: Recordable) => {
  //   console.log('res', res)
  //   return {
  //     list: res.list.data,
  //     total: res.total
  //   }
  // }

  const handleDetail = (row: Recordable) => {
    console.log('row', row)
  }

  return {
    jsonTableRef,
    formData,
    columns,
    formItems
    // beforeSearch,
    // success
  }
}

export default useConfig
