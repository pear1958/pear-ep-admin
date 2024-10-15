import Cookies from 'js-cookie'
import { TOKEN_KEY } from '@/config/constant'

export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

export const setToken = (token: string) => {
  return Cookies.set(TOKEN_KEY, `${token}`)
}

export const removeToken = () => {
  return Cookies.remove(TOKEN_KEY)
}
