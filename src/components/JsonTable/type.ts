import { ExtractPropTypes } from 'vue'
import { FormInstance } from 'element-plus'
import { TableColumnCtx } from 'element-plus/es/components/table/src/table-column/defaults'
import { JsonFormProps } from '../JsonForm/type'
import { props } from '.'
import { JsxNode } from '@/types/common'

export type JsonTableProps = ExtractPropTypes<typeof props>

export interface SuccessCbRes {
  list: Recordable[]
  total: number
}

export interface Column extends TableColumnCtx<Recordable> {
  customRender?: ({ text, record, index, column }) => any
  slots?: Recordable<() => JsxNode>
}

export interface Toolbar {
  title?: string
  buttons?: JsxNode
}

export interface Fields {
  // 接口传参时给的字段名称
  pageNumField?: string
  pageSizeField?: string
  // 接口返回时取的字段名称 eg: name1.name2 支持多级
  dataField?: string
  totalField?: string
}

// export interface SearchbarProps {
//   /**
//    * JsonForm组件的props属性
//    */
//   jsonFormAttrs?: JsonFormProps
//   /**
//    * 搜索之前的回调函数, 如果回调返回值为非真值, 则不会调用对应的搜索方法
//    */
//   beforeSearch?: (params?: Recordable) => boolean
//   /**
//    * @description 指定搜索按钮是否禁用
//    * @default false
//    */
//   disabled?: boolean
//   /**
//    * @description 指定在执行重置操作后是否保留初始值
//    * @default false
//    */
//   keepInitValue?: boolean
// }
