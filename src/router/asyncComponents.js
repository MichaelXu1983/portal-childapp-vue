// 设置会被编译到本app.js中的组件，默认import异步加载组件，可减少集成页面打开时的网络占用和内存占用

const components = {
    '/': () => import('@/views/home/index.vue'),
    '/home/index': () => import('@/views/home/index.vue'),
    '/home/element/message': () => import('@/views/home/element/message.vue'),
    '/home/element/notice': () => import('@/views/home/element/notice.vue'),
    '/home/element/form': () => import('@/views/home/element/form.vue')
  }
export default components
