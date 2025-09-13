import { showErrMsg } from '..'

export const checkStatus = (status: number) => {
  switch (status) {
    case 400:
      showErrMsg('请求失败, 请您稍后重试')
      break

    case 401:
      showErrMsg('登录失效, 请您重新登录')
      break

    case 403:
      showErrMsg('当前账号无权限访问')
      break

    case 404:
      showErrMsg('你所访问的资源不存在')
      break

    case 405:
      showErrMsg('请求方式错误, 请您稍后重试')
      break

    case 408:
      showErrMsg('请求超时, 请您稍后重试')
      break

    case 500:
      showErrMsg('服务异常')
      break

    case 502:
      showErrMsg('网关错误')
      break

    case 503:
      showErrMsg('服务不可用')
      break

    case 504:
      showErrMsg('网关超时')
      break

    default:
      showErrMsg('请求失败')
  }
}
