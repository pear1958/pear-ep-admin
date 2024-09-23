export * from './utils'

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

// eg: return getValue(testList, record.testStatus)
