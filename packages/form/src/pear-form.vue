<template>
  <div class="pear-dynamicform">
    <!-- 是否在 rules 属性改变后立即触发一次验证 -->
    <el-form
      :model="formResult"
      :rules="rules"
      label-width="120px"
      class="demo-ruleForm"
      :size="globalConfig.size || 'default'"
      :validate-on-rule-change="false"
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

/**
 * starfish-form.vue 的定位是表单运行时渲染组件，
 * 负责将设计器生成的表单配置（JSON 结构）渲染为可交互的最终表单，
 * 供用户填写、提交数据，属于 “表单使用阶段” 的核心组件
 */
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
  setup(props: any, { emit }) {
    const { proxy } = getCurrentInstance() as any
    const ruleForm = ref()
    const controlObj = ref<ComponentPublicInstance[]>()
    const rules = ref<FormRules>({})

    // 给 rule对象 生成效验规则
    props.allFormList?.forEach((item: any) => {
      getRules(item)
    })

    function getRules(item: any) {
      if (!item.layout) {
        let rule: any[] = []

        if (item.data.required) {
          rule.push({
            required: true,
            message: '请输入' + item.data.label,
            trigger: 'blur'
          })
        }

        if (typeof item.data.rule == 'string') {
          // 如果rule是字符串（可能是JSON字符串），解析后合并到规则中
          rule = rule.concat(proxy.$Flex.tryParseJson(item.data.rule))
        } else {
          // 如果rule是数组，直接通过getFormListRules处理后合并
          rule = rule.concat(getFormListRules(item.data.rule))
        }

        // 特殊的jsoneditor表单要单独处理
        if (item.data.json) {
          rule.push(...proxy.$Flex.getJsonValidate())
        }

        // 储存 rule
        rules.value[item.data.fieldName] = rule
      } else if (item.layout) {
        // 处理Grid布局：递归处理栅格列中的子组件
        if (item.ControlType == 'Grid') {
          item.data.columns.forEach((colItem: any) => {
            colItem.list.forEach((listItem: any) => getRules(listItem))
          })
        }
        // 处理TableLayout布局：递归处理表格单元格中的子组件
        else if (item.ControlType == 'TableLayout') {
          const trs = item.data.trs
          trs.forEach((trItem: any) => {
            trItem.tds.forEach((tdItem: any) => {
              tdItem.list.forEach((listItem: any) => getRules(listItem))
            })
          })
        }
        // 处理Collapse（折叠面板）或Tabs（标签页）布局：递归处理面板/标签页中的子组件
        else if (item.ControlType == 'Collapse' || item.ControlType == 'Tabs') {
          const items = item.data.items
          items.forEach((colItem: any) => {
            colItem.list.forEach((listItem: any) => getRules(listItem))
          })
        }
      }
    }

    function getFormListRules(rules: any[]) {
      const result: any[] = []

      if (Array.isArray(rules) && rules && rules.length > 0) {
        rules.forEach(item => {
          // 处理"枚举类型"规则（如预设的数字、邮箱等校验规则）
          if (item.type == 'enum') {
            // 括号的作用是强制将字符串内容作为表达式执行，确保匿名函数能被正确创建
            const func = eval(`(${item.value})`)
            result.push({
              validator: func,
              trigger: 'blur'
            })
          } else if (item.type == 'func') {
            // 处理"函数类型"规则（用户自定义的函数校验）
            const mainData = props.formResult
            const func = eval(
              `((rule, value, callback, mainData = mainData) => {${item.value.func}})`
            )
            result.push({
              validator: func,
              trigger: 'blur'
            })
            console.log('mainData', mainData)
          } else if (item.type == 'high') {
            // 处理"高级模式"规则（如复杂的自定义配置规则）
            if (item.value.ruleType == 5) {
              result.push({
                validator: eval(item.value.validor),
                trigger: item.value.trigger
              })
              return
            }
            // let high = JSON.parse(JSON.stringify(item.value));
            // delete high.ruleType;
            result.push(item.value)
          }
        })
      }

      return result
    }

    onMounted(() => {
      handleControlChange()
      executeFunc('mounted')
    })

    // 处理表单控件变化，更新表单项的显示状态（根据显示规则控制显隐）
    const handleControlChange = () => {
      const allFormLists: any = props.allFormList

      // 遍历每个表单项，处理其显示规则
      allFormLists.forEach((item: any) => {
        // 若表单项的显示规则为"{}"（空对象），默认设置为显示
        if (item.data.showRule === '{}') {
          item.show = true
        } else {
          try {
            // 普通模式（数组）是简化写法，通过 transformData 转为高级模式（对象）统一处理
            // 若显示规则是数组（普通模式），转换为高级模式的数据结构再判断
            if (Array.isArray(item.data.showRule)) {
              item.show = conditionChange(transformData(toRaw(item.data.showRule)))
            } else {
              // 高级模式（对象）用 orgroup（或）和 andgroup（与）支持嵌套逻辑，更灵活
              // 若显示规则是非数组（高级模式），直接使用原始规则判断
              item.show = conditionChange(toRaw(item.data.showRule))
            }
          } catch (e) {
            // 解析或执行显示规则出错时，默认显示该表单项
            item.show = true
          }
        }
      })
    }

    // 转换为高级模式
    // 转换成包含 orgroup（或组）和 andgroup（与组）的对象结构
    function transformData(data: any[]) {
      /**普通模式转为高级模式的数据结构,方便复用 */
      const r: any = []

      data.forEach((item: any) => {
        r.push({
          type: 'andgroup',
          result: item.map((d: any) => {
            return {
              type: 'data',
              data: d
            }
          })
        })
      })

      const result = {
        type: 'orgroup',
        result: r
      }

      return result
    }

    // 递归解析显示规则（高级模式结构），计算表单项是否需要显示
    function conditionChange(data: any) {
      // 分支1：处理「与组」（andgroup）：所有子规则必须全部满足
      if (data.type == 'andgroup') {
        // 递归计算每个子规则的结果（子规则可能是andgroup、orgroup或data）
        const result = data.result
          .map((item: any) => {
            const r = conditionChange(item) // 递归处理子项
            return r
          })
          // 查找是否有子规则结果为false（只要有一个不满足，整个与组就不满足）
          .find((item: boolean) => {
            return item == false
          })

        return result === undefined ? true : result
      }
      // 分支2：处理「或组」（orgroup）：至少有一个子规则满足
      else if (data.type == 'orgroup') {
        const result = data.result
          .map((item: any) => {
            const r = conditionChange(item)
            return r
          })
          .find((item: boolean) => {
            return item == true
          })

        return result === undefined ? false : result
      }
      // 分支3：处理「基础条件」（data）：直接关联表单字段的判断逻辑
      else if (data.type == 'data') {
        // 获取基础条件的原始数据（包含field：字段名，logic：运算符，value：目标值）
        const result = data.data
        // 获取当前表单的 formState
        const formResults: any = props.formResult
        // 获取当前字段的值
        const value = formResults[result.field]
        // 初始化显示状态（默认不显示）
        let isShow = false

        // 根据条件的运算符（logic）执行不同的判断逻辑
        switch (result.logic) {
          case '=':
            isShow = value == result.value
            break

          case '!=':
            isShow = value != result.value
            break

          // 包含：字段值(表单项值 === value) 在 目标值数组(rule中被储存 === result.value) 中
          case 'in':
            if (Array.isArray(value)) {
              value.find(item => {
                if (result.value.includes(item)) {
                  isShow = true // 找到匹配元素，标记为显示
                  return item // 终止循环
                }
              })
            } else {
              isShow = result.value.includes(value)
            }
            break

          case 'not in':
            if (Array.isArray(value)) {
              value.find(item => {
                if (!result.value.include(item)) {
                  isShow = true
                  return item
                }
              })
            } else {
              isShow = !result.value.includes(value)
            }
            break

          // 可扩展其他运算符（如>、<、>=、<=等）
        }

        return isShow
      }
    }

    // 执行全局方法
    function executeFunc(funcName: string) {
      const mountedAction = props.globalConfig.action?.find((item: any) => {
        if (item.type == funcName) {
          return item
        }
      })
      if (mountedAction) {
        eval(`(function(){${mountedAction.funcStr}}).call(proxy)`)
      }
    }

    function getValidate() {
      return new Promise(resolve => {
        ruleForm.value.validate((valide: boolean) => {
          resolve(valide)
        })
      })
    }

    function reset() {
      ruleForm.value.resetFields()
    }

    return {
      rules,
      ruleForm,
      controlObj,
      getValidate,
      reset,
      handleControlChange
    }
  }
})
</script>

<style lang="scss" scoped></style>
