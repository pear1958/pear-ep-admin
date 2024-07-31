import { BreakPoint } from '../Grid/type'
import { ColumnProps } from '../TablePro/type'

export interface SearchFormProps {
  searchParams?: Recordable // v-model的搜索参数
  columns?: any[] // 搜索配置列
  search: (params: Recordable | null) => void
  reset: (params: Recordable | null) => void
  searchCols: number | Record<BreakPoint, number>
}

export interface SearchFormItemProps {
  column: ColumnProps
  searchParams: Recordable
}
