import { unref, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, type TabPaneName, type TabsPaneContext } from 'element-plus'
import { storeToRefs } from 'pinia'
import emitter from '@/utils/mitt'
import useSystemStore from '@/store/modules/system'

export const useTabs = () => {
  const route = useRoute()
  const router = useRouter()
  const systemStore = useSystemStore()

  const { tabList, mainMaximize } = storeToRefs(systemStore)

  const removeTab = (fullPath: TabPaneName) => {
    // 删除keepAlive
    const name = unref(tabList).find(item => item.fullPath == fullPath)?.name || ''
    name && systemStore.removeKeepAliveName(name)

    if (unref(tabList).length === 1) {
      return ElMessage.info('无法关闭最后一个页面~')
    }

    // 删除Tab
    const isCurrentTab = fullPath === route.fullPath
    systemStore.removeTab(fullPath as string, isCurrentTab)
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

  const handleJump = (tab: TabItem, operator: '>' | '<' | '!==') => {
    const mouseRightIndex = systemStore.findIndex(tab.name)
    const curIndex = systemStore.findIndex(route.name as string)
    if (eval(`${mouseRightIndex}${operator}${curIndex}`)) {
      router.push(tab.fullPath)
    }
  }

  const closeLeftTab = (tab: TabItem) => {
    if (unref(tabList).length === 1) {
      return ElMessage.info('左侧没有其它页面了~')
    }
    // 删除的Tab在当前Tab的右侧, 则默认跳转到当前鼠标右键的Tab
    handleJump(tab, '>')
    systemStore.removeLeftTab(tab.fullPath)
    systemStore.removeLeftKeepAliveName(tab.name)
  }

  const closeRightTab = (tab: TabItem) => {
    if (unref(tabList).length === 1) {
      return ElMessage.info('右侧没有其它页面了~')
    }
    // 删除的Tab在当前Tab的左侧, 则默认跳转到当前鼠标右键的Tab
    handleJump(tab, '<')
    systemStore.removeRightTab(tab.fullPath)
    systemStore.removeRightKeepAliveName(tab.name)
  }

  const closeOtherTab = (tab: TabItem) => {
    if (unref(tabList).length === 1) {
      return ElMessage.info('当前没有其它页面了~')
    }
    handleJump(tab, '!==')
    systemStore.removeMultipleTab(tab ? tab.fullPath : route.fullPath)
    systemStore.setState('keepAliveNameList', tab ? [tab.name] : ([route.name] as string[]))
  }

  const closeAllTab = () => {
    systemStore.removeMultipleTab()
    systemStore.setState('keepAliveNameList', [])
    // Tabs组件会监听到路由的变化, 自动添加Tab
    router.push('/home')
  }

  const maximizeMain = () => {
    systemStore.setState('mainMaximize', true)
  }

  const tabClick = (tabItem: TabsPaneContext) => {
    const fullPath = tabItem.props.name as string
    router.push(fullPath)
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

  const onDropDownClick = (command: string, tab: TabItem | undefined, className?: string) => {
    if (!command || !tab) return

    // 解决 dropdown 闪烁到最左侧的Bug
    if (['closeLeftTab', 'closeOtherTab'].includes(command) && className) {
      const curDropDownEle = document.querySelector(`.${className}`) as HTMLDivElement
      curDropDownEle.style.display = 'none'
    }

    methodObj[command as methodName](tab)
  }

  return {
    tabList,
    mainMaximize,
    systemStore,
    route,
    router,
    methodObj,
    tabClick,
    removeTab,
    onDropDownClick
  }
}
