import type { DefineComponent, ExtractPropTypes } from 'vue'
import type { FormItemProps } from 'element-plus'
import { props } from '.'

export type JsonFormProps = ExtractPropTypes<typeof props>

export interface SpanOffset {
  span?: number
  offset?: number
}

export interface FormItem {
  // 表单字段控件类型
  type:
    | 'input'
    | 'select'
    | 'password'
    | 'datetime'
    | 'text'
    | 'search'
    | 'component'
    | 'date'
    | 'daterange'
    | 'time'
    | 'radio'
    | 'checkbox'
    | 'number'
    | 'textarea'
    | 'group'
    | 'cascader'
  // 标签名称, 可以自定义组件
  label: string | DefineComponent
  // 字段名
  field: string
  // 对应控件的属性, 具体可查看ep文档中对应的控件的api
  attrs?: Recordable
  // element-plus中Form.Item的属性值
  formItemAttrs?: FormItemProps
  // 自定义组件
  component?: DefineComponent
  // 控制字段是否显示, 如果隐藏, 界面不可见, 提交的时候也不会被提交
  show?: boolean
  // 同上, 但是在提交的时候会被提交
  // visible?: boolean
  // 每个可以单独设置responsive
  responsive?: {
    span?: number
    offset?: number
    xs?: SpanOffset
    sm?: SpanOffset
    md?: SpanOffset
    lg?: SpanOffset
    xl?: SpanOffset
  }
  // 用于设置字段的初始值
  initValue?: unknown
}
