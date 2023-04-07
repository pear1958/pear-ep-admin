// 将属性值为 'Boolean' 和 'Number' 的进行还原 ( 属性值默认全部为String )
export function formatEnv(envObj: Recordable) {
  const result: Recordable = {}

  for (const [key, val] of Object.entries(envObj)) {
    let realVal = val === 'true' ? true : val === 'false' ? false : val

    if (key === 'VITE_PORT') {
      realVal = Number(realVal)
    }

    result[key] = realVal

    // 将环境变量顺便放到 process.env 中
    process.env[key] = realVal
  }

  return result
}
