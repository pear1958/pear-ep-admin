<template>
  <maximize v-if="mainMaximize" />

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
          <svg-icon name="arrow-down" />
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
import { nextTick, onMounted, ref, unref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { storeToRefs } from 'pinia'
import { type TabsPaneContext, ElMessage, TabPaneName } from 'element-plus'
import { useSystemStore } from '@/store/modules/system'
import emitter from '@/utils/mitt'
import maximize from './maximize.vue'
import { useTabsDrag } from '@/layout/hooks/useTabs'
import { useIcon } from '@/components/icon'

const route = useRoute()
const router = useRouter()

const systemStore = useSystemStore()

const { tabList, mainMaximize } = storeToRefs(systemStore)

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

const tabClick = (tabItem: TabsPaneContext) => {
  const fullPath = tabItem.props.name as string
  router.push(fullPath)
}

const removeTab = (fullPath: TabPaneName) => {
  // 删除keepAlive
  const name = unref(tabList).find(item => item.fullPath == fullPath)?.name || ''
  name && systemStore.removeKeepAliveName(name)

  if (unref(tabList).length === 1) {
    ElMessage.info('无法关闭最后一个页面~')
    return
  }

  // 删除Tab
  const isCurrentTab = fullPath === route.fullPath
  systemStore.removeTab(fullPath as string, isCurrentTab)
}

const maximizeMain = () => {
  systemStore.setMainMaximize(true)
}

// 刷新当前Tab
// 只刷新router-view的地方, 没有调用router.place, 因为不需要刷新整个页面
async function refresh() {
  emitter.emit('refreshPage', false)
  await nextTick()
  emitter.emit('refreshPage', true)
}

// 关闭当前Tab
const closeCurrentTab = () => {
  removeTab(route.fullPath)
}

const closeLeftTab = (tab: TabItem) => {
  if (unref(tabList).length === 1) {
    ElMessage.info('左侧没有其它页面了~')
    return
  }

  const mouseRightIndex = systemStore.findIndex(tab.name)
  const curIndex = systemStore.findIndex(route.name as string)

  // 删除的Tab在当前Tab的右侧, 则默认跳转到当前鼠标右键的Tab
  if (tab.name !== route.name && mouseRightIndex > curIndex) {
    router.push(tab.fullPath)
  }

  systemStore.removeLeftTab(tab.fullPath)
  systemStore.removeLeftKeepAliveName(tab.name)
}

const closeRightTab = (tab: TabItem) => {
  if (unref(tabList).length === 1) {
    ElMessage.info('右侧没有其它页面了~')
    return
  }

  const mouseRightIndex = systemStore.findIndex(tab.name)
  const curIndex = systemStore.findIndex(route.name as string)

  // 删除的Tab在当前Tab的左侧, 则默认跳转到当前鼠标右键的Tab
  if (tab.name !== route.name && mouseRightIndex < curIndex) {
    router.push(tab.fullPath)
  }

  systemStore.removeRightTab(tab.fullPath)
  systemStore.removeRightKeepAliveName(tab.name)
}

const closeOtherTab = (tab: TabItem) => {
  if (unref(tabList).length === 1) {
    ElMessage.info('当前没有其它页面了~')
    return
  }

  systemStore.removeMultipleTab(tab ? tab.fullPath : route.fullPath)
  systemStore.setKeepAliveName(tab ? [tab.name] : ([route.name] as string[]))
}

const closeAllTab = () => {
  systemStore.removeMultipleTab()
  systemStore.setKeepAliveName([])
  // Tabs组件会监听到路由的变化, 自动添加Tab
  router.push('/home')
}

const methodObj = {
  refresh,
  closeCurrentTab,
  closeLeftTab,
  closeRightTab,
  closeOtherTab,
  closeAllTab,
  maximizeMain
}

type methodName = keyof typeof methodObj

function onDropDownClick(command: string, tab: TabItem | undefined, className?: string) {
  if (!command || !tab) return

  // 解决 dropdown 闪烁到最左侧的Bug
  if (command === 'closeLeftTab' && className) {
    const curDropDownEle = document.querySelector(`.${className}`) as HTMLDivElement
    curDropDownEle.style.display = 'none'
  }

  methodObj[command as methodName](tab)
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
