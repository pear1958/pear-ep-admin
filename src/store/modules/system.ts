import { defineStore } from 'pinia'
import router from '@/router/index'
import { SystemState } from '../types'
import piniaPersistConfig from '../utils/persist'

export const useSystemStore = defineStore({
  id: 'system',
  // 旧策略: 在@/layout/index.vue中, 监听数据改变, 并且同步到localStorage中
  // now: 使用 persistedstate 插件自动完成本地储存
  state: (): SystemState => ({
    layout: 'vertical',
    sideBar: {
      // 是否折叠菜单
      isCollapse: false
    },
    // 以route.name作为缓存的Key
    keepAliveNameList: [],
    tabList: [],
    // main区域是否全屏
    mainMaximize: false,
    isDark: false,
    themeColor: '#1890ff',
    // 当前系统语言
    language: null,
    menuAccordion: true,
    componentSize: 'default'
  }),
  actions: {
    setCollapse(value: boolean) {
      this.sideBar.isCollapse = value
    },
    findIndex(name: string) {
      return this.keepAliveNameList.findIndex(item => item === name)
    },
    // 添加缓存路由
    addKeepAliveName(name: string) {
      !this.keepAliveNameList.includes(name) && this.keepAliveNameList.push(name)
    },
    // 删除缓存路由
    removeKeepAliveName(name: string) {
      const delIndex = this.findIndex(name)
      this.keepAliveNameList.splice(delIndex, 1)
    },
    // 批量更新缓存路由
    setKeepAliveName(nameList: string[]) {
      this.keepAliveNameList = nameList
    },
    removeLeftKeepAliveName(name: string) {
      const delIndex = this.findIndex(name)
      this.keepAliveNameList.splice(0, delIndex)
    },
    removeRightKeepAliveName(name: string) {
      const delIndex = this.findIndex(name)
      this.keepAliveNameList.splice(delIndex + 1)
    },
    // 新增Tab
    addTab(tabItem: TabItem) {
      // 该Tab没被添加过 才添加
      if (!this.tabList.some((item: TabItem) => item.fullPath === tabItem.fullPath)) {
        this.tabList.push(tabItem)
      }
    },
    // 删除Tab
    removeTab(fullPath: string, isCurrent: boolean) {
      const { tabList } = this

      // 如果删除的是当前Tab: 默认切换到下一个Tab
      if (isCurrent) {
        tabList.forEach((item: TabItem, index: number) => {
          if (item.fullPath !== fullPath) return
          const nextShowTab = tabList[index + 1] || tabList[index - 1]
          // 删除的是唯一的一个Tab, 则不需要切换Tab
          if (!nextShowTab) return
          router.push(nextShowTab.fullPath)
        })
      }

      const delIndex = tabList.findIndex((item: TabItem) => item.fullPath === fullPath)
      tabList.splice(delIndex, 1)
    },
    // 删除多个Tab
    // 不传fullPath则是 删除所有Tab
    removeMultipleTab(fullPath?: string) {
      this.tabList = this.tabList.filter((item: TabItem) => item.fullPath === fullPath)
    },
    removeLeftTab(fullPath: string) {
      const delIndex = this.tabList.findIndex((item: TabItem) => item.fullPath === fullPath)
      this.tabList.splice(0, delIndex)
    },
    removeRightTab(fullPath: string) {
      const delIndex = this.tabList.findIndex((item: TabItem) => item.fullPath === fullPath)
      this.tabList.splice(delIndex + 1)
    },
    sortTabs(oldIndex: number, newIndex: number) {
      const currentTab = this.tabList[oldIndex]
      this.tabList.splice(oldIndex, 1)
      this.tabList.splice(newIndex, 0, currentTab)
    },
    setMainMaximize(value: boolean) {
      this.mainMaximize = value
    },
    setDark(val: boolean) {
      this.isDark = val
    },
    setThemeColor(color: string) {
      this.themeColor = color
    },
    // args[0]: 要设置的key  args[1]: 要设置的value
    setSystemState(...args: ObjToKeyValArray<SystemState>) {
      this.$patch({ [args[0]]: args[1] })
    }
  },
  persist: piniaPersistConfig('systemConfig')
})
