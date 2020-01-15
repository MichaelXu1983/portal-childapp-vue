<template>
  <div class='hello'>
    <img
      :src='logo'
      alt='LOGO'
      class='logo'
    >
    <h2>{{ msg }}</h2>
    <p>
      头像：
      <img
        :src='avatar'
        height='50'
      >
    </p>
    <p>角色：{{roles}}</p>
    <p>用户名：{{name}}</p>
    <p>介绍：{{introduction}}</p>
    <ul>
      <li>
        <el-button
          type='primary'
          size='medium'
          v-on:click='createUser'
        >创建用户</el-button>
        <el-button
          type='primary'
          size='medium'
          v-on:click='getUser'
        >获取用户</el-button>
        <el-button
          type='primary'
          size='medium'
          v-on:click='editUser'
        >修改用户</el-button>
        <el-button
          type='primary'
          size='medium'
          v-on:click='deleteUser'
        >删除用户</el-button>
        <el-button
          type='primary'
          size='medium'
          @click='testJqeury'
        >测试jquery</el-button>
      </li>
    </ul>
  </div>
</template>
<script>
// 根据业务模块命名，和 /api/* 一一对应
import { mapGetters } from 'vuex';
import Store from '@/store';
import {
  fakeUser,
  queryUser,
  modifyUser,
  removeUser,
} from '@/api/home';
// import { SERVICEID } from '@/config.js'

// import { SessionStorage, LocalStorage } from '@/utils/storage.js'
// import Cookies from '@/utils/cookies.js'
export default {
  name: 'home',
  components: {},
  data() {
    return {
      msg: '欢迎使用',
      logo: 'https://cn.vuejs.org/images/logo.png',
      user: {
        id: '82073',
        roles: '',
        name: '',
        introduction: '',
        avatar: ''
      },
      paraCreate: {
        username: 'michaelxu',
        password: '123456'
      },
      paraEdit: {
        username: 'michaelxu'
      },
      pmddata: []
    };
  },
  methods: {
    // jquery
    testJqeury() {
      $('.logo').fadeIn();
    },
    // vuex 写法
    getUser() {
      // 任何状态的改变都是通过触发 action 开始
      Store.dispatch('GetUserInfo').then(response => {
        const { status, statusText, headers, data } = response;
      });
    },
    // 调用http请求
    createUser() {
      // 创建用户
      fakeUser(this.paraCreate).then(response => {
        const { code, addtionalMessage } = response.data;
        // 业务逻辑
        this.$message({
          message: addtionalMessage,
          type: 'success'
        });
      });
    },
    // getUser() {
    //   // 获取用户
    //   queryUser(this.user.id).then(response => {
    //     const { roles, name, avatar, introduction } = response.data
    //     // 业务逻辑
    //     this.user.name = name
    //     this.user.roles = roles
    //     this.user.introduction = introduction
    //     this.user.avatar = avatar
    //   })
    // },
    editUser() {
      // 修改用户
      modifyUser(this.paraEdit).then(response => {
        const { code, addtionalMessage } = response.data;
        // 业务逻辑
        this.$message({
          message: addtionalMessage,
          type: 'success'
        });
      });
    },
    deleteUser() {
      // 创建用户
      removeUser(this.user.id).then(response => {
        const { code, addtionalMessage } = response.data;
        // 业务逻辑
        this.$message({
          message: addtionalMessage,
          type: 'success'
        });
      });
    }
  },
  created: function() {
    // LocalStorage.setServiceId(SERVICEID) // 设置子应用id
    // LocalStorage.setItem('testLS', '测试LocalStorage')
    // SessionStorage.setServiceId(SERVICEID) // 设置子应用id
    // SessionStorage.setItem('testSS', '测试SessionStorage')
    // 操作 Cookies 是往浏览器 LocalStorage 里存值，通过 key 来区分，为了防止多个子应用设置 cookies 超量
    // Cookies.setServiceId(SERVICEID) // 设置子应用id
    // Cookies.set('testCookies', '测试Cookies') // 永不过期
  },
  // 通过计算属性返回状态
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters(['name', 'avatar', 'introduction', 'roles'])
  }
};
</script>
<style scoped>
.logo {
  display: none;
}
.hello {
  padding: 20px;
}
</style>
