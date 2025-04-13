import {
  defineComponent,
  computed,
  watch,
  ref,
  type PropType,
  onMounted,
  unref,
  onBeforeMount
} from 'vue'
import { FormInstance } from 'element-plus'
import { Delete, Search, ArrowDown, ArrowUp } from '@element-plus/icons-vue'
import { cloneDeep } from 'lodash-es'
import { FormItem } from './type'
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
  columns: {
    type: Object as PropType<number | Record<BreakPoint, number>>,
    default: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 })
  },
  getFormInstance: {
    type: Function as PropType<(formRef: FormInstance) => void>
  }
}

export default defineComponent({
  name: 'JsonForm',
  props,
  emits: ['update:formData', 'change', 'submit', 'reset'],
  setup(_, { emit, expose }) {
    const formRef = ref<FormInstance>()
    const formData = computed(() => _.formData)
    const { getFormItem, gridRef, collapsed, collapseVisible } = useForm(_, formData)

    const formItems = computed(() => {
      return _.formItems.filter(item => item.show !== false)
    })

    const hiddenKeys = computed(() => {
      return _.formItems.filter(item => item.show === false).map(item => item.field)
    })

    const getFormData = () => {
      if (!formData.value) return null
      const data = cloneDeep(formData.value)
      unref(hiddenKeys).forEach(key => delete data[key])
      return data
    }

    watch(
      () => formData.value,
      () => {
        const data = getFormData()
        emit('update:formData', data)
        emit('change', data)
      },
      {
        deep: true
      }
    )

    onBeforeMount(() => {
      _.formItems.forEach(item => {
        if (item.initValue !== undefined) {
          formData.value[item.field] = item.initValue
        }
      })
    })

    onMounted(() => {
      if (_.getFormInstance) {
        _.getFormInstance(formRef.value)
      }
    })

    const submit = () => {
      const data = getFormData()
      emit('submit', data)
    }

    const reset = () => {
      // to-do
      const data = getFormData()
      console.log('reset', data)
    }

    expose({
      formRef,
      submit,
      reset
    })

    return () => (
      <el-form model={formData.value} ref={formRef}>
        <Grid ref={gridRef} collapsed={collapsed.value} gap={[0, 30]} cols={_.columns}>
          {unref(formItems).map((item, index) => {
            return (
              <GridItem key={item.field} index={index} {...getResponsive(item)}>
                {getFormItem(item)}
              </GridItem>
            )
          })}

          <GridItem suffix>
            <div class="flex-end mb-[18px]">
              <el-button type="primary" icon={Search} onClick={submit}>
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
