let SERVICEID // 子应用id

function getKey(key, type) {
  if (type === undefined) {
    type = 'local'
  }
  if (!SERVICEID) {
    throw new Error(
      'LocalStorage方法前需先调用LocalStorage.setServiceId设置子应用id'
    )
  }
  return `${SERVICEID}.${type}.${key}`
}

export const LocalStorage = {}
LocalStorage.setItem = function(key, value) {
  window.localStorage.setItem(getKey(key), value)
}

LocalStorage.getItem = function(key) {
  return window.localStorage.getItem(getKey(key))
}

LocalStorage.removeItem = function(key) {
  window.localStorage.removeItem(getKey(key))
}

LocalStorage.setServiceId = function(serviceId) {
  SERVICEID = serviceId.replace(/^\//, '')
}
LocalStorage.getServiceId = function() {
  return SERVICEID
}

export const SessionStorage = {}
SessionStorage.setItem = function(key, value) {
  window.sessionStorage.setItem(getKey(key, 'session'), value)
}

SessionStorage.getItem = function(key) {
  return window.sessionStorage.getItem(getKey(key, 'session'))
}

SessionStorage.removeItem = function(key) {
  window.sessionStorage.removeItem(getKey(key, 'session'))
}

SessionStorage.setServiceId = function(serviceId) {
  SERVICEID = serviceId.replace(/^\//, '')
}
SessionStorage.getServiceId = function() {
  return SERVICEID
}

export default { LocalStorage, SessionStorage }
