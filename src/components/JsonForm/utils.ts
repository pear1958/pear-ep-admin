import { FormItem } from './type'

// 获取响应式设置
export const getResponsive = (item: FormItem) => {
  const r = item.responsive
  return {
    span: r?.span || 1,
    offset: r?.offset ?? 0,
    xs: r?.xs,
    sm: r?.sm,
    md: r?.md,
    lg: r?.lg,
    xl: r?.xl
  }
}
