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
