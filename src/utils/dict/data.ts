export const testList = [
  {
    label: '待审核',
    value: 1
  },
  {
    label: '审核通过',
    value: 2,
    cls: 'text-success'
  },
  {
    label: '审核不通过',
    value: 3,
    cls: 'text-error'
  }
]

export enum UserStatus {
  Disable = 0,
  Enabled = 1
}

export const userStatus = [
  {
    label: '启用',
    value: UserStatus.Enabled
  },
  {
    label: '禁用',
    value: UserStatus.Disable
  }
]

export enum MenuType {
  Directory = 0,
  Menu = 1,
  Button = 2
}

export const menuType = [
  {
    label: '目录',
    value: MenuType.Directory
  },
  {
    label: '菜单',
    value: MenuType.Menu
  },
  {
    label: '按钮',
    value: MenuType.Button
  }
]

export enum KeepAlive {
  Disable = 0,
  Enable = 1
}

export enum MenuShow {
  Disable = 0,
  Enable = 1
}

export enum MenuStatus {
  Disable = 0,
  Enable = 1
}