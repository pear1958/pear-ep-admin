/** @type {import("@commitlint/types").UserConfig} */
/** @type {import('czg').UserConfig} */

const fs = require('fs')
const path = require('path')

const scopes = fs
  .readdirSync(path.resolve(__dirname, 'src'), { withFileTypes: true })
  .filter(dirent => dirent.isDirectory())
  .map(dirent => dirent.name.replace(/s$/, ''))

module.exports = {
  // 完整格式:
  // <type>(<scope>): <subject>
  // 空一行
  // <body>
  // 空一行
  // <footer>

  // scope: 影响范围
  // 用于说明本次 commit 的影响范围，比如: 具体功能或模块，控制器层，业务层，模型层等  route, component, utils, build

  // subject: 用一句话清楚的描述这次提交做了什么

  // eg: fix(component): 修复购物车组件商品数量可以为负数

  ignores: [commit => commit.includes('init')],
  extends: ['@commitlint/config-conventional'],
  rules: {
    // 0: 禁用  1: warning  2: error
    // Header部分只有一行，包括三个字段：type（必需）、scope（可选）和subject（必需）
    'header-max-length': [2, 'always', 108],
    'type-empty': [2, 'never'], // type不能为空
    'subject-empty': [2, 'never'], // subject不能为空
    'body-leading-blank': [2, 'always'], // body以空行开始
    'footer-leading-blank': [1, 'always'], // footer以空行开始
    // type 类型定义，表示 git 提交的 type 必须在以下类型范围内
    'type-enum': [
      2,
      'always',
      [
        'feat', // 新功能 feature
        'fix', // 修复 bug
        'perf', // 性能优化
        'style', // 代码格式(不影响代码运行的变动)
        'docs', // 文档注释
        'test', // 增加测试
        'refactor', // 重构(既不增加新功能，也不是修复bug)
        'build', // 打包
        'ci', // 更改持续集成软件的配置文件和package中的scripts命令，例如scopes: Travis, Circle等
        'chore', // 构建过程或辅助工具的变动
        'revert', // 回退
        'wip', // 开发中
        'workflow', // 工作流相关文件修改
        'types', // 类型定义文件更改
        'release' // 发布新版本
      ]
    ],
    // subject 大小写不做校验
    'subject-case': [0]
  },
  prompt: {
    messages: {
      type: '选择你要提交的类型 :',
      scope: '选择一个提交范围（可选）:',
      customScope: '请输入自定义的提交范围 :',
      subject: '填写简短精炼的变更描述 :\n',
      body: '填写更加详细的变更描述（可选）。使用 "|" 换行 :\n',
      breaking: '列举非兼容性重大的变更（可选）。使用 "|" 换行 :\n',
      confirmCommit: '是否提交或修改commit ?'
    },
    types: [
      { value: 'feat', name: 'feat: 新增功能' },
      { value: 'fix', name: 'fix: 修复缺陷' },
      { value: 'perf', name: 'perf: 性能优化' },
      {
        value: 'style',
        name: 'style: 代码格式（不影响功能，例如空格、分号等格式修正）'
      },
      { value: 'docs', name: 'docs: 文档变更' },
      { value: 'test', name: 'test: 添加疏漏测试或已有测试改动' },
      {
        value: 'refactor',
        name: 'refactor: 代码重构（不包括 bug 修复、功能新增）'
      },
      {
        value: 'build',
        name: 'build: 构建流程、外部依赖变更（如升级 npm 包、修改 webpack 配置等）'
      },
      { value: 'ci', name: 'ci: 修改 CI 配置、脚本' },
      { value: 'revert', name: 'revert: 回滚 commit' },
      {
        value: 'chore',
        name: 'chore: 对构建过程或辅助工具和库的更改（不影响源文件、测试用例）'
      },
      {
        value: 'revert',
        name: 'revert: 回退'
      },
      {
        value: 'wip',
        name: 'wip: 开发中'
      },
      {
        value: 'workflow',
        name: 'workflow: 工作流相关文件修改'
      },
      {
        value: 'types',
        name: 'types: 类型定义文件更改'
      },
      {
        value: 'release',
        name: 'release: 发布新版本'
      }
    ],
    scopes: [
      ...scopes,
      { value: 'system', name: 'system: 系统相关' },
      { value: 'home', name: 'home: 首页相关' },
      { value: 'auth', name: 'account: 授权相关' }
    ],
    // 设置 选择范围 中 为空选项(empty) 和 自定义选项(custom) 的 位置
    customScopesAlign: 'top',
    // 支持多选  使用 空格 选中
    enableMultipleScopes: true,
    scopeEnumSeparator: ','
  }
}
