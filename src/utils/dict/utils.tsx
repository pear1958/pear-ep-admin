import { getDictClass, getDictObj, isEmpty, type DictItem } from 'pear-common-utils'

export const getValue = (dictList: DictItem[], val: string) =>
  isEmpty(val) ? <span class={getDictClass(dictList, val)}>{getDictObj(dictList)[val]}</span> : '--'
