<template>
  <div class="pear-dynamicform">
    <el-form
      :model="formResult"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="globalConfig.size || 'default'"
    >
      <template v-for="item in allFormList">
        <el-form-item v-if="!item.layout && item.show" :prop="item.data.fieldName" :key="item.id">
          <!-- fieldProps.ts -->
          <component
            ref="controlObj"
            :is="item.ControlType"
            :item="item"
            :data="formResult || '{}'"
            :drag="false"
            v-bind="globalConfig"
            @change="handleControlChange"
          />
        </el-form-item>

        <!-- 布局型表单项（比如分组、表格、折叠面板等），这些控件不需要包裹在 el-form-item 里 -->
        <template v-else-if="item.show">
          <component
            ref="controlObj"
            :is="item.ControlType"
            :item="item"
            :data="formResult || '{}'"
            :drag="false"
            v-bind="globalConfig"
            @change="handleControlChange"
          />
        </template>
      </template>
    </el-form>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  onMounted,
  getCurrentInstance,
  toRaw,
  PropType,
  ComponentPublicInstance
} from 'vue'
import type { FormRules } from 'element-plus'

export default defineComponent({
  name: 'Dynamicform',
  props: {
    formResult: {
      type: Object,
      default: () => ({})
    },
    globalConfig: {
      type: Object,
      default: () => ({})
    },
    allFormList: {
      type: Array as PropType<Recordable[]>,
      default: () => []
    }
  },
  setup() {
    const rules = ref<FormRules>({})
    const controlObj = ref<ComponentPublicInstance[]>()

    const handleControlChange = () => {
      // xxxxxx
    }

    return {
      rules,
      handleControlChange
    }
  }
})
</script>

<style lang="scss" scoped></style>
