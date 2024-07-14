const hexList: string[] = []

for (let i = 0; i <= 15; i++) {
  hexList[i] = i.toString(16)
}

/**
 * @description: 生成32位的uuid
 * eg: c13f5294aba4415b83d721611c2e54cf
 */
export function genUUID(): string {
  let uuid = ''
  for (let i = 1; i <= 36; i++) {
    if (i === 9 || i === 14 || i === 19 || i === 24) {
      uuid += '-'
    } else if (i === 15) {
      uuid += 4
    } else if (i === 20) {
      uuid += hexList[(Math.random() * 4) | 8]
    } else {
      uuid += hexList[(Math.random() * 16) | 0]
    }
  }
  return uuid.replace(/-/g, '')
}

let unique = 0

/**
 * @description: 生成 prefix + 24位长度的uuid
 * eg: prefix + _31521761111712455200891
 */
export function genShortUUID(prefix = ''): string {
  const time = Date.now()
  const random = Math.floor(Math.random() * 1000000000)
  unique++
  return prefix + '_' + random + unique + String(time)
}
