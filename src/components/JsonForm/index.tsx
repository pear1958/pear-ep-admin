import {
  defineComponent,
  computed,
  watch,
  ref,
  type PropType,
  onMounted,
  unref,
  onBeforeMount,
  useSlots,
  reactive
} from 'vue'
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import { FormItem, FormRef } from './type'
import Grid from '../Grid/index.vue'
import GridItem from '../Grid/GridItem.vue'
import { BreakPoint } from '../Grid/type'
import useForm from './useForm'
import { getResponsive } from './utils'

export const props = {
  formItems: {
    type: Array as PropType<FormItem[]>,
    default: () => []
  },
  formData: {
    type: Object,
    default: () => ({})
  },
  // 设置每一行展示的表单字段的个数, 用于排版
  columns: {
    type: [Number, Object] as PropType<number | Record<BreakPoint, number>>,
    default: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
  },
  getFormInstance: {
    type: Function as PropType<(formRef: FormRef) => void>
  },
  // 是否显示搜索重置按钮
  showSearch: {
    type: Boolean,
    default: false
  },
  // 用于设置两个字段之间的间隙
  gutter: {
    type: [Number, Array],
    default: () => [0, 30]
  }
}

export default defineComponent({
  name: 'JsonForm',
  props,
  emits: ['update:formData', 'change', 'search', 'reset'],
  setup(_, { emit, expose }) {
    const slots = useSlots()
    const formRef = ref<FormRef>()
    const formData = reactive(_.formData || {})

    const { getFormItem, gridRef, collapsed, collapseVisible } = useForm(_, formData)

    const formItems = computed(() => {
      return _.formItems.filter(item => item.show !== false)
    })

    watch(
      () => formData,
      () => {
        emit('update:formData', formData)
        emit('change', cloneDeep(formData))
      },
      {
        deep: true,
        immediate: true
      }
    )

    watch(
      () => _.formItems,
      newVal => {
        newVal.forEach(item => {
          if (item.show === false) {
            delete formData[item.field]
          }
        })
      },
      {
        deep: true,
        immediate: true
      }
    )

    const setInitValue = () => {
      _.formItems.forEach(item => {
        if (item.initValue !== undefined) {
          formData[item.field] = item.initValue
        }
      })
    }

    onBeforeMount(() => {
      setInitValue()
    })

    onMounted(() => {
      if (_.getFormInstance) {
        _.getFormInstance(formRef.value)
      }
      if (formRef.value) {
        // 添加方法, 用于父组件手动设置值
        unref(formRef).setFieldsValue = (params: Recordable) => {
          Object.assign(formData, cloneDeep(params))
        }
      }
    })

    const search = () => {
      emit('search', formData)
    }

    const reset = () => {
      Object.keys(formData).forEach(key => {
        delete formData[key]
      })
      // 异步初始值需要在父组件再次调用
      setInitValue()
      emit('reset', formData)
    }

    expose({
      reset
    })

    return () => (
      <el-form model={formData} ref={formRef}>
        <Grid ref={gridRef} collapsed={collapsed.value} gap={_.gutter} cols={_.columns}>
          {unref(formItems).map((item, index) => {
            return (
              <GridItem key={item.field} index={index} {...getResponsive(item)}>
                {getFormItem(item)}
              </GridItem>
            )
          })}

          {_.showSearch && (
            <GridItem suffix>
              <div class="flex-end mb-[18px]">
                <el-button type="primary" icon={Search} onClick={search}>
                  搜索
                </el-button>
                <el-button icon={Delete} onClick={reset}>
                  重置
                </el-button>
                {collapseVisible.value && (
                  <el-button
                    type="primary"
                    link
                    onClick={() => (collapsed.value = !collapsed.value)}
                  >
                    {collapsed.value ? '展开' : '收起'}
                    <el-icon class="ml-[5px]">
                      {collapsed.value ? <ArrowDown /> : <ArrowUp />}
                    </el-icon>
                  </el-button>
                )}
              </div>
            </GridItem>
          )}
        </Grid>

        {slots.default && slots.default()}

        {!slots.default && !_.showSearch && (
          <div class="flex-c mt-4">
            <el-button>取消</el-button>
            <el-button type="primary">确定</el-button>
          </div>
        )}
      </el-form>
    )
  }
})
