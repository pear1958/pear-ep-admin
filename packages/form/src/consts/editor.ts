import { fields, FormConfig } from './fieldsMap'

interface FormRule {
  fieldName: any[]
  label: any[]
}

/**
 * 组件名称枚举
 */
type ComponentListEnum = Omit<keyof typeof window.VApp.$formcomponents, 'symbol'>

/**
 * 实际渲染的 Item 配置
 */
export interface AllFormItem {
  /**
   * 组件渲染唯一标识
   */
  ControlType: ComponentListEnum
  /**
   * 表单配置所需的表单配置列表
   */
  controlItems: FormConfig[]
  /**
   * 表单配置
   */
  data: fields
  /**
   * 获取配置列表和配置方法列表
   */
  formConfig: {
    data: () => fields
    morenConfig: () => FormConfig[]
  }
  /**
   * 组件icon图标
   */
  icon: string
  /**
   * 组件唯一id
   */
  id: string
  /**
   * 组件名称
   */
  nameCn: string
  /**
   * 是否是布局表单
   */
  layout: boolean
  /**
   * 规则
   */
  rules: FormRule
}
