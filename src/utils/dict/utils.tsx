export interface DictItem extends LabelValue {
  cls?: string
}

export const getDictObj = (dictList: DictItem[]) =>
  dictList.reduce((prev, cur) => {
    prev[cur.value] = cur.label
    return prev
  }, {})

export const getDictClass = (dictList: DictItem[], key: string) => {
  let cls = ''
  dictList.forEach(item => {
    if (item.value === key) {
      cls = item.cls || ''
    }
  })
  return cls
}

export const getValue = (dictList: DictItem[], key: string) =>
  key ? <span class={getDictClass(dictList, key)}>{getDictObj(dictList)[key]}</span> : '--'
