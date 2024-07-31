import {
  onMounted,
  onUnmounted,
  onActivated,
  onDeactivated,
  ref,
  useSlots,
  VNodeArrayChildren,
  VNode,
  ComputedRef
} from 'vue'
import { BreakPoint, GridProps } from './type'

export const useGrid = () => {
  const breakPoint = ref<BreakPoint>('xl')
  const hiddenIndex = ref(-1) // 要开始折叠的 index
  const slots = useSlots().default!()

  onMounted(() => {
    setBreakPoint({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent)
    window.addEventListener('resize', setBreakPoint)
  })

  onActivated(() => {
    setBreakPoint({ target: { innerWidth: window.innerWidth } } as unknown as UIEvent)
    window.addEventListener('resize', setBreakPoint)
  })

  const setBreakPoint = (e: UIEvent) => {
    const width = (e.target as Window).innerWidth

    switch (!!width) {
      case width < 768:
        breakPoint.value = 'xs'
        break

      case width >= 768 && width < 992:
        breakPoint.value = 'sm'
        break

      case width >= 992 && width < 1200:
        breakPoint.value = 'md'
        break

      case width >= 1200 && width < 1920:
        breakPoint.value = 'lg'
        break

      case width >= 1920:
        breakPoint.value = 'xl'
        break
    }
  }

  const findIndex = (props: GridProps, gridCols: ComputedRef<number>) => {
    const fields: VNodeArrayChildren = []
    let suffix: VNode | null = null

    slots.forEach((slot: any) => {
      // suffix
      if (
        typeof slot.type === 'object' &&
        slot.type.name === 'GridItem' &&
        slot.props?.suffix !== undefined
      ) {
        suffix = slot
      }

      // slot children
      if (typeof slot.type === 'symbol' && Array.isArray(slot.children)) {
        fields.push(...slot.children)
      }
    })

    // 计算 suffix 所占用的列
    let suffixCols = 0

    if (suffix) {
      suffixCols =
        ((suffix as VNode).props![breakPoint.value]?.span ?? (suffix as VNode).props?.span ?? 1) +
        ((suffix as VNode).props![breakPoint.value]?.offset ?? (suffix as VNode).props?.offset ?? 0)
    }

    try {
      let find = false

      fields.reduce((prev = 0, current, index) => {
        prev +=
          ((current as VNode)!.props![breakPoint.value]?.span ??
            (current as VNode)!.props?.span ??
            1) +
          ((current as VNode)!.props![breakPoint.value]?.offset ??
            (current as VNode)!.props?.offset ??
            0)

        if (Number(prev) > props.collapsedRows * gridCols.value - suffixCols) {
          hiddenIndex.value = index
          find = true
          throw 'find it'
        }

        return prev
      }, 0)
      if (!find) hiddenIndex.value = -1
    } catch (e) {
      // console.warn(e);
    }
  }

  onUnmounted(() => {
    window.removeEventListener('resize', setBreakPoint)
  })

  onDeactivated(() => {
    window.removeEventListener('resize', setBreakPoint)
  })

  return {
    breakPoint,
    hiddenIndex,
    findIndex
  }
}
