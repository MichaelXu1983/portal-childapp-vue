import { queryUser } from '@/api/home'
import { getToken } from '@/utils/auth'

// 定义 user 模块
const user = {
  state: {
    // vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态
    user: '',
    userid: '82073',
    token: getToken(),
    name: '',
    avatar: '',
    introduction: '',
    roles: []
  },

  mutations: {
    // 类似事件，实际进行状态更改的地方
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_INTRODUCTION: (state, introduction) => {
      state.introduction = introduction
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 异步逻辑都应该封装到 action 里面，业务逻辑写在视图里
    GetUserInfo ({ commit, state }) {
      // 获取用户信息
      return new Promise((resolve, reject) => {
        queryUser(state.userid)
          .then(response => {
            const { roles, name, avatar, introduction } = response.data

            if (roles && roles.length > 0) {
              // 验证返回的roles是否是一个非空数组
              commit('SET_ROLES', roles)
            } else {
              reject(new Error('getInfo: roles must be a non-null array !'))
            }
            commit('SET_NAME', name) // 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的
            commit('SET_AVATAR', avatar)
            commit('SET_INTRODUCTION', introduction)
            resolve(response)
          })
          .catch(error => {
            reject(error)
          })
      })
    }
  }
}

export default user
