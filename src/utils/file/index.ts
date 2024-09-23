import JSZip from 'jszip'
import { ElMessage } from 'element-plus'
import { imgUrlToBase64, base64toBlob } from './base64Convert'
import { downloadByBlob, getFileName } from './utils'

/**
 * 根据后台接口文件流下载
 * @param data: 接口返回的文件流 eg: Blob对象
 * 使用示例: downloadByData('这是一段测试文字', 'test.txt'||'test.docx')
 *           downloadByData(pdfUrl, 'temp.pdf')
 */
export function downloadByData(data: BlobPart, fileName: string, mime?: string) {
  const blob = new Blob([data], { type: mime || 'application/octet-stream' })
  downloadByBlob(blob, fileName)
}

export function downloadByBase64(base64: string, filename: string, mime?: string) {
  const blob = base64toBlob(base64)
  downloadByData(blob, filename, mime)
}

// 下载在线图片, 不会修改图片的后缀名
export async function downloadImgByUrl(url: string, filename?: string, mime?: string) {
  if (!filename) filename = getFileName(url)
  const base64 = await imgUrlToBase64(url)
  downloadByBase64(base64, filename, mime)
}

/**
 * 下载文件(在线地址)  比如: xlsx  没有CORS限制
 * 非同源不支持修改文件名: 下载地址 和 当前网站地址 必须是 同源的
 * @param target 在当前窗口进行下载, 提示会显示在右上角
 */
export function downloadFileByUrl(url: string, fileName?: string, target: TargetContext = '_self') {
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
}

/**
 * 可以修改文件名, 有CORS限制, target不生效
 */
export function downloadFileByUrlNoOrigin(url: string, fileName?: string) {
  const xhr = new window.XMLHttpRequest()
  xhr.open('GET', url, true)
  xhr.responseType = 'blob'
  xhr.onload = () => {
    if (xhr.status === 200) {
      downloadByBlob(xhr.response, fileName)
    }
  }
  xhr.send()
}

/**
 * 多个在线图片下载成Zip
 * 注意事项: 1.图片不能跨域 2.文件名不能重复, 否则会被覆盖
 */
export const downloadImgZip = async (urlList: string[], folderName = '图片附件') => {
  try {
    const zip = new JSZip()
    const imgFolder = zip.folder(folderName)
    const base64List = await Promise.all(urlList.map(url => imgUrlToBase64(url)))

    base64List.forEach((base64, i) => {
      const fileName = getFileName(urlList[i])
      imgFolder.file(fileName, base64.substring(22), {
        base64: true
      })
    })

    const blobData = await zip.generateAsync({ type: 'blob' })
    downloadByData(blobData, `${folderName}.zip`)
  } catch (err) {
    console.log('err', err)
    ElMessage.error('下载失败')
  }
}
