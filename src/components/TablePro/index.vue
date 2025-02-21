<template>
  <div class="h-full p-5 flex flex-col box-border table-pro">
    <SearchForm
      v-show="showSearch"
      :columns="searchColumns"
      :searchParams="searchParams"
      :searchCols="searchCols"
      :search="_search"
      :reset="_reset"
    />

    <div class="flex-between mt-2 mb-[15px] header-box">
      <div class="flex flex-wrap gap-y-[15px] gap-x-3">
        <slot
          name="tableHeader"
          :isSelected="isSelected"
          :selectList="selectList"
          :selectIdList="selectIdList"
        />
      </div>

      <div v-if="toolButton" class="flex gap-y-[15px] gap-x-3">
        <slot name="toolButton">
          <el-button
            v-if="showToolButton('refresh')"
            :icon="Refresh"
            circle
            @click="getTableList"
          />
          <el-button
            v-if="showToolButton('setting') && columns.length"
            :icon="Operation"
            circle
            @click="openColSetting"
          />
          <el-button
            v-if="showToolButton('search') && searchColumns?.length"
            :icon="Search"
            circle
            @click="showSearch = !showSearch"
          />
        </slot>
      </div>
    </div>

    <el-table
      ref="tableRef"
      v-bind="$attrs"
      :id="uuid"
      :data="processTableData"
      :border="border"
      :row-key="rowKey"
      @selection-change="onSelectChange"
      v-loading="loading"
      class="table-box"
    >
      <!-- 默认插槽 -->
      <slot />

      <template v-for="item in tableColumns" :key="item">
        <!-- selection || radio || index || expand || sort -->
        <el-table-column
          v-if="item.type && columnTypes.includes(item.type)"
          v-bind="item"
          :align="item.align ?? 'center'"
          :reserve-selection="item.type == 'selection'"
        >
          <template #default="scope">
            <!-- expand -->
            <template v-if="item.type == 'expand'">
              <component :is="item.render" v-bind="scope" v-if="item.render" />
              <slot v-else :name="item.type" v-bind="scope" />
            </template>

            <!-- radio -->
            <el-radio v-if="item.type == 'radio'" v-model="radio" :label="scope.row[rowKey]">
              <i></i>
            </el-radio>

            <!-- sort -->
            <el-tag v-if="item.type == 'sort'" class="cursor-move">
              <el-icon>
                <DCaret />
              </el-icon>
            </el-tag>
          </template>
        </el-table-column>

        <!-- 1.向TableColumn传递所有的父组件插槽 -->
        <!-- 2.传递的内容: 直接透传, 不作任何的改变 -->
        <TableColWrapper v-else :column="item">
          <template v-for="slot in Object.keys($slots)" #[slot]="scope">
            <slot :name="slot" v-bind="scope" />
          </template>
        </TableColWrapper>
      </template>

      <!-- 插入表格最后一行之后的插槽 -->
      <template #append>
        <slot name="append" />
      </template>

      <!-- 无数据 -->
      <template #empty>
        <div class="leading-7">
          <slot name="empty">
            <img src="@/assets/imgs/notData.png" alt="notData" />
            <div>暂无数据</div>
          </slot>
        </div>
      </template>
    </el-table>

    <!-- 分页组件 -->
    <slot name="pagination">
      <div class="flex-end mt-5">
        <Pagination
          v-if="pagination"
          :pageParams="pageParams"
          :handle-current-change="handleCurrentChange"
          :handle-size-change="handleSizeChange"
        />
      </div>
    </slot>

    <!-- 列设置 -->
    <ColSetting v-if="toolButton" ref="colRef" :settingColumns="settingColumns" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, toRef, unref, provide, onMounted, Ref } from 'vue'
