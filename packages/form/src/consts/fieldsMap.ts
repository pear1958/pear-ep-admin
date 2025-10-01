import { AllFormItem } from './editor'

interface fieldTds {
  colspan: number
  rowspan: number
  list: AllFormItem[]
}

interface fieldsTrs {
  tds: fieldTds[]
}

interface Columns {
  list: AllFormItem[]
  span: number
}

export interface fields {
  /**
   * 字段名称
   */
  fieldName: string
  /**
   * 标签名称
   */
  label: string
  /**
   * 提示信息
   */
  tip?: string
  /**
   * 占位内容
   */
  placeholder?: string
  /**
   * 表单显示规则
   */
  showRule: string
  /**
   * 是否必填
   */
  required?: boolean
  /**
   * 校验规则
   */
  rule: string
  /**
   * 默认内容
   */
  default?: string | number | any[]
  type?: number
  size?: string | number
  itemConfig?: any
  formConfig?: any
  /**
   * 表格布局  trs 表示表格的“行”集合，
   */
  trs?: fieldsTrs[]
  /**
   * 用于栅格布局控件（如 Grid）
   */
  columns?: Columns[]
  /**
   * 用于分组类控件，比如折叠面板（Collapse）、标签页（Tabs）
   */
  items?: Columns[]
}

export interface FormConfig {
  ControlType: string // 控件类型，比如 'Text'、'Switch'、'Radio' 等
  data: fields // 控件的详细字段配置（如字段名、标签、校验规则等）
  layout?: boolean // 是否是布局类控件
  dynamic?: boolean // 是否是动态控件
}

// 组件的 单个属性 的 过滤传入配置
export interface Config {
  fieldName: string
  component: string
  label?: string
}

export interface FormConfigReturn {
  // 返回该控件的默认字段配置（比如 label、placeholder、required 等） 也就是 data 字段
  data: () => fields
  // 返回该控件的属性面板字段配置数组，用于渲染属性编辑界面
  morenConfig: () => fields[]
}

type fieldMap =
  | 'default'
  | 'placeholder'
  | 'min'
  | 'max'
  | 'itemConfig'
  | 'type'
  | 'columns'
  | 'infotype'
  | 'effect'
  | 'size'
  | 'color'
  | 'dividerColor'
  | 'InputNumber'
  | 'multiple'
  | 'gutter'

export type morenFields = Partial<Record<fieldMap, FormConfig>>

export const fieldsMap: any = {
  Text: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    placeholder: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: ''
  },
  Info: {
    fieldName: '',
    label: '标签名称',
    title: '标题',
    desc: '文字描述',
    labelShow: false,
    closable: true,
    showIcon: true,
    effect: 'light',
    infotype: 'success',
    showRule: '{}',
    rule: '[]'
  },
  TextArea: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    placeholder: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: ''
  },
  Switch: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    value: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: false
  },
  Slider: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: 0,
    min: 0,
    max: 100
  },
  Grid: {
    fieldName: '',
    label: '标签名称',
    gutter: 0, // 栅格间隔
    showRule: '{}',
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      }
    ]
  },
  TableLayout: {
    fieldName: '',
    label: '标签名称',
    showRule: '{}',
    borderShow: false,
    borderWidth: 1,
    trs: [
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      },
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      }
    ]
  },
  Collapse: {
    fieldName: '',
    label: '标签名称',
    accordion: false,
    name: '折叠面板',
    items: [
      {
        name: '折叠面板',
        list: []
      }
    ]
  },
  Tabs: {
    fieldName: '',
    label: '标签名称',
    name: '标签',
    items: [
      {
        name: 'tab',
        list: []
      }
    ]
  },
  Selected: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    placeholder: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    itemConfig: {
      value: '选项1',
      items: [
        {
          label: '选项1',
          value: '选项1',
          select: true,
          id: 1
        },
        {
          label: '选项2',
          value: '选项2',
          select: false,
          id: 2
        }
      ]
    }
  },
  Selecteds: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    placeholder: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    itemConfig: {
      value: ['选项1'],
      items: [
        {
          label: '选项1',
          value: '选项1',
          select: true,
          id: 1
        },
        {
          label: '选项2',
          value: '选项2',
          select: false,
          id: 2
        }
      ]
    }
  },
  RichText: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    placeholder: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: ''
  },
  Radio: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    value: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: false,
    itemConfig: {
      value: '选项1',
      id: 1,
      items: [
        {
          label: '选项1',
          value: '选项1',
          select: true,
          id: 1
        },
        {
          label: '选项2',
          value: '选项2',
          select: false,
          id: 2
        }
      ]
    }
  },
  KeyValueConfigMult: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    value: '',
    showRule: '{}',
    required: false,
    rule: '[]'
  },
  KeyValueConfig: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    value: '',
    showRule: '{}',
    required: false,
    rule: '[]'
  },
  JsonEditor: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: '[]',
    json: true
  },
  InputNumber: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    placeholder: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: 0,
    type: '1',
    size: 'large'
  },
  Divider: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    color: '#000',
    dividerColor: '#000'
  },
  DateTime: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    placeholder: '1',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: '1'
  },
  Date: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    placeholder: '请输入',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: ''
  },
  ColorSelect: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    placeholder: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: '#409EFF'
  },
  CheckBox: {
    fieldName: '',
    label: '标签名称',
    tip: '',
    value: '',
    showRule: '{}',
    required: false,
    rule: '[]',
    default: false,
    itemConfig: {
      value: ['选项1'],
      items: [
        {
          label: '选项1',
          value: '选项1',
          select: true,
          id: 1
        },
        {
          label: '选项2',
          value: '选项2',
          select: false,
          id: 2
        }
      ]
    }
  }
}

export const beforeBaseFormCofig: () => FormConfig[] = function () {
  return [
    {
      ControlType: 'Text',
      data: {
        fieldName: 'fieldName',
        tip: '',
        label: '字段名称',
        placeholder: '请输入字段名称',
        value: '',
        showRule: '{}',
        required: true,
        rule: '[]'
      }
    },
    {
      ControlType: 'Text',
      data: {
        fieldName: 'label',
        tip: '',
        label: '标签名称',
        placeholder: '请输入标签名称',
        value: '标签名称',
        showRule: '{}',
        required: true,
        rule: '[]'
      }
    }
  ]
}

export const afterBaseFormConfig: () => FormConfig[] = function () {
  return [
    {
      ControlType: 'Switch',
      data: {
        fieldName: 'required',
        tip: '',
        label: '是否必填',
        showRule: '{}',
        required: false,
        rule: '[]'
      }
    },
    {
      ControlType: 'TextArea',
      data: {
        fieldName: 'tip',
        tip: '',
        label: '提示',
        placeholder: '请输入提示',
        value: '标签名称',
        showRule: '{}',
        required: false,
        rule: '[]'
      }
    },
    {
      ControlType: 'Rule',
      data: {
        fieldName: 'rule',
        tip: '',
        label: '校验规则',
        showRule: '{}',
        required: false,
        rule: '[]',
        default: '[]'
      }
    },
    {
      ControlType: 'ShowRule',
      data: {
        fieldName: 'showRule',
        tip: '',
        label: '显示条件',
        showRule: '{}',
        required: false,
        rule: '[]',
        default: '[]'
      }
    },
    {
      ControlType: 'Action',
      data: {
        fieldName: 'action',
        tip: '',
        label: '动作面板',
        showRule: '{}',
        required: false,
        rule: '[]',
        default: '{}'
      }
    }
  ]
}
