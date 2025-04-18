import { Component, ComponentPublicInstance, CSSProperties, VNode, ExtractPropTypes } from 'vue'
import { FormInstance, FormItemProps } from 'element-plus'
import { props } from '.'

export type JsonFormProps = ExtractPropTypes<typeof props>

// export type Slot = JSX.Element | JsxNode

// 组件定义、组件实例 或 VNode
export type JsxNode = Component | ComponentPublicInstance | VNode

export interface FormRef extends FormInstance {
  setFieldsValue: (params: Recordable) => void
}

export type FormItemType =
  | 'input'
  | 'input-number'
  | 'input-tag'
  | 'select'
  | 'cascader'
  | 'radio-group'
  | 'radio'
  | 'checkbox-group'
  | 'checkbox'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'autocomplete'
  | 'color-picker'
  | 'mention'
  | 'rate'
  | 'select-v2'
  | 'switch'
  | 'transfer'
  | 'tree-select'
  | 'upload'
  | 'component'

export interface FormItem {
  /**
   * 表单字段控件类型
   * 非表单控件, 建议使用 type: 'component' 实现
   */
  type: FormItemType
  /**
   * 子元素控件类型  可以不传, 默认使用最通用的控件类型
   * 比如 el-radio-group -> el-radio, 而不是 el-radio-button
   */
  childType?: 'option' | 'radio' | 'radio-button' | 'checkbox' | 'checkbox-button'
  /**
   * 标签名称, 可以自定义组件
   */
  label: string | JsxNode
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
  component?: JsxNode
  /**
   * 控制字段是否显示, 如果隐藏, 界面不可见, 提交的时候也不会被提交
   */
  show?: boolean
  /**
   * 同上, 但是在提交的时候会被提交, 暂不实现
   */
  // visible?: boolean
  /**
   * 用于设置字段的初始值
   */
  initValue?: unknown
  /**
   * el-form-item的样式
   */
  style?: CSSProperties
  /**
   * 保留原组件的插槽功能
   */
  slots?: Recordable<() => JsxNode>
}
