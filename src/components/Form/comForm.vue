<template>
  <el-form
    ref="formRef"
    :label-width="labelWidth"
    :model="formState"
    :rules="rules"
    v-bind="$attrs"
    inline
    size="default"
  >
    <el-form-item
      v-for="item in options"
      :key="item.prop"
      :prop="item.prop"
      :label="item.label"
    >
      <component
        :placeholder="item.placeholder"
        v-bind="item.attrs"
        :is="getElComponent('el-' + item.type)"
        v-model="formState[item.prop!]"
        :style="{ width: formWidth }"
      >
        <template v-if="item.children?.length">
          <component
            v-for="(child, index) in item.children"
            :key="index"
            :is="getElComponent('el-' + child.type)"
            :label="child.label"
            :value="child.value"
          />
        </template>
      </component>
    </el-form-item>

    <el-form-item>
      <el-button
        type="primary"
        :icon="Search"
        @click="search"
      >
        搜索
      </el-button>
      <el-button
        @click="reset"
        :icon="Delete"
        style="margin-left: 15px"
      >
        重置
      </el-button>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
  import { PropType, ref, watch, CSSProperties } from 'vue'
  import {
    ElCheckbox,
    ElDatePicker,
    ElInput,
    ElOption,
    ElSelect,
    FormItemRule,
  } from 'element-plus'
  import { Delete, Search } from '@element-plus/icons-vue'
  import { Arrayable } from 'element-plus/es/utils'
  import { deepClone } from '@/utils'

  // 表单每一项的配置选项
  interface FIOptions {
    type: string
    value?: any
    label?: string
    prop?: string
    rules?: Arrayable<FormItemRule>
    placeholder?: string
    // 表单元素特有的属性
    attrs?: {
      // css样式
      style?: CSSProperties
      clearable?: boolean
      showPassword?: boolean
      disabled?: boolean
      [key: string]: any
    }
    // 表单项的子元素
    children?: FIOptions[]
  }

  const props = defineProps({
    labelWidth: {
      type: String,
      default: 'auto',
    },
    formWidth: {
      type: String,
      default: '200px',
    },
    // 表单的配置项
    options: {
      type: Array as PropType<FIOptions[]>,
      required: true,
    },
  })

  // https://github.com/element-plus/element-plus/issues/8512
  const getElComponent = (type: unknown) => {
    const elementTypeMap = {
      'el-input': ElInput,
      'el-select': ElSelect,
      'el-option': ElOption,
      'el-checkbox': ElCheckbox,
      'el-date-picker': ElDatePicker,
    }

    return elementTypeMap[type as keyof typeof elementTypeMap]
  }

  const formState = reactive<any>({})
  const rules = reactive<any>({})
  const formRef = ref()

  const emit = defineEmits(['search', 'reset'])

  // 初始化表单
  const initForm = () => {
    if (props.options?.length) {
      props.options.forEach((item: FIOptions) => {
        formState[item.prop!] = item.value // 初始化默认值
        rules[item.prop!] = item.rules // 初始化默认效验规则
      })
    }
  }

  const search = () => {
    const params = deepClone(formState)

    Object.keys(params).forEach((key) => {
      if ([null, undefined, ''].includes(params[key])) {
        Reflect.deleteProperty(params, key)
      }
    })

    emit('search', params)
  }

  const reset = () => {
    unref(formRef).resetFields()
    emit('reset')
  }

  // 异步设置option时, 更新Form
  watch(
    () => props.options,
    () => {
      initForm()
    },
    { immediate: true, deep: true }
  )
</script>
