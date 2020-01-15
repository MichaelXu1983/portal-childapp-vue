const getters = {
  // 定义 store 计算属性，以逗号分割增加
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  introduction: state => state.user.introduction,
  roles: state => state.user.roles
}
export default getters
