export const getFileName = (url: string) => {
  const str = url.split('/').pop()
  const randomName = Math.random().toString(16).slice(2) + '.png'
  if (!str.includes('.')) return randomName

  const suffixRegex =
    /\.(bmp|jpg|png|tif|gif|pcx|tga|exif|fpx|svg|psd|cdr|pcd|dxf|ufo|eps|ai|raw|wmf|jpeg)$/

  return suffixRegex.test(str.toLowerCase()) ? str : randomName
}
