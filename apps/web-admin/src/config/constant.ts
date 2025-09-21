import { getToken } from '@/utils/auth'

export const LOGIN_PATH = '/login'

export const LOCK_PATH = '/lock'

export const UPLOAD_URL = '/api/tools/upload'

export const TOKEN_KEY = 'ticket'

export const PEAR_USER_NAME = 'pear_user_name'

export const PEAR_PASSWORD = 'pear_password'

export const getUploadHeader = () => {
  return {
    Authorization: `Bearer ${getToken()}`
  }
}