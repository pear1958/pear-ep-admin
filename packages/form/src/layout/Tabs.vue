<template>
  <div class="pear-tabs_box">
    <el-tabs v-model="activeName">
      <el-tab-pane
        :label="colItem.name"
        :name="colItem.name"
        v-for="(colItem, index) in item.data.items"
        :key="index"
      >
        <template v-if="drag">
          <!-- 触发时机：当有元素被拖拽添加到当前 draggable 列表中时触发 -->
          <!-- 当用户点击或选中 draggable 列表中的某个元素时触发 -->
          <!-- 当 draggable 列表中的元素位置发生变化时触发（即拖拽调整元素顺序后） -->
          <draggable
            class="draggable-box"
            animation="300"
            ghostClass="itemGhost"
            v-model="colItem.list"
            group="pear-form"
            item-key="id"
            @add="addControl($event, colItem.list, index)"
            @choose="chooseClick($event, colItem.list)"
            @update="changePos($event, colItem.list)"
          >
            <template #item="{ element, index }">
              <Shape
                v-if="element.data"
                :active="currentId == element.id"
                :currentIndex="index"
                :currentId="element.id"
                :len="colItem.list.length"
                :item="element"
              >
                <component
                  :is="element.ControlType"
                  :drag="true"
                  :item="element"
                  :data="{}"
                ></component>
              </Shape>
            </template>
          </draggable>
        </template>

        <template v-else-if="!drag && colItem.list.length > 0">
          <!-- 对应的表单Item -->
          <template v-for="listItem in colItem.list">
            <el-form-item
              :prop="listItem.data.fieldName"
              v-if="!listItem.layout"
              :key="listItem.id"
            >
              <component
                ref="controlObj"
                @change="$emit('change')"
                :is="listItem.ControlType"
                :item="listItem"
                :data="data || '{}'"
                :drag="false"
              />
            </el-form-item>

            <!-- 布局型表单项（比如分组、表格、折叠面板等），这些控件不需要包裹在 el-form-item 里 -->
            <template v-else>
              <component
                ref="controlObj"
                :key="listItem.id"
                @change="$emit('change')"
                :is="listItem.ControlType"
                :item="listItem"
                :data="data || '{}'"
                :drag="false"
              ></component>
            </template>
          </template>
        </template>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, inject, getCurrentInstance } from 'vue'
import { getFormConfig } from '@/utils/fieldConfig'
import fieldProps from '@/utils/fieldProps'
import { useWatch } from '@/utils/customHooks'

export default defineComponent({
  ControlType: 'Tabs', // 必须与文件名匹配
  nameCn: '标签页',
  icon: 'icon-zhediemianban',
  layout: true,
  formConfig: getFormConfig('Tabs', [
    { fieldName: 'items', component: 'Panel', label: '折叠面板' },
    { fieldName: 'accordion', component: 'Switch', label: '手风琴模式' }
  ]),
  props: {
    ...fieldProps
  },
  setup(props) {
    const { proxy } = getCurrentInstance() as any
    // 默认显示第一个 Tab
    const activeName = ref(props.item.data.items[0].name)

    // editor子包提供  starfish-editor.vue文件
    const { formStore, store } = inject('control') || {}

    const currentId = computed(() => {
      return formStore.get('currentId')
    })

    useWatch(props)

    return {
      activeName,
      currentId,
      addControl(e: any, list: any, index: number) {
        // 1. 将当前标签页的列表元素转换为标准表单格式（统一数据结构）
        props.item.data.items[index].list = list.map((item: any) => {
          return proxy.$Flex.jsonToForm(item)
        })
        // 2. 更新formStore中当前选中元素的ID（新添加元素的ID）
        formStore.setFormCurrentId(props.item.data.items[index].list[e.newIndex].id)
        // 3. 更新formStore中当前选中元素的索引（新添加元素的位置）
        formStore.setFormCurrentIndex(e.newIndex)
        // 4. 将更新后的列表同步到全局存储，确保状态一致
        store.set('curList', props.item.data.items[index].list)
      },
      chooseClick(e: any, list: any) {
        // oldIndex: 其含义是元素操作前在列表中的索引位置
        // 此事件中 newIndex 可能不存在或为 undefined（因为没有位置变更）
        formStore.setFormCurrentId(list[e.oldIndex].id)
        formStore.setFormCurrentIndex(e.oldIndex)
        store.set('curList', list)
      },
      changePos(e: any, list: any) {
        formStore.setFormCurrentId(list[e.newIndex]?.id)
        formStore.setFormCurrentIndex(e.newIndex)
        store.set('curList', list)
      }
    }
  }
})
</script>
