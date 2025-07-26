import {
  defineComponent,
  computed,
  watch,
  ref,
  PropType,
  onMounted,
  unref,
  onBeforeMount,
  reactive,
  useSlots
} from 'vue'
import { ElForm } from 'element-plus'
import { cloneDeep } from 'lodash-es'
import { BreakPoint } from '../Grid/type'
import { FormItem, FormRef } from './type'
import useForm from './useForm'

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
  }
}

export default defineComponent({
  name: 'JsonForm',
  props,
  emits: ['update:formData', 'change'],
  setup(_, { emit }) {
    const slots = useSlots()
    const formRef = ref<FormRef>()
    const formData = reactive(_.formData || {})
    const { getFormItem } = useForm(formData)

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

    onBeforeMount(() => {
      setInitValue()
    })

    onMounted(() => {
      if (_.getFormInstance) {
        _.getFormInstance(formRef.value)
      }
      if (formRef.value) {
        // 异步设置初始值  添加方法, 用于父组件手动设置值
        unref(formRef).setFieldsValue = (params: Recordable) => {
          Object.assign(formData, cloneDeep(params))
        }
      }
    })

    const setInitValue = () => {
      _.formItems.forEach(item => {
        // 添加字段
        formData[item.field] = undefined
        if (item.initValue !== undefined) {
          formData[item.field] = item.initValue
        }
      })
    }

    return () => (
      <ElForm model={formData} ref={formRef}>
        {unref(formItems).map(item => getFormItem(item))}
        {slots.default && slots.default()}
      </ElForm>
    )
  }
})
