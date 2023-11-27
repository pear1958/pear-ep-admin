<template>
  <div class="header-icon" @click="showSearchPanel = true">
    <Iconify icon="search-outlined" />
  </div>

  <el-dialog v-model="showSearchPanel" :title="undefined" :footer="null" class="menu-dialog" :width="520">
    <el-input
      v-model="searchKey"
      :prefix-icon="Search"
      @input="onSearch"
      placeholder="请输入菜单名称进行搜索"
      size="large"
      clearable
    />

    <div class="panel panel-scroll">
      <template v-if="searchList.length">
        <div class="search-item" v-for="searchItem in searchList" @click="handleSelect(searchItem)">
          <div class="flex-c">
            <span class="icon" style="margin-top: -6px">
              <Iconify icon="document" />
            </span>

            <div class="breadcrumb-text">
              <el-breadcrumb separator=">">
                <el-breadcrumb-item v-for="item in searchItem" :key="item.path">
                  <span>{{ item.meta.title }}</span>
                </el-breadcrumb-item>
              </el-breadcrumb>
            </div>
          </div>

          <a class="icon">
            <Iconify icon="enter-outlined" color="var(--el-color-primary)" />
          </a>
        </div>
      </template>

      <div class="empty" v-else>
        <el-empty description="暂无搜索结果" :image-size="64">
          <template #image>
            <div style="font-size: 64px" class="mb-1.5">
              <svg-icon name="empty" />
            </div>
          </template>
        </el-empty>
      </div>
    </div>

    <div class="search-tips">
      <span class="key">S</span>
      <span class="text">打开搜索面板</span>

      <span class="key esc">Esc</span>
      <span class="text">关闭</span>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, shallowRef, unref, watch, nextTick, onMounted, onBeforeUnmount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import hotkeys from 'hotkeys-js'
import { usePermissionStore } from '@/store/modules/permission'
import { Search } from '@element-plus/icons-vue'

const route = useRoute()
const router = useRouter()

const showSearchPanel = ref(false)
const searchKey = ref('')
const searchList = shallowRef<MenuList[]>([])
const searchSourceData = shallowRef<string[]>([])

onMounted(() => {
  hotkeys('s', (event: Event) => {
    event.preventDefault()
    // 打开modal时按下s键, true -> true 不会触发watch
    showSearchPanel.value = true
  })
})

onBeforeUnmount(() => {
  hotkeys.unbind('s')
})

// 默认的菜单搜索所有数据
const getAllSearchList = () =>
  usePermissionStore().flatMenuListGet.map((item: Menu.MenuOptions) => {
    return usePermissionStore().breadcrumbListGet(item.path)
  })

// 获取 | 设置 搜索菜单为默认值
watch(showSearchPanel, async () => {
  await nextTick()

  if (showSearchPanel.value) {
    // 组装搜索的字符串数据  将所有标题字符串连接起来即可
    searchSourceData.value = getAllSearchList().map((cardItem: MenuList) => {
      let str = ''
      cardItem.forEach(item => (str += item.meta.title))
      return str
    })
  } else {
    searchKey.value = ''
    searchList.value = []
  }
})

let timer: ReturnType<typeof setTimeout>

// Input文字改变时进行搜索  函数防抖, 0.3s进行搜索
function onSearch(text: string) {
  timer && clearTimeout(timer)
  timer = setTimeout(() => {
    searchMenu(text)
  }, 300)
}

function searchMenu(queryString: string) {
  const key = queryString.trim().toLowerCase()

  // 符合搜索条件的下标
  const indexList: number[] = []

  unref(searchSourceData).forEach((item: string, index) => {
    item.includes(key) && indexList.push(index)
  })

  searchList.value =
    key === '' ? [] : getAllSearchList().filter((item: MenuList, index: number) => indexList.includes(index))
}

function handleSelect(data: MenuList) {
  const item = data.at(-1) as MenuItem

  const clickPath = item.redirect || item.path

  // 点击的是非当前页面才进行跳转
  if (clickPath !== route.path) router.push({ path: clickPath })

  showSearchPanel.value = false
}
</script>

<style lang="scss" scoped>
:deep(.el-input__inner) {
  height: 45px;
  line-height: 45px;
}

.panel {
  margin: 20px 0;
  border: 1px solid #f0f0f0;
  max-height: 220px;
  overflow: hidden;
  overflow-y: scroll;

  .search-item {
    @include flex(space-between);
    padding: 13px 20px;
    border-bottom: 1px solid #f0f0f0;
    cursor: pointer;
    transition: all 0.2s;
    box-sizing: border-box;

    &:hover {
      background-color: var(--el-color-primary-light-8);
    }

    .icon {
      height: 18px;
      font-size: 18px;
    }

    .breadcrumb-text {
      margin-left: 12px;

      :deep(.el-breadcrumb__item) {
        line-height: 27px;
      }
    }
  }

  :deep(.empty) {
    .el-empty {
      padding: 30px 0;
    }

    .el-empty__description {
      margin-top: 0;
    }

    p {
      color: #00000040;
    }
  }
}

.panel-scroll {
  scrollbar-width: thin;
  scrollbar-color: var(--el-color-primary) var(--el-color-primary-light-7);
  -ms-overflow-style: none;
  position: relative;

  &::-webkit-scrollbar {
    width: 4px;
    height: 1px;
  }

  &::-webkit-scrollbar-thumb {
    border-radius: 4px;
    background: var(--el-color-primary);
  }

  &::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 1px rgba(0, 0, 0, 0);
    border-radius: 4px;
    background: #ffffff;
  }
}

.search-tips {
  display: flex;
  margin-top: 10px;
  align-items: center;

  .key {
    width: 30px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    padding-bottom: 2px;
    margin: 0 4px;
    border-radius: 2px;
    box-shadow: inset 0 -2px #cdcde6, inset 0 0 1px 1px #fff, 0 1px 2px 1px #1e235a66;
    font-weight: bold;

    &.esc {
      margin-left: 20px;
    }
  }

  .text {
    margin-left: 2px;
  }
}
</style>

<style lang="scss">
.menu-dialog .el-dialog__header {
  display: none;
}
</style>
