<template>
  <RenderTableColumn v-bind="column" />
</template>

<script setup lang="tsx">
import { inject, ref, unref, useSlots } from 'vue'
import { ColumnProps, HeaderRenderScope, RenderScope } from '../types'
import { handleProp } from 'pear-common-utils'
import { filterEnum, formatValue, handleRowAccordingToProp } from '../utils'

defineOptions({
  name: 'TableColWrapper'
})

defineProps<{ column: ColumnProps }>()

const slots = useSlots()

const enumMap = inject('enumMap', ref(new Map()))

// 获取 tag 类型
const getTagType = (item: ColumnProps, scope: RenderScope<any>) => {
  return (
    filterEnum(
      handleRowAccordingToProp(scope.row, item.prop!),
      unref(enumMap).get(item.prop),
      item.fieldNames,
      'tag'
    ) || 'primary'
  )
}

// 渲染表格数据
const renderCellData = (item: ColumnProps, scope: RenderScope<any>) => {
  // 从字典里面过滤出来 || 直接渲染
  return unref(enumMap).get(item.prop) && item.isFilterEnum
    ? filterEnum(
        handleRowAccordingToProp(scope.row, item.prop!),
        unref(enumMap).get(item.prop)!,
        item.fieldNames
      )
    : formatValue(handleRowAccordingToProp(scope.row, item.prop!))
}

// el-table-column 组件只接受两个插槽
// Wrapper组件 可以接受 多个插槽, 但是 只渲染 和当前prop匹配的插槽
const RenderTableColumn = (item: ColumnProps) => {
  return (
    <>
      {item.isShow && (
        <el-table-column
          {...item}
          align={item.align ?? 'center'}
          showOverflowTooltip={item.showOverflowTooltip ?? item.prop !== 'operation'}
        >
          {{
            default: (scope: RenderScope<any>) => {
              // 渲染多级表头
              if (item.children) return item.children.map(child => RenderTableColumn(child))

              // 通过render函数 渲染的内容
              if (item.render) return item.render(scope)

              // 插槽传递的内容
              if (item.prop && slots[handleProp(item.prop)]) {
                return slots[handleProp(item.prop)](scope)
              }

              if (item.tag) {
                return <el-tag type={getTagType(item, scope)}>{renderCellData(item, scope)}</el-tag>
              }

              return renderCellData(item, scope)
            },
            // 除了columnTypes以外, 所有都执行自定义表头
            // https://element-plus.org/zh-CN/component/table.html#%E8%87%AA%E5%AE%9A%E4%B9%89%E8%A1%A8%E5%A4%B4
            header: (scope: HeaderRenderScope<any>) => {
              // tsx传递的header
              if (item.headerRender) return item.headerRender(scope)

              // 插槽传递的header
              if (item.prop && slots[`${handleProp(item.prop)}Header`]) {
                return slots[`${handleProp(item.prop)}Header`]!(scope)
              }

              // 默认显示label
              return item.label
            }
          }}
        </el-table-column>
      )}
    </>
  )
}
</script>
