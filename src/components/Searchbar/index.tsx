import {
  defineComponent,
  computed,
  watch,
  ref,
  type PropType,
  onMounted,
  unref,
  onBeforeMount,
  reactive
} from 'vue'
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import { isEmpty } from 'pear-common-utils'
import Grid from '../Grid/index.vue'
import GridItem from '../Grid/GridItem.vue'
import { BreakPoint } from '../Grid/type'
import { SearchbarItem } from './type'
import { FormRef } from '../JsonForm/type'
import useSearchbar from './useSearchbar'
import useForm from '../JsonForm/useForm'

export const props = {
  formItems: {
    type: Array as PropType<SearchbarItem[]>,
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
  // 用于设置两个字段之间的间隙
  gutter: {
    type: [Number, Array],
    default: () => [0, 30]
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export default defineComponent({
  name: 'Searchbar',
  props,
  emits: ['update:formData', 'change', 'search', 'reset'],
  setup(_, { emit, expose }) {
    const formRef = ref<FormRef>()
    const formData = reactive(_.formData || {})
    const { getFormItem } = useForm(formData)
    const { gridRef, collapsed, collapseVisible, disabled, getResponsive } = useSearchbar(_)

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

    watch(
      () => _.disabled,
      newVal => {
        if (!isEmpty(newVal)) {
          disabled.value = newVal
        }
      },
      {
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
      setInitValue,
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

          <GridItem suffix>
            <div class="flex-end mb-[18px]">
              <el-button type="primary" icon={Search} onClick={search} disabled={disabled.value}>
                搜索
              </el-button>
              <el-button icon={Delete} onClick={reset}>
                重置
              </el-button>
              {collapseVisible.value && (
                <el-button type="primary" link onClick={() => (collapsed.value = !collapsed.value)}>
                  {collapsed.value ? '展开' : '收起'}
                  <el-icon class="ml-[5px]">
                    {collapsed.value ? <ArrowDown /> : <ArrowUp />}
                  </el-icon>
                </el-button>
              )}
            </div>
          </GridItem>
        </Grid>
      </el-form>
    )
  }
})
