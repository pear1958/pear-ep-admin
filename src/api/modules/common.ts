import http from '@/api'
import { uploadHeaders, uploadUrl } from '@/config'
import { IUploadResult } from '../types'

export const uploadFile = (formData: Recordable) => {
  return http.post<IUploadResult>(uploadUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
      ...uploadHeaders
    }
  })
}
