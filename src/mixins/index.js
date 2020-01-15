import ElFormItemMixin from './el-form-item.js'

const mixins = {
  install: Vue => {
    // 对 el-form-item 验证增强
    Vue.component('ElFormItem').mixin(ElFormItemMixin)
  }
}

// 导出组件
export default mixins
