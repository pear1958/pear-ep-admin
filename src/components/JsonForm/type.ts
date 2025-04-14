import type { DefineComponent, ExtractPropTypes } from 'vue'
import type { FormInstance, FormItemProps } from 'element-plus'
import { props } from '.'

export type JsonFormProps = ExtractPropTypes<typeof props>

export interface SpanOffset {
  span?: number
  offset?: number
}

export interface FormRef extends FormInstance {
  setFieldsValue: (params: Recordable) => void
}

export interface FormItem {
  /**
   * 表单字段控件类型
   */
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
  /**
   * 子元素控件类型  可以不传, 默认使用最通用的控件类型
   * 比如 el-radio-group -> el-radio, 而不是 el-radio-button
   */
  childType?: 'option' | 'radio'
  /**
   * 标签名称, 可以自定义组件
   */
  label: string | DefineComponent
  /**
   * 字段名
   */
  field: string
  /**
   * 对应控件的属性, 具体可查看ep文档中对应的控件的api
   */
  attrs?: Recordable
  /**
   * element-plus中Form.Item的属性值
   */
  formItemAttrs?: FormItemProps
  /**
   * 自定义组件
   */
  component?: DefineComponent
  /**
   * 控制字段是否显示, 如果隐藏, 界面不可见, 提交的时候也不会被提交
   */
  show?: boolean
  /**
   * 同上, 但是在提交的时候会被提交, 暂不实现
   */
  // visible?: boolean
  /**
   * 单独设置FormItem的布局
   */
  span?: number
  offset?: number
  responsive?: {
    xs?: SpanOffset
    sm?: SpanOffset
    md?: SpanOffset
    lg?: SpanOffset
    xl?: SpanOffset
  }
  /**
   * 用于设置字段的初始值
   */
  initValue?: unknown
}
