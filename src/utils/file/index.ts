import { imgUrlToBase64, base64toBlob } from './base64Convert'

/**
 * 根据后台接口文件流下载
 * @param data: 接口返回的文件流 eg: Blob对象
 * 使用示例: downloadByData('这是一段测试文字', 'test.txt' || 'test.docx')
 *           downloadByData(pdfUrl, 'temp.pdf')
 */
export function downloadByData(data: BlobPart, fileName: string, type?: string) {
  const blob = new Blob([data], { type: type || 'application/octet-stream' })

  const blobURL = window.URL.createObjectURL(blob)

  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = blobURL
  tempLink.setAttribute('download', fileName)

  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }

  document.body.appendChild(tempLink)

  tempLink.click()

  document.body.removeChild(tempLink)

  window.URL.revokeObjectURL(blobURL)
}

export function downloadByBase64(base64: string, filename: string, mime?: string) {
  const blob = base64toBlob(base64)
  downloadByData(blob, filename, mime)
}

// 下载在线图片  不会修改图片的后缀名
export function downloadImgByUrl(url: string, filename: string, mime?: string) {
  if (!filename) {
    filename = url.slice(url.lastIndexOf('/') + 1)
  }

  imgUrlToBase64(url).then(base64 => {
    downloadByBase64(base64, filename, mime)
  })
}

/**
 * @description: 下载文件(在线地址)  比如: xlsx
 * @param {TargetContext} target 在当前窗口进行下载, 提示会显示在右上角
 */
export function downloadFileByUrl(url: string, target: TargetContext = '_self', fileName?: string) {
  const isChrome = window.navigator.userAgent.toLowerCase().indexOf('chrome') > -1
  const isSafari = window.navigator.userAgent.toLowerCase().indexOf('safari') > -1

  if (/(iP)/g.test(window.navigator.userAgent)) {
    console.error('您的浏览器不支持下载!')
    return false
  }

  if (isChrome || isSafari) {
    const link = document.createElement('a')
    link.href = url
    link.target = target

    if (link.download !== undefined) {
      link.download = fileName || url.substring(url.lastIndexOf('/') + 1, url.length)
    }

    if (document.createEvent) {
      const e = document.createEvent('MouseEvents')
      e.initEvent('click', true, true)
      link.dispatchEvent(e)
      return true
    }
  }

  if (url.indexOf('?') === -1) {
    url += '?download'
  }

  window.open(url, target)

  return true
}
