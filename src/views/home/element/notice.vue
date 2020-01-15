<template>
   <div class="hello">
    <h2></h2>
    <h3>Notification 通知示例</h3>
    <p>
      <el-button plain @click="notifySuccess">成功</el-button>
      <el-button plain @click="notifyWarn">警告</el-button>
      <el-button plain @click="notifyCom">消息</el-button>
      <el-button plain @click="notifyErr">错误</el-button>
    </p>
  </div>
</template>
<script>
// 根据业务模块命名，和 /api/* 一一对应

export default {
  name: 'secondary',
  components: {},
  data() {
    return {
      msg: '欢迎使用',
    }
  },
  methods: {
    notifySuccess() {
      this.$notify({
        title: '成功',
        message: '这是一条成功提示消息',
        type: 'success',
      })
    },

    notifyWarn() {
      this.$notify({
        title: '警告',
        message: '这是一条警告的提示消息',
        type: 'warning',
      })
    },

    notifyCom() {
      this.$notify.info({
        title: '消息',
        message: '这是一条消息的提示消息',
      })
    },

    notifyErr() {
      this.$notify.error({
        title: '错误',
        message: '这是一条错误的提示消息',
      })
    },
  },
}
</script>
<style>
.hello { padding: 20px;}
</style>
