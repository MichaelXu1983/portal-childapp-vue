<template>
   <div class="hello">
    <h2></h2>
     <h3>Message 消息提示示例</h3>
    <p>
      <el-button plain @click="msgSuccess">成功</el-button>
      <el-button plain @click="msgWarn">警告</el-button>
      <el-button plain @click="msgCom">消息</el-button>
      <el-button plain @click="msgErr">错误</el-button>
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
    msgCom() {
      this.$message('这是一条消息提示')
    },
    msgSuccess() {
      this.$message({
        message: '恭喜您，这是一条成功消息',
        type: 'success',
      })
    },

    msgWarn() {
      this.$message({
        message: '警告哦，这是一条警告消息',
        type: 'warning',
      })
    },

    msgErr() {
      this.$message.error('错了哦，这是一条错误消息')
    },
  },
}
</script>

<style>
.hello { padding: 20px;}
</style>
