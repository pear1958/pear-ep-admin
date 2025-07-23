import Cookies from 'js-cookie'
import { PEAR_PASSWORD, PEAR_USER_NAME, TOKEN_KEY } from '@/config/constant'

export const getToken = () => {
  return Cookies.get(TOKEN_KEY)
}

export const setToken = (token: string) => {
  return Cookies.set(TOKEN_KEY, `${token}`)
}

export const removeToken = () => {
  return Cookies.remove(TOKEN_KEY)
}

export const getUserName = () => {
  return localStorage.getItem(PEAR_USER_NAME)
}

export const setUserName = (value: string) => {
  return localStorage.setItem(PEAR_USER_NAME, `${value}`)
}

export const removeUserName = () => {
  return localStorage.removeItem(PEAR_USER_NAME)
}

export const getPassword = () => {
  return localStorage.getItem(PEAR_PASSWORD)
}

export const setPassword = (value: string) => {
  return localStorage.setItem(PEAR_PASSWORD, `${value}`)
}

export const removePassword = () => {
  return localStorage.removeItem(PEAR_PASSWORD)
}
