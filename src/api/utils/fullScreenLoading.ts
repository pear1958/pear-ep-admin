import { ElLoading } from 'element-plus'

// 以服务的方式调用的全屏 Loading 是单例的
let loadingInstance: ReturnType<typeof ElLoading.service>

let loadingReqCount = 0

const startLoading = () => {
  loadingInstance = ElLoading.service({
    fullscreen: true,
    lock: true,
    text: 'Loading',
    background: 'rgba(0, 0, 0, 0.7)'
  })
}

const endLoading = () => {
  loadingInstance.close()
}

export const showFullScreenLoading = () => {
  loadingReqCount == 0 && startLoading()
  loadingReqCount++
}

export const hideFullScreenLoading = () => {
  if (loadingReqCount <= 0) return
  loadingReqCount--
  loadingReqCount == 0 && endLoading()
}
