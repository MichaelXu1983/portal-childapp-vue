const { SERVICEID } = require('@/config.js')

// 设置所有一级、二级、三级菜单
const menuData = [
  {
    path: `/${SERVICEID}/home/index`,
    meta: { title: '首页', icon: 'fa fa-home' } // icon 支持 font-awesome 和 element
  },
  {
    path: `/${SERVICEID}/home/element/message`,
    meta: { title: '示例', icon: 'fa fa-inbox' },
    children: [
      {
        path: `/${SERVICEID}/home/element/message`,
        meta: { title: 'element', icon: 'el-icon-star-on' },
        children: [
          {
            path: `/${SERVICEID}/home/element/message`,
            meta: { title: '消息提示', icon: 'fa fa-comment' }
          },
          {
            path: `/${SERVICEID}/home/element/notice`,
            meta: { title: '通知', icon: 'fa fa-bell' }
          },
          {
            path: `/${SERVICEID}/home/element/form`,
            meta: { title: '表单验证', icon: 'fa fa-list-alt' }
          }
        ]
      }
    ]
  }
]
export default menuData
