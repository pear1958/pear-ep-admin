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
