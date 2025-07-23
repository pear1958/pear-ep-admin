<template>
  <Maximize v-if="mainMaximize" />

  <div class="tabs-box">
    <el-tabs v-model="activeKey" type="card" @tab-click="tabClick" closable @tab-remove="removeTab">
      <el-tab-pane v-for="(tab, index) in tabList" :key="tab.fullPath" :name="tab.fullPath">
        <template #label>
          <el-dropdown
            trigger="contextmenu"
            :popper-class="'dropdown-' + index"
            @command="onDropDownClick($event, tab, 'dropdown-' + index)"
          >
            <span>{{ tab.title }}</span>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item :icon="useIcon('reload-outlined')" command="refresh">
                  {{ $t('tabs.refresh') }}
                </el-dropdown-item>
                <el-dropdown-item :icon="useIcon('close-outlined')" command="closeCurrentTab">
                  关闭当前
                </el-dropdown-item>
                <el-dropdown-item
                  :icon="useIcon('vertical-right-outlined')"
                  command="closeLeftTab"
                  divided
                >
                  关闭左侧标签页
                </el-dropdown-item>
                <el-dropdown-item :icon="useIcon('vertical-left-outlined')" command="closeRightTab">
                  关闭右侧标签页
                </el-dropdown-item>
                <el-dropdown-item
                  :icon="useIcon('column-width-outlined')"
                  command="closeOtherTab"
                  divided
                >
                  关闭其它标签页
                </el-dropdown-item>
                <el-dropdown-item :icon="useIcon('minus-outlined')" command="closeAllTab">
                  关闭所有标签页
                </el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div class="more-button">
      <el-dropdown @command="onDropDownClick($event, curTab)">
        <span class="dropdown-icon">
          <SvgIcon name="arrow-down" />
        </span>

        <template #dropdown>
          <el-dropdown-menu class="dropdown-menu">
            <el-dropdown-item :icon="useIcon('reload-outlined')" command="refresh">
              刷新
            </el-dropdown-item>
            <el-dropdown-item :icon="useIcon('fullscreen-outlined')" command="maximizeMain">
              最大化
            </el-dropdown-item>
            <el-dropdown-item :icon="useIcon('close-outlined')" command="closeCurrentTab" divided>
              关闭当前
            </el-dropdown-item>
            <el-dropdown-item :icon="useIcon('vertical-right-outlined')" command="closeLeftTab">
              关闭左侧
            </el-dropdown-item>
            <el-dropdown-item :icon="useIcon('vertical-left-outlined')" command="closeRightTab">
              关闭右侧
            </el-dropdown-item>
            <el-dropdown-item
              :icon="useIcon('column-width-outlined')"
              command="closeOtherTab"
              divided
            >
              关闭其它
            </el-dropdown-item>
            <el-dropdown-item :icon="useIcon('minus-outlined')" command="closeAllTab">
              关闭所有
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue'
import Maximize from './Maximize.vue'
import { useTabs } from './useTabs'
import { useTabsDrag } from '@/layout/hooks/useTabs'
import SvgIcon from '@/components/SvgIcon/index.vue'
import { useIcon } from '@/components/Icon/useIcon'

const { tabList, mainMaximize, systemStore, route, router, tabClick, removeTab, onDropDownClick } =
  useTabs()

// 默认值
const activeKey = ref(route.fullPath)

// Tabs（白名单地址，不需要添加到 tabs 的路由地址）
const NAME_WHITE_LIST = ['403', '404', '500', 'login']

const curTab = ref<TabItem>()

onMounted(() => {
  useTabsDrag()
})

// 监听路由的变化
watch(
  () => router.currentRoute.value,
  async (curRoute: any) => {
    activeKey.value = curRoute.fullPath

    if (NAME_WHITE_LIST.includes(curRoute.name)) return

    curTab.value = {
      title: curRoute.meta.title,
      fullPath: curRoute.fullPath,
      name: curRoute.name
    }

    // 添加Tab
    systemStore.addTab(curTab.value)

    // 添加keep-alive
    curRoute.meta.keepAlive !== false && systemStore.addKeepAliveName(curRoute.name)
  },
  {
    immediate: true
  }
)
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
