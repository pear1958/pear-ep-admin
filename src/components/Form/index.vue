<template>
  <el-form ref="formRef" v-if="Object.keys(formState).length" :model="formState" :rules="rules" v-bind="$attrs">
    <template v-for="(item, index) in options" :key="index">
      <el-form-item v-if="!item.children" :prop="item.prop" :label="item.label">
        <!-- 非 上传 和 富文本 组件 -->
        <component
          :is="`el-${item.type}`"
          v-model="formState[item.prop!]"
          v-if="!['upload', 'editor'].includes(item.type)"
          :placeholder="item.placeholder"
          v-bind="item.attrs"
        >
        </component>
      </el-form-item>

      <!-- 例如 el-select -->
      <el-form-item :prop="item.prop" :label="item.label" v-else>
        <component
          :placeholder="item.placeholder"
          v-bind="item.attrs"
          :is="`el-${item.type}`"
          v-model="formState[item.prop!]"
        >
          <component
            v-for="(child, i) in item.children"
            :key="i"
            :is="`el-${child.type}`"
            :label="child.label"
            :value="child.value"
          ></component>
        </component>
      </el-form-item>
    </template>

    <!-- 操作区域, 把数据透传过去 -->
    <el-form-item>
      <slot name="action" :formRef="formRef" :formState="formState">
        <el-button type="primary" @click="submitForm()">提交</el-button>
        <el-button @click="resetForm">重置</el-button>
      </slot>
    </el-form-item>
  </el-form>
</template>

<script lang="ts" setup>
import { ref, PropType, unref, onMounted, reactive, watch } from 'vue'
import { FormInstance } from 'element-plus'
import { deepClone } from '@/utils/func'
import { FormOptions } from './types'

const props = defineProps({
  // 表单的配置项 json 数据
  options: {
    type: Array as PropType<FormOptions[]>,
    required: true
  },
  // 用户自定义上传方法
  uploadApi: {
    type: Function
  }
})

const formRef = ref<FormInstance | null>(null)
const formState = reactive<Recordable>({})
const rules = reactive<Recordable>({})

const emit = defineEmits(['onSubmit'])

onMounted(() => {
  initForm()
})

// 监听父组件传递进来的options
// 重新初始化
watch(
  () => props.options,
  () => {
    initForm()
  },
  { deep: true }
)

const initForm = () => {
  if (!props.options?.length) return

  props.options.forEach((item: FormOptions) => {
    formState[item.prop!] = item.value // 初始化默认值
    rules[item.prop!] = item.rules // 初始化效验规则数据
  })
}

const submitForm = () => {
  emit('onSubmit', formState)
}

const resetForm = () => {
  resetFields()
}

// 重置表单
const resetFields = () => {
  // 重置element-plus的表单
  unref(formRef)!.resetFields()
}

// 表单是否效验通过
const getValidate = () => {
  return unref(formRef)!.validate
}

defineExpose({
  formState,
  resetFields,
  getValidate,
})
</script>

<style lang="scss" scoped></style>
