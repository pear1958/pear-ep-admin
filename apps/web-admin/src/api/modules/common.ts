import http from '@/api'
import { UPLOAD_URL, getUploadHeader } from '@/config/constant'

export const uploadFile = (formData: Recordable) => {
  return http.post(UPLOAD_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...getUploadHeader()
    }
  })
}

// 获取省市区
export const getOrganization = (params: { level: number; pcode?: string }) => {
  return http.get('/console/orgNationwide/getOrganization', params)
}

export const downloadFile = (url: string, params: Recordable = {}) => {
  return http.get(
    url,
    {
      ...params
    },
    {
      // 指定响应类型为二进制流
      responseType: 'blob',
      headers: {
        fullResponse: true
      }
    }
  )
}
