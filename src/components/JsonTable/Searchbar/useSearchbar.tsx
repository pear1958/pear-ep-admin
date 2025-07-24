import { computed, ref, unref } from 'vue'
import { SearchbarProps, SearchbarItem } from './type'
import { BreakPoint } from '../../Grid/type'

const useSearchbar = (_: SearchbarProps) => {
  // 获取响应式设置
  const getResponsive = (item: SearchbarItem) => {
    const r = item.responsive
    return {
      span: item.span || 1,
      offset: item.offset ?? 0,
      xs: r?.xs,
      sm: r?.sm,
      md: r?.md,
      lg: r?.lg,
      xl: r?.xl
    }
  }

  // 是否默认折叠搜索项
  const collapsed = ref(false)
  // 获取响应式断点
  const gridRef = ref()
  const breakPoint = computed<BreakPoint>(() => unref(gridRef)?.breakPoint)

  // 判断是否显示 展开/收起 按钮
  const collapseVisible = computed(() => {
    let show = false

    _.formItems
      .filter(item => item.show !== false)
      .reduce((prev, current) => {
        const r = current.responsive || {}
        const bp = breakPoint.value
        prev += (r[bp]?.span ?? current?.span ?? 1) + (r[bp]?.offset ?? current?.offset ?? 0)

        const maxColumn = typeof _.columns === 'number' ? _.columns : _.columns[bp]
        if (prev >= maxColumn) show = true

        return prev
      }, 0)

    return show
  })

  const disabled = ref(false)

  return {
    getResponsive,
    collapsed,
    gridRef,
    collapseVisible,
    disabled
  }
}

export default useSearchbar
