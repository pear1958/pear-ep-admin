import http from '@/api'
import { UPLOAD_HEADERS, UPLOAD_URL } from '@/config/constant'
import { IUploadResult } from '../types'

export const uploadFile = (formData: Recordable) => {
  return http.post<IUploadResult>(UPLOAD_URL, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...UPLOAD_HEADERS
    }
  })
}

// 获取省市区
export const getOrganization = (params: { level: number; pcode?: string }) => {
  return http.get('/console/orgNationwide/getOrganization', params)
}
