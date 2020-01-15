import request from '@/utils/request'
import { microService } from '@/utils/index'
// 根据业务模块命名，和 /views/* 一一对应

export function fakeUser(params) {
  // 创建用户
  return request({
    url: `/api1/user?${params}`, // 通过 /config/index.js 中 proxyTable 代理转发请求
    method: 'POST',
    data: params
  })
}
export function queryUser(params) {
  // 查询用户
  return request({
    url: `/api1/user?${params}`,
    method: 'get'
  })
}
export function modifyUser(params) {
  // 修改用户
  return request({
    url: `/api1/user?${params}`,
    method: 'patch'
  })
}
export function removeUser(params) {
  // 删除用户
  return request({
    url: `/api1/user?${params}`,
    method: 'delete'
  })
}
