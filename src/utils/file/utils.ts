export const getFileName = (url: string) => {
  const str = url.split('/').pop()
  const randomName = Math.random().toString(16).slice(2) + '.png'
  if (!str.includes('.')) return randomName

  const suffixRegex =
    /\.(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|wmf|jpeg)$/

  return suffixRegex.test(str.toLowerCase()) ? str : randomName
}

/**
 * @param fileName 如果不传, 则会默认生成
 */
export const downloadByBlob = (blob: Blob, fileName?: string) => {
  const blobURL = window.URL.createObjectURL(blob)

  const link = document.createElement('a')
  link.style.display = 'none'
  link.href = blobURL
  fileName && link.setAttribute('download', fileName)

  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  window.URL.revokeObjectURL(blobURL)
}