import { ElTable } from 'element-plus'
import { Refresh, Operation, Search, DCaret } from '@element-plus/icons-vue'
import Sortable from 'sortablejs'
import { genUUID, isArray, isEmpty, isFunction, handleProp } from 'pear-common-utils'
import SearchForm from '../SearchForm/index.vue'
import { useSelection } from './hooks/useSelection'
import { useTable } from './hooks/useTable'
import { ColumnProps, EnumMap, TypeProps } from './types'
import { BreakPoint } from '../Grid/type'
import TableColWrapper from './components/TableColWrapper.vue'
import Pagination from './components/Pagination.vue'
import ColSetting from './components/ColSetting.vue'
import { ResultData } from '@/api/types'
import { Table } from './types/table'

export interface TableProProps {
  columns: ColumnProps[] // 列配置项  ==> 必传
  data?: any[] // 静态 table data 数据, 若存在则不会使用 requestApi 返回的 data ==> 非必传
  api?: (params: any) => Promise<any> // 请求表格数据的 api ==> 非必传
  apiAuto?: boolean // 是否自动执行请求 api ==> 非必传（默认为true）
  requestError?: (params: any) => void // 表格 api 请求错误监听 ==> 非必传
  dataCallback?: (data: any) => any // 返回数据的回调函数, 可以对数据进行处理 ==> 非必传
  pagination?: boolean // 是否需要分页组件 ==> 非必传（默认为true）
  fixedParams?: any // 初始化请求参数 ==> 非必传（默认为{}）
  border?: boolean // 是否带有纵向边框 ==> 非必传（默认为true）
  toolButton?: ('refresh' | 'setting' | 'search')[] | boolean // 是否显示表格功能按钮 ==> 非必传（默认为true）
  rowKey?: string // 行数据的 Key, 用来优化 Table 的渲染, 当表格数据多选时, 所指定的 id ==> 非必传（默认为 id）
  searchCols?: number | Record<BreakPoint, number> // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
  paramsKeyMap?: Table.ParamsKeyMap
}

// 接受父组件参数, 配置默认值
const props = withDefaults(defineProps<TableProProps>(), {
  columns: () => [],
  apiAuto: true,
  pagination: true,
  fixedParams: {},
  border: true,
  toolButton: true,
  rowKey: 'id',
  searchCols: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
})

const emit = defineEmits<{
  search: [Recordable]
  reset: []
  dragSort: [{ newIndex?: number; oldIndex?: number }]
}>()

// 表格多选 Hooks
const { onSelectChange, selectList, selectIdList, isSelected } = useSelection(props.rowKey)

// 表格操作 Hooks
const {
  tableData,
  loading,
  pageParams,
  searchParams,
  totalParams,
  searchInitParams,
  initTable,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange
} = useTable(
  props.api,
  props.fixedParams,
  props.pagination,
  props.paramsKeyMap,
  props.dataCallback,
  props.requestError
)

const showSearch = ref(true)

const _search = () => {
  search()
  emit('search', totalParams)
}

const _reset = () => {
  reset()
  emit('reset')
}

const tableColumns = toRef<ColumnProps[]>(props.columns)

// 定义 enumMap 存储 字典 值
const enumMap: Ref<EnumMap> = ref(new Map())

provide('enumMap', enumMap)

// 过滤需要搜索的配置项 && 排序
const searchColumns = computed(() => {
  return flatColumns.value
    ?.filter(item => item.search?.el || item.search?.render)
    .sort((a, b) => a.search!.order! - b.search!.order!)
})

const flatColumns = computed(() => flatColumnsFunc(tableColumns.value))

// 扁平化 columns 的方法
const flatColumnsFunc = (columns: ColumnProps[], flatArr: ColumnProps[] = []) => {
  columns.forEach(col => {
    if (col.children?.length) flatArr.push(...flatColumnsFunc(col.children))

    flatArr.push(col)

    // 为 column 添加默认值
    col.isShow = col.isShow ?? true
    col.isSetting = col.isSetting ?? true
    col.isFilterEnum = col.isFilterEnum ?? true

    col.enum && setEnumMap(col)
  })

  return flatArr.filter(item => !item.children?.length)
}

