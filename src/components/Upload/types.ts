import { UploadFile } from 'element-plus'
import { IUploadResult } from '@/api/types'

export type IFile = UploadFile & { response: IUploadResult }

export interface ICropperParams {
  circle?: boolean
  options?: Cropper.Options
  canvasWidth?: number
  canvasHeight?: number
}
