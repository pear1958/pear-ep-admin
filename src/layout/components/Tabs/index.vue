<template>
  <Maximize v-if="mainMaximize" />

  <div class="tabs-box" :style="{ left: sideBarWidth }">
    <el-tabs v-model="activeKey" type="card" @tab-click="tabClick" closable @tab-remove="removeTab">
      <el-tab-pane v-for="tab in tabList" :key="tab.fullPath" :name="tab.fullPath">
        <template #label>
          <el-dropdown trigger="contextmenu" @command="onClick($event, tab)">
            <span>{{ tab.title }}</span>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item icon="CircleCheck" command="refresh">刷新</el-dropdown-item>
                <el-dropdown-item icon="CircleCheck" command="closeCurrentTab">关闭</el-dropdown-item>
                <el-dropdown-item icon="CircleCheck" command="closeLeftTab" divided>关闭左侧标签页</el-dropdown-item>
                <el-dropdown-item icon="CircleCheck" command="closeRightTab">关闭右侧标签页</el-dropdown-item>
                <el-dropdown-item icon="CircleCheck" command="closeOtherTab" divided>关闭其它标签页</el-dropdown-item>
                <el-dropdown-item icon="CircleCheck" command="closeAllTab">关闭所有标签页</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </template>
      </el-tab-pane>
    </el-tabs>

    <div class="more-button">
      <el-dropdown>
        <span class="dropdown-icon">
          <svg-icon name="arrow-down" />
        </span>

        <template #dropdown>
          <el-dropdown-menu class="dropdown-menu">
            <el-dropdown-item command="refresh" @click="refresh">刷新</el-dropdown-item>
            <el-dropdown-item command="maximizeMain" @click="maximizeMain">最大化</el-dropdown-item>
            <el-dropdown-item command="closeCurrentTab" @click="closeCurrentTab" divided>关闭当前</el-dropdown-item>
            <el-dropdown-item command="closeOtherTab" @click="closeOtherTab">关闭其它</el-dropdown-item>
            <el-dropdown-item command="closeAllTab" @click="closeAllTab">关闭所有</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, nextTick, ref, unref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type TabsPaneContext, ElMessage } from 'element-plus'
import { useSystemStore } from '@/store/modules/system'
import emitter from '@/utils/mitt'
import Maximize from './Maximize.vue'
// import { useIcon } from '@/components/Icon/src/useIcon'

const route = useRoute()
const router = useRouter()

const systemStore = useSystemStore()
const sideBarWidth = computed(() => (systemStore.sideBar.isCollapse ? '64px' : '210px'))
const tabList = computed(() => systemStore.tabList)
const mainMaximize = computed(() => systemStore.mainMaximize)

// 默认值
const activeKey = ref(route.fullPath)

// Tabs（白名单地址，不需要添加到 tabs 的路由地址）
const NAME_WHITE_LIST = ['403', '404', '500', 'login']

// 监听路由的变化
watch(
  () => router.currentRoute.value,
  async (curRoute: any) => {
    activeKey.value = curRoute.fullPath

    if (NAME_WHITE_LIST.includes(curRoute.name)) return

    // 添加Tab
    systemStore.addTab({
      title: curRoute.meta.title,
      fullPath: curRoute.fullPath,
      name: curRoute.name
    })

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

const removeTab = (fullPath: string) => {
  // 删除keepAlive
  const name = unref(tabList).find(item => item.fullPath == fullPath)?.name || ''
  name && systemStore.removeKeepAliveName(name)

  if (unref(tabList).length === 1) {
    ElMessage.info('无法关闭最后一个页面~')
    return
  }

  // 删除Tab
  const isCurrentTab = fullPath === route.fullPath
  systemStore.removeTab(fullPath, isCurrentTab)
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

const closeLeftTab = (tab: tabItem) => {
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

const closeRightTab = (tab: tabItem) => {
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

const closeOtherTab = (tab: tabItem) => {
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
  closeAllTab
}

type methodName = keyof typeof methodObj

function onClick(key: string, tab: tabItem) {
  if (key === 'refresh') {
    refresh()
  } else {
    methodObj[key as methodName](tab)
  }
}
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