/**
 * 函数不会重复执行 & 数组相同不同重复设置
 * 如果需要更新 enum 的值, 请重新设置 enum 的值为数组
 */
const setEnumMap = ({ prop, enum: enumValue }: ColumnProps) => {
  // 如果当前 enumMap 存在相同的值 return
  if (
    unref(enumMap).has(prop) &&
    (isFunction(enumValue) || unref(enumMap).get(prop) === enumValue)
  ) {
    return
  }

  // 当前 enum 为静态数据，则直接存储到 enumMap
  if (isArray(enumValue)) unref(enumMap).set(prop, enumValue)

  // 下面的http是异步的, 避免 tableColumns 改变, 重复执行请求, 下次进来就被上面第一个判断给拦截了
  unref(enumMap).set(prop, [])

  if (isFunction(enumValue)) {
    enumValue()
      .then((res: ResultData<Recordable[]>) => {
        const { data } = res
        Array.isArray(data) && unref(enumMap).set(prop, data)
      })
      .catch(err => {
        console.log('err', err)
      })
  }
}

// 设置 搜索表单默认排序 && 搜索表单项的默认值
unref(searchColumns)?.forEach((column, index) => {
  column.search!.order = column.search?.order ?? index + 2

  const key = column.search?.key ?? handleProp(column.prop!)

  const defaultValue = column.search?.defaultValue

  if (!isEmpty(defaultValue)) {
    unref(searchParams)[key] = defaultValue
    unref(searchInitParams)[key] = defaultValue
  }
})

// 初始化表格数据 && 拖拽排序
onMounted(() => {
  dragSort()
  props.apiAuto && initTable()
  props.data && (unref(pageParams).total = props.data.length)
})

const tableRef = ref<InstanceType<typeof ElTable>>()

const uuid = ref('id-' + genUUID())

const columnTypes: TypeProps[] = ['selection', 'radio', 'index', 'expand', 'sort']

const showToolButton = (key: 'refresh' | 'setting' | 'search') => {
  return Array.isArray(props.toolButton) ? props.toolButton.includes(key) : props.toolButton
}

const radio = ref('')

const clearSelection = () => unref(tableRef)!.clearSelection()

// 处理表格数据
const processTableData = computed(() => {
  if (!props.data) return tableData.value

  if (!props.pagination) return props.data

  return props.data.slice(
    (unref(pageParams).pageNum - 1) * unref(pageParams).pageSize,
    unref(pageParams).pageSize * unref(pageParams).pageNum
  )
})

// 列设置 ==> 需要过滤掉不需要设置的列
const colRef = ref()

const settingColumns = unref(tableColumns).filter(item => {
  const { type, prop, isSetting } = item
  return !columnTypes.includes(type!) && prop !== 'operation' && isSetting
})

const openColSetting = () => unref(colRef).openColSetting()

// 表格拖拽排序
const dragSort = () => {
  const tbody = document.querySelector(`#${uuid.value} tbody`) as HTMLElement

  Sortable.create(tbody, {
    handle: '.move',
    animation: 300,
    onEnd({ newIndex, oldIndex }) {
      const [removedItem] = unref(processTableData).splice(oldIndex, 1)
      unref(processTableData).splice(newIndex, 0, removedItem)
      emit('dragSort', { newIndex, oldIndex })
    }
  })
}

defineExpose({
  tableRef,
  radio,
  tableData: processTableData,
  loading,
  pageParams,
  searchParams,
  totalParams,
  searchInitParams,
  isSelected,
  selectList,
  selectIdList,
  initTable,
  getTableList,
  search,
  reset,
  handleSizeChange,
  handleCurrentChange,
  clearSelection,
  enumMap
})
</script>

<style lang="scss">
@import './index.scss';
</style>
