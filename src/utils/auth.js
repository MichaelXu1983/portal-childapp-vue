import { SERVICEID } from '@/config'
import { LocalStorage } from './storage'

const TokenKey = 'ElrondToken'

LocalStorage.setServiceId(SERVICEID)

export function getToken () {
  return LocalStorage.getItem(TokenKey)
}

export function setToken (token) {
  return LocalStorage.setItem(TokenKey, token)
}

export function removeToken () {
  return LocalStorage.removeItem(TokenKey)
}
