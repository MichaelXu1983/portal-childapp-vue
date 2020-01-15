const { SERVICEID } = require('@/config.js')

// 设置路由
const routes = [
  {
    path: `/${SERVICEID}/`,
    component: '/home/index'
  },
  {
    path: `/${SERVICEID}/home/index`,
    component: '/home/index',
  },
  {
    path: `/${SERVICEID}/home/element/message`,
    component: '/home/element/message',
  },
  {
    path: `/${SERVICEID}/home/element/notice`,
    component: '/home/element/notice',
  },
  {
    path: `/${SERVICEID}/home/element/form`,
    component: '/home/element/form',
  }
]

module.exports = routes
