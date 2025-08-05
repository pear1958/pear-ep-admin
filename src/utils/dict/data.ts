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
  Enable = 1
}

export const userStatus = [
  {
    label: '启用',
    value: UserStatus.Enable
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

export enum MenuKeepAlive {
  Disable = 0,
  Enable = 1
}

export const menuKeepAlive = [
  {
    label: '是',
    value: MenuKeepAlive.Enable
  },
  {
    label: '否',
    value: MenuKeepAlive.Disable
  }
]

export enum MenuShow {
  Disable = 0,
  Enable = 1
}

export const menuShow = [
  {
    label: '是',
    value: MenuShow.Enable
  },
  {
    label: '否',
    value: MenuShow.Disable
  }
]

export enum MenuStatus {
  Disable = 0,
  Enable = 1
}

export const menuStatus = [
  {
    label: '启用',
    value: MenuStatus.Enable
  },
  {
    label: '禁用',
    value: MenuStatus.Disable
  }
]

// 是否为外链
export const ExtStatusEnable = true
export const ExtStatusDisable = false
export const extStatus = [
  {
    label: '是',
    value: ExtStatusEnable
  },
  {
    label: '否',
    value: ExtStatusDisable
  }
]

export enum ExtOpenMode {
  NewWindow = 0,
  Inline = 1
}

// 外链打开方式
export const extOpenMode = [
  {
    label: '新窗口打开',
    value: ExtOpenMode.NewWindow
  },
  {
    label: '内嵌页打开',
    value: ExtOpenMode.Inline
  }
]

export enum RoleStatus {
  Disable = 0,
  Enable = 1
}

export const roleStatus = [
  {
    label: '启用',
    value: RoleStatus.Enable
  },
  {
    label: '禁用',
    value: RoleStatus.Disable
  }
]
