import { ResultData } from '@/api/types'
import { UploadFile } from 'element-plus'

export interface IUpload {
  name: string
  origin: string
  url: string
}

export type IUploadResult = ResultData<IUpload>

export type IFile = UploadFile & { response: IUploadResult }

export interface ICropperParams {
  circle?: boolean
  options?: Cropper.Options
  canvasWidth?: number
  canvasHeight?: number
}

export type BindFormat = 'string' | 'array' | 'jsonArray'

export type ListType = 'picture' | 'text' | 'picture-card'

export type FileType = 'img' | 'file' | 'video'
