import { ExtractPropTypes } from 'vue'
import { FormInstance } from 'element-plus'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { JsonFormProps } from '../JsonForm/type'
import { props } from '.'
import { JsxNode } from '@/types/common'

export type JsonTableProps = ExtractPropTypes<typeof props>

export interface Column extends TableColumnCtx<Recordable> {
  customRender?: ({ text, record, index, column }) => any
  slots?: Recordable<() => JsxNode>
}

export interface Toolbar {
  title?: string
  buttons?: JsxNode
}

export interface FieldMap {
  // 接口传参时给的字段名称
  pageNumField?: string
  pageSizeField?: string
  // 接口返回时取的字段名称 eg: name1.name2 支持多级
  dataField?: string
  totalField?: string
}

export interface SearchbarProps {
  /**
   * JSONForm组件相关的props属性, 详见与JSONFormProps定义
   */
  jsonFormAttrs?: JsonFormProps
  /**
   * 搜索回调方法, 在初始化完成或异步初始值设置完成后会自动触发, 无需手动调用
   */
  search?: (params?: Recordable) => void
  /**
   * 点击重置之前的回调函数
   */
  beforeReset?: (form: FormInstance) => void
  /**
   * 点击搜索按钮时执行的回调函数, 如果回调返回值为非真值, 则不会调用对应的搜索方法
   */
  beforeClickSearch?: () => boolean
  /**
   * 搜索之前的回调函数, 如果回调返回值为非真值, 则不会调用对应的搜索方法
   */
  beforeSearch?: (params?: Recordable) => boolean
  /**
   * @description 指定搜索框是否不可用
   * @default false
   */
  disabled?: boolean
  /**
   * @description 指定在执行重置操作后是否保留初始值
   * @default false
   */
  keepInitValue?: boolean
  /**
   * 用于双向绑定搜索框中表单的值的对象, 可用于搜索框联动
   */
  formData?: Recordable
  /**
   * @description 是否自动调用搜索方法
   * @default true
   */
  // autoSearch?: boolean
}
