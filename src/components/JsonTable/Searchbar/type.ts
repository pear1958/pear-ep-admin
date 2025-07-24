import { ExtractPropTypes } from 'vue'
import { FormItem } from '../../JsonForm/type'
import { props } from '.'

export type SearchbarProps = ExtractPropTypes<typeof props>

export interface SpanOffset {
  span?: number
  offset?: number
}

export interface SearchbarItem extends FormItem {
  /**
   * 单独设置FormItem的布局, 最大为4
   */
  span?: number
  offset?: number
  responsive?: {
    xs?: SpanOffset
    sm?: SpanOffset
    md?: SpanOffset
    lg?: SpanOffset
    xl?: SpanOffset
  }
}
