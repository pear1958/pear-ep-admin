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
