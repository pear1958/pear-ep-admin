export type BreakPoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl'

export type GridProps = {
  gap?: number | [number, number]
  cols?: number | Record<BreakPoint, number> // 每行几列
  collapsed?: boolean // 是否折叠
  collapsedRows?: number
}

export type Responsive = {
  span?: number
  offset?: number
}

export type GridItemProps = {
  span?: number
  offset?: number
  suffix?: boolean
  xs?: Responsive
  sm?: Responsive
  md?: Responsive
  lg?: Responsive
  xl?: Responsive
}
