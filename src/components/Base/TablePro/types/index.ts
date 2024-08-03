import { Ref, VNode } from 'vue'
import { TableColumnCtx } from 'element-plus'
import { BreakPoint, Responsive } from '../../Grid/type'

export type SearchType =
  | 'input'
  | 'input-number'
  | 'select'
  | 'select-v2'
  | 'tree-select'
  | 'cascader'
  | 'date-picker'
  | 'time-picker'
  | 'time-select'
  | 'switch'
  | 'slider'

export interface EnumProps {
  label?: string // 选项框显示的文字
  value?: string | number | boolean | any[] // 选项框值
  disabled?: boolean // 是否禁用此选项
  tagType?: string // 当 tag 为 true 时，此选择会指定 tag 显示类型
  children?: EnumProps[] // 为树形选择时，可以通过 children 属性指定子选项
  [key: string]: any
}

export type SearchRenderScope = {
  searchParams: Recordable
  placeholder: string
  clearable: boolean
  options: EnumProps[]
  data: EnumProps[]
}

export interface SearchProps extends Partial<Record<BreakPoint, Responsive>> {
  el?: SearchType // 当前项搜索框的类型
  label?: string // 当前项搜索框的 label
  props?: any // 搜索项参数，根据 element plus 官方文档来传递，该属性所有值会透传到组件
  key?: string // 当搜索项 key 不为 prop 属性时，可通过 key 指定
  tooltip?: string // 搜索提示
  order?: number // 搜索项排序（从大到小）
  span?: number // 搜索项所占用的列数，默认为 1 列
  offset?: number // 搜索字段左侧偏移列数
  defaultValue?: string | number | boolean | any[] | Ref<any> // 搜索项默认值
  render?: (scope: SearchRenderScope) => VNode // 自定义搜索内容渲染（tsx语法）
  noEnum?: boolean // 不使用枚举, 默认为false
}

export interface fieldNames {
  label: string
  value: string
  children?: string
}

export interface HeaderRenderScope<T = any> extends Recordable {
  $index: number
  column: TableColumnCtx<T>
}

export interface RenderScope<T> extends HeaderRenderScope<T> {
  row: T
}

export type TypeProps = 'index' | 'selection' | 'radio' | 'expand' | 'sort'

export interface ColumnProps<T = any>
  extends Partial<Omit<TableColumnCtx<T>, 'type' | 'children' | 'renderCell' | 'renderHeader'>> {
  type?: TypeProps // 列类型
  search?: SearchProps // 搜索项配置
  fieldNames?: fieldNames // 指定 label && value && children 的 key 值
  isShow?: boolean // 是否显示在表格当中
  isSetting?: boolean // 是否在 ColSetting 中可配置
  children?: ColumnProps<T>[] // 多级表头
  isFilterEnum?: boolean // 当前单元格值是否根据 enum 格式化（示例：enum 只作为搜索项数据）
  headerRender?: (scope: HeaderRenderScope<T>) => VNode // 自定义表头内容渲染（tsx语法）
  render?: (scope: RenderScope<T>) => VNode | string // 自定义单元格内容渲染（tsx语法）
  enum?: EnumProps[] | PromiseFn // 枚举字典
  tag?: boolean | Ref<boolean> // 是否是标签展示
}

export type EnumMap = Map<string, Recordable[]>
