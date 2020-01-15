import Vue from 'vue'
import VueRouter from 'vue-router'
import '@/router/routes.js'
import routes from '@/router/index.js'
import store from '@/store/index.js'
// import ELEMENT from 'element-ui'
// import { Button, Message } from 'element-ui' // 按需引入 Element
// import '../theme/index.css'
import App from '@/views/app.vue'
// import Vuex from 'vuex'
import MixinELEMENT from './mixins/index.js'
// import $ from 'jquery'
Vue.use(VueRouter)
// Vue.use(ELEMENT) // 完整引用 Element
// Vue.use(Button, Message) // 按需引用 Element
// Vue.use(Vuex)
// Vue.prototype.$message = Message // 绑定到 Vue 全局，可以使用这种方式调用：this.$message
Vue.use(MixinELEMENT)

const router = new VueRouter({
  mode: 'hash',
  routes
})

let vm = new Vue({
  router,
  store,
  el: `#root`,
  render: h => h(App)
})

Vue.use({
  vm
})
