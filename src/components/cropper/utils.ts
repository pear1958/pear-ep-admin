import { ElMessage, UploadRawFile } from 'element-plus'

export const validSize = (props: Recordable, file: UploadRawFile): Promise<boolean> => {
  return new Promise((resolve, reject) => {
    const url = window.URL || window.webkitURL
    const img = new Image()
    img.onload = () => {
      if (props.imgSize.length) {
        const [width, height] = props.imgSize

        const valid = img.width == width && img.height == height

        if (!valid) {
          ElMessage.warning(`图片比例不合格, 请上传${width}*${height}的图片`)
          reject(false)
        }
      }

      if (props.ratioList.length === 2) {
        const valid = img.width / img.height === props.ratioList[0] / props.ratioList[1]

        if (!valid) {
          ElMessage.warning(
            `图片比例不合格, 请上传${props.ratioList[0]}比${props.ratioList[1]}的图片`
          )
          reject(false)
        }
      }

      resolve(true)
    }
    img.src = url.createObjectURL(file)
  })
}

export function getRoundedCanvas(sourceCanvas) {
  const canvas = document.createElement('canvas')
  const context = canvas.getContext('2d')!
  const width = sourceCanvas.width
  const height = sourceCanvas.height
  canvas.width = width
  canvas.height = height
  context.imageSmoothingEnabled = true
  context.drawImage(sourceCanvas, 0, 0, width, height)
  context.globalCompositeOperation = 'destination-in'
  context.beginPath()
  context.arc(width / 2, height / 2, Math.min(width, height) / 2, 0, 2 * Math.PI, true)
  context.fill()
  return canvas
}
