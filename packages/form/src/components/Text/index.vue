<template>
  <div
    class="pear-formitem"
    :class="{
      formCover: drag,
      'pear-vertical': labelalign != 'top',
      [item.data.csslist?.join(' ')]: !!item.data.csslist
    }"
  >
    <div class="label" :class="'label_' + labelalign" :style="{ width: labelWidth + 'px' }">
      <label>{{ item.data.label }}{{ suffix }}</label>
      <span v-if="item.data.required" class="item_require">*</span>
      <el-tooltip
        v-if="item.data.tip"
        class="item"
        effect="dark"
        :content="item.data.tip"
        placement="top"
      >
        <span class="tip iconfontui icon-tishi"></span>
      </el-tooltip>
    </div>

    <div class="control" :style="{ marginLeft: labelalign != 'top' ? labelWidth + 'px' : '' }">
      <!-- 编辑的Input -->
      <el-input
        v-if="drag"
        v-model="item.data.default"
        :placeholder="item.data.placeholder"
        :size="size"
        clearable
      />
      <!-- 实际的Input 支持执行自定义 Code -->
      <el-input
        v-else
        v-model="data[item.data.fieldName]"
        :placeholder="item.data.placeholder"
        :size="size"
        clearable
        @focus="execFunc('onFocus')"
        @blur="execFunc('onBlur')"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, ComponentInternalInstance } from 'vue'
import fieldProps from '@/utils/fieldProps'
import { getFormConfig } from '@/utils/fieldConfig'
import { useWatch } from '@/utils/customHooks'

export default defineComponent({
  props: {
    ...fieldProps
  },
  ControlType: 'Text', // 动态组件的名称 必须与文件名匹配
  nameCn: '文本框',
  icon: 'icon-wenbenkuang', // 左侧工具栏的图标
  // 获取组件配置绑定的 JSON
  formConfig: getFormConfig('Text', [
    { fieldName: 'default', component: 'Text' }, // 默认值
    { fieldName: 'placeholder', component: 'Text' } // 输入占位文字
  ]),
  actionType: ['onChange', 'onFocus', 'onBlur'],
  setup(props) {
    const vm = getCurrentInstance() as ComponentInternalInstance

    useWatch(props)

    // 支持执行自定义代码
    // 在表单控件触发特定事件时，执行自定义的动作函数
    const execFunc = (type: string) => {
      if (!props.item.data.action?.[type]) return
      // eg: JSON.stringify({ methods: 'onBlur', funcStr: 'console.log('失去焦点字段:', field)'})
      // ['username']
      window.VApp.$Flex.funcExec(props.item.data.action[type], vm.proxy, [
        props.item.data.fieldName
      ])
    }

    return {
      execFunc
    }
  }
})
</script>

<style lang="scss" scoped></style>
