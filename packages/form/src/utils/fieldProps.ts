import type { PropType } from 'vue'

/**
 * Vue 组件 Props 定义
 * 给每个具体的表单组件传递的 Props
 */
export default {
  // 设计器模式（编辑/拖拽）：drag: true
  // 用户填写模式（正式填写）：drag: false 或 预览模式
  drag: {
    type: Boolean,
    default: false
  },
  // 整个表单的 formState
  data: {
    type: Object as PropType<Recordable>,
    required: true,
    default: () => ({})
  },
  // 当前表单项的配置对象 整个 Item 配置
  item: {
    type: Object,
    default: () => ({})
  },
  // 标签（label）的位置对齐方式，比如顶部、左侧等
  labelalign: {
    type: String,
    default: 'top'
  },
  // 标签的宽度，用于自定义标签的显示宽度
  labelWidth: {
    type: Number
  },
  // 标签后缀，通常用于显示在标签文本后，默认为冒号
  suffix: {
    type: String,
    default: ':'
  },
  // 表单项的尺寸大小，比如 small、medium、large
  size: {
    type: String as PropType<'small' | 'default' | 'large'>,
    default: 'small'
  },
  // 自定义样式字符串，用于设置表单项的样式
  styles: {
    type: String,
    default: ''
  },
  // 表单项的 CSS 类名列表，可以用于动态设置样式类
  csslist: {
    type: Object as PropType<string[]>,
    default: () => []
  }
}
