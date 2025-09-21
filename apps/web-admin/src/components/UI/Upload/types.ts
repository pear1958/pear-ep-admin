export type UploadFileStatus = 'ready' | 'uploading' | 'success' | 'error'

export interface UploadFile {
  uid?: string
  name: string
  size?: number
  percent?: number
  status?: UploadFileStatus
  raw?: File
  response?: any
  error?: any
  src: string
}
