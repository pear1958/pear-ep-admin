## Ep-Admin

## 简介

`Ep-Admin` 是一款开源免费的中后台管理系统模版, 使用最新的 `Vue3`、`Vite`、`Ts`、`element-plus`、`Pinia` 等主流技术开发

#### 在线预览地址

[点我预览](https://zhangzy56.github.io/V-Admin)

#### 登录相关

- 开发中...
- 账号: admin
- 密码: 123456

- 使用的 Node 版本: v16.14.2

#### 项目截图

- 正在开发中...
<p align="center">
  <img alt="Ep-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-1.png">
  <img alt="Ep-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-2.png">
  <img alt="Ep-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-3.png">
  <img alt="Ep-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-4.png">
  <img alt="Ep-Admin" width="100%" src="https://github.com/zhangzy56/V-Admin/blob/master/src/assets/readme/admin-5.png">
</p>

#### 版本相关

Mock 平台:

- https://mock.mengxuegu.com/
- Mock 数据还在逐步完善中...

#### 项目功能

- 支持主题切换和暗黑模式
- 使用 Vue3.2 + Js 开发，单文件组件＜ script setup ＞
- 使用 Pinia 替代 Vuex，轻量、简单、易用
- 对 Axios 整个二次封装 （请求拦截、常用请求封装……）
- 支持 路由权限拦截、页面按钮权限配置、路由懒加载、菜单动态权限
- 支持路由嵌套, 点击 Tab 和面包屑进行跳转时, query 不会丢失
- 支持输入错误 url 打开 404 页面
- 使用 keepAlive 对页面进行缓存，支持多级嵌套页面缓存
- 更多功能正在持续完善中...

## 安装使用

- 获取项目代码

```
git clone git@github.com:v-geek/EP-Admin.git
```

- 安装依赖

```
cd Ep-Admin
pnpm install
```

- 运行

```
pnpm run dev
```

- 打包

```bash
pnpm run build:pro
```

#### todo-list

- [x] 暗黑模式
- [x] 菜单栏搜索
- [x] 面包屑 & Tab 支持 路由 query 参数
- [x] 按钮权限指令封装
- [x] 完善异常页
- [x] 通用文件下载
- [x] Echarts 组件
- [x] 迁移 websocket
- [x] 优化 Tab 组件
- [ ] 多种布局模式
- [ ] 自定义 Modal 组件
- [ ] husky and Lint 等代码规范
- [ ] 大屏和 gis Demo
- [ ] SearchTable
- [ ] 监控视频 demo
- [ ] 地图组件 & 视频组件
- [ ] 低代码平台(组件)

#### 支持

如果觉得本项目还不错或在工作中有所启发，请在 Github 帮助开发者点亮星星，这是对开发者最大的支持和鼓励！

#### 相关项目说明

- @v-geek/Ep-Admin 本项目 开发中...
- @v-geek/v-design 个人开发的 UI 库 开发中...
- @v-geek/v-utils 日常常用的 utils 开发中...
