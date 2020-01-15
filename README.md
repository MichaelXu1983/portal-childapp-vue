# 微前端子应用脚手架
## 目录简介
1. [介绍](#介绍) 
2. [程序目录](#程序目录)
3. [开发与构建命令](#开发与构建命令)
    * [依赖配置](#依赖配置)
    * [命令说明](#命令说明)
4. [开发流程](#开发流程)
    * [概述](#概述)
    * [载入组件](#载入组件)
    * [设置路由](#设置路由)
    * [设置菜单](#设置菜单)
    * [配置测试接口](#配置测试接口)
    * [创建http请求](#创建http请求)
    * [调用http请求](#调用http请求)
    * [使用vuex(可选)](#使用vuex)
      * [触发action](#触发action)
      * [创建store](#创建store)
      * [定义sotre计算属性](#定义sotre计算属性)
      * [创建modules](#创建modules)
    * [更改主题(可选)](#更改主题)
    * [发布](#发布)
5. [注意事项](#注意事项)
    * [原则](#原则)
    * [如何定义全局方法或变量](#如何定义全局方法或变量)
    * [如何使用sessionStorage/localStorage/cookie](#如何使用sessionStorage/localStorage/cookie)
    * [如何跨子应用数据交互](#如何跨子应用数据交互)
    * [如何链接跳转](#如何链接跳转)
    * [全局样式规范](#全局样式规范)
6. [表单项验证增强](#表单项验证增强)
    * [表单验证介绍](#表单验证介绍)
    * [表单验证示例](#表单验证示例)
    * [Props](#Props)
    * [verify设置项](#verify设置项)

## <a name="介绍">介绍</a>
基于 vue & vuex & vue-router & axios & element-ui 的微前端子应用脚手架工程模板，可用于入门脚手架或者 SingleSPA 子应用脚手架使用  

[进入独立应用](http://child.portal.michaelxu.cn/REACTCHILDAPP/)  

[进入Portal整合应用](http://portal.michaelxu.cn/)

## <a name="程序目录">程序目录</a>
```
|── build                                   // 构建相关  
├── config                                  // 配置相关
│   ├── dev.env.js                          // 开发环境
│   ├── index.js                            // 项目配置（配置测试环境代理请求地址）
│   ├── prod.env.js                         // 生产环境
├── src                                     // 源代码
│   ├── api                                 // 所有 HTTP 请求
│   │   ├── home.js                         // 首页（根据业务模块命名，和 /views/* 一一对应）
│   ├── assets                              // 图片样式等静态资源
│   ├── mixins                              // 混入对象
│   │   ├── el-form-item.js                 // 表单项验证增强
│   │   ├── index.js                        // 定义并导出混入对象的组件
│   ├── components                          // 全局公用组件
│   ├── router                              // 路由
│   │   ├── asyncComponents.js              // 异步载入的组件
│   │   ├── components.js                   // 同步载入的组件（设置会被编译到本app.js中的组件）
│   │   ├── index.js                        // 路由入口
│   │   ├── menu.js                         // 菜单设置（设置所有一级、二级、三级菜单）
│   │   ├── routes.js                       // 路由设置（设置所有路由对应组件别名）
│   ├── store                               // 全局 store 管理
│   │   ├── modules                         // 模块
│   │   │   ├──  user.js                    // 用户（定义 user 模块）
│   │   ├── getters.js                      // 定义 store 计算属性（定义 store 计算属性，以逗号分割增加）
│   │   ├── index.js                        // 组装 store 并导出（组装 user 并导出）
│   ├── utils                               // 全局公用方法
│   │   ├── auth.js                         // 操作 token 
│   │   ├── cookies.js                      // 操作 cookies
│   │   ├── index.js                        // 公用方法
│   │   ├── request.js                      // 全局 http 请求方法封装
│   │   ├── storage.js                      // 全局 storage 相关方法封装
│   ├── views                               // 页面视图
│   │   ├── home                            // 响应路由切换的 vue 组件（根据业务模块命名，和 /api/* 一一对应）
│   ├── app.js                              // vue 入口加载组件初始化等
│   ├── config.js                           // 微服务 id 存放在这个文件中，webpack、server 等 js 都有读取这个id配置
│   ├── service.js                          // Portal 入口加载组件初始化等
├── theme                                   // 主题文件目录
├── element-variables.scss                  // 主题变量文件
└── package.json                            // 包配置
```
可只关注有括号说明的目录或文件，文件内有括号中一样的注释，比如：
```
├── config                                  // 配置相关
│   ├── index.js                            // 项目配置（配置测试环境代理请求地址）

// 配置测试环境代理请求地址
proxyTable: {
      // 例如将'localhost:8080/api/user'代理到'http://rap2api.taobao.org/app/mock/95082/user'
      '/api': {
        target: 'http://rap2api.taobao.org/app/mock/95082/', // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: { '^/api': '' } // pathRewrite 来重写地址，将前缀 '/api' 转为 '/'。
      },
},                     
```

## <a name="开发与构建命令">开发与构建命令</a>
### <a name="依赖配置">依赖配置</a>
```shell
# 安装依赖   
npm install

# 进入开发模式，启动前台应用，localhost:3000，监听vue文件改动自动刷新浏览器  
npme start

# 构建文件到dist目录供发布，无法单独部署访问，必须集成到portal访问
npm run build
```

如果一切顺利，就能正常打开端口: [http://localhost:3000/](http://localhost:3000/)       

### <a name="命令说明">命令说明</a>

| `npm run <script>` | 解释             |
| ------------------ | ---------------- |
| `dev`              | 打包测试资源     |
| `build`            | 打包正式资源     |
| `start`            | 启动3000端口服务 |
* 开发使用 `dev/dev:ie 和 start`
* 发布使用 `build`

## <a name="开发流程">开发流程</a>
### <a name="概述">概述</a>
1. 访问 [海关服务市场](http://www.portal.com) 填写配置后，点击下载按钮，下载本脚手架前端工程，确认 `src/config.js` 里的 SERVICEID 和 SERVICENAME 配置是否正确；
2. 根据项目实际需求，配置组件 `src/router/components.js` 、路由 `src/router/router.js` 、菜单 `src/router/menu.js` 、HTTP 请求代理地址 `/config/index.js`，准备各路由所对应的 vue 文件（例如：`src/views/home.js`，请根据业务模块命名），分配给项目成员实现；
3. 访问 [可视化接口管理工具](http://10.200.15.38:2222) 配置 mock 数据；
4. 实现 vue 文件的界面部分；
5. 后端实现 RESTful 接口，并维护接口文档；
6. 调试后端接口；
7. 测试。

### <a name="载入组件">载入组件</a>
文件地址：[`/src/router/components.js`](/src/router/components.js) 

```js
// 设置会被编译到本app.js中的组件
const components = {
   '/home/index': () => import('@/views/home/index.vue'),
   '/home/element/message': () => import('@/views/home/element/message.vue'),
   '/home/element/notice': () => import('@/views/home/element/notice.vue')
} 
```    
### <a name="设置路由">设置路由</a>
文件地址：[`/src/router/routes.js`](/src/router/routes.js) 

```js
// 设置路由
const routes = [
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
  }
]   
```
### <a name="设置菜单">设置菜单</a>
文件地址：[`/src/router/menu.js`](/src/router/menu.js) 

```js
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
          }
        ]
      }
    ]
  }
]  
```
### <a name="配置测试接口">配置测试接口</a>
文件地址：[`/config/index.js`](/config/index.js) 
```js
// 配置测试环境代理请求地址
proxyTable: {
    // 例如将'localhost:8080/api/xxx'代理到'http://api.xxx.cn/xxx'
    '/api': {
        target: 'http://rap2api.taobao.org/app/mock/95082/', // 接口的域名
        secure: false, // 如果是https接口，需要配置这个参数
        changeOrigin: true, // 如果接口跨域，需要进行这个参数配置
        pathRewrite: { '^/api': '' } // pathRewrite 来重写地址，将前缀 '/api' 转为 '/'。      
    },
},  
```
#### <a name="创建http请求">创建http请求</a>
文件地址：[`/api/home.js`](/api/home.js) 
```js
import request from '@/utils/request'
// 根据业务模块命名，和 /views/* 一一对应

export function fakeUser (params) {
  // 创建用户
  return request({
    url: '/api/user', // 通过 /config/index.js 中 proxyTable 代理转发请求
    method: 'POST',
    data: params
  })
} 
```
### <a name="调用http请求">调用http请求</a>
文件地址：[`/src/views/home/index.vue`](/src/views/home/index.vue) 

```js
<template>
  <div class="hello">
    <p>头像：<img :src="user.avatar" height="50" /></p>
    <p>角色：</p>
    <p>用户名：</p>
    <p>介绍：</p>
  </div>
</template>

data() {
    return {
      msg: '欢迎使用',
      user: {
        id:'82073',
        roles: '',
        name: '',
        introduction: '',
        avatar: '',
      },
    }
  },

methods: {
    // 调用http请求
    getUser() {
      // 获取用户
      queryUser(this.user.id).then(response => {
        const { roles, name, avatar, introduction } = response.data
        // 业务逻辑
        this.user.name = name
        this.user.roles = roles
        this.user.introduction = introduction
        this.user.avatar = avatar
      })
    },     
```      
### <a name="使用vuex">使用vuex(可选)</a>
#### <a name="触发action">触发action</a>
文件地址：[`/src/views/home/index.vue`](/src/views/home/index.vue) 

```js
<template>
  <div class="hello">
    <p>头像：<img :src="avatar" height="50" /></p>
    <p>角色：</p>
    <p>用户名：tax</p>
    <p>介绍：</p>
  </div>
</template>

data() {
    return {
      msg: '欢迎使用',
      user: {
        id:'82073',
        roles: '',
        name: '',
        introduction: '',
        avatar: '',
      },
      paraCreate: {
        username: 'michael',
        password: '123456',
      },
      paraEdit: {
        username: 'jordan',
      },
    }
  },

methods: {
// vuex 写法
getUser() {
  // 任何状态的改变都是通过触发 action 开始
  Store.dispatch('GetUserInfo').then(response => {
  const { status, statusText, headers, data } = response
  })
},           

// 通过计算属性返回状态
computed: {
   // 使用对象展开运算符将 getter 混入 computed 对象中
   ...mapGetters(['name', 'avatar', 'introduction', 'roles'])
}   
```      
#### <a name="组装store">组装store</a>
文件地址：[`/src/store/index.js`](/src/store/index.js)

```js
import user from './modules/user' // 导入 user 模块
// 组装 user 并导出
const store = new Vuex.Store({
  modules: {
    user // 对应上面导入的 user 模块，以逗号分割增加组装
  },
  getters
})   
```  
#### <a name="定义sotre计算属性">定义sotre计算属性</a>
文件地址：[`/src/store/getters.js`](/src/store/getters.js)

```js
const getters = {
    // 定义 store 计算属性，以逗号分割增加
    token: state => state.user.token,
    avatar: state => state.user.avatar,
    name: state => state.user.name,
    introduction: state => state.user.introduction,
    roles: state => state.user.roles
}         
```
#### <a name="创建modules">创建modules</a>
文件地址：[`/src/store/modules/user.js`](/src/store/modules/user.js)

```js
import { getUserInfo } from '@/api/home'
import { getToken } from '@/utils/auth'

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
    GetUserInfo({ commit, state }) {
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
```  
### <a name="更改主题">更改主题(可选)</a>
```bash
# 改变主题色变量 
vim element-variables.scss
$--color-primary: #FF003C !default;

# 生成主题文件目录，使修改生效
node_modules/.bin/et -w // -w 参数是监听文件改动自动编译
```   
### <a name="发布">发布</a>
```bash
$ npm run build // 打包文件为 build 文件夹，请以此为根目录
```

## <a name="注意事项">注意事项</a>

### <a name="原则">原则</a>
1. /api/*.js 所有 js 都用驼峰命名，并且内部注释该 js 功能，删除未用 js；
2. 根据业务模块来划分 views，并且将 views 和 api 两个模块一一对应，方便维护；
3. 独立的东西，没有必要使用 vuex 来存储 data，每个页面里存放自己的 data 就行。但如登录 token，用户信息，或者是一些全局个人偏好设置等，还是用vuex管理更加的方便，具体还是要结合业务场景；
4. 后端返回前端的数据，字段名同数据库中的字段名，并转为小写字母开头的驼峰式命名，构造 mock 数据时也要注意这一点；
5. 工程编译时，`src` 目录下的 `assets` 目录下的文件会被直接复制到 dist 目录下；
6. `@` 是 `src` 的别名，在程序中引入路径的时候，`@/utils/request`就直接可以代替`../src/utils/request`；
7. 为了便于维护，对话框、页签等如果里面的内容比较多（超过30行），要独立成 vue 组件，尽量不要让一个 vue 组件的代码太多（超过500行超过20K）,尽量把 vue 文件里的 js 移到单独的文件，便于使用编辑器的 js 校验 js 格式化功能。vue 文件中 css 代码行数较多时（超过50行），亦可将 css 移到单独的 css 文件。模板部分要保持在 vue 文件里，以使用 Vetur 插件的模板语法校验功能。
8. 使用 VSCode 作为 js/vue 的编辑器，并安装以下插件 `EditorConfig for VSCode` , `Prettier-Standard - JavaScript formatter` , `JavaScript Standard Style` , `stylefmt` , `Vetur`；
9. 在 VSCode 的配置里要加下面的命令，格式化时使用单引号而不是双引号和防止自动加分号：`"prettier.singleQuote": true`,`"prettier.semi": false` 
10. 可修改 `/src/app.js` 中的 `import App from '@/views/main.vue'` 来去左侧菜单；
11. 安装并配置 ESLint（可组装的JavaScript和JSX检查工具，保持团队代码规范统一），依次点击 文件 > 首选项 > 设置 打开 VSCode 配置文件，添加如下配置  

```json
  "eslint.validate": [
		"javascript",
		"javascriptreact",
		"html",
		{
			"language": "vue",
			"autoFix": true
		}
	],
	"eslint.options": {
		"plugins": ["html"]
	},
	"eslint.autoFixOnSave": true,
	"eslint.alwaysShowStatus": true,
	"prettier.semi": false,
	"prettier.singleQuote": true,
	"prettier.jsxSingleQuote": true,
	"vetur.format.defaultFormatter.html": "js-beautify-html",
	"vetur.format.defaultFormatterOptions": {
		"wrap_attributes": "force-aligned"
	}  
```

### <a name="如何定义全局方法或变量">如何定义全局方法或变量</a>
子应用创建的全局方法或变量，都要放到子应用ID的命名空间下，例如：  
   
```js
import {SERVICEID} from './config.js'
let ns = window[SERVICEID] = window[SERVICEID] || {}
ns.foo = { bar: 'val1', baz: 'val2'}
ns.qux = (a, b) => {}    
```    

### <a name="如何使用sessionStorage/localStorage/cookie">如何使用sessionStorage/localStorage/cookie</a>  
在脚手架工程下提供sessionStorage的前后端操作库(`src/utils/storage.js`)，接管sessionStorage操作。
```js
import {SERVICEID} from './config.js'
import SessionStorage from './utils/storage.js'
SessionStorage.setServiceId(SERVICEID) // 设置子应用id
SessionStorage.setItem('foo', 'value')
```

在脚手架工程下提供localStorage的前后端操作库(`src/utils/storage.js`)，接管localStorage操作。
```js
import {SERVICEID} from './config.js'
import LocalStorage from './utils/storage.js'
LocalStorage.setServiceId(SERVICEID) // 设置子应用id
LocalStorage.setItem('foo', 'value')
```

在脚手架工程下提供cookie的前后端操作库(`src/utils/cookies.js`)，接管cookie操作。

```js
import { SERVICEID } from './config.js'
import Cookies from './utils/cookies.js'
// 操作 Cookies 是往浏览器 LocalStorage 里存值，通过 key 来区分，为了防止多个子应用设置 cookies 超量
Cookies.setServiceId(SERVICEID) // 设置子应用id
Cookies.set('name', 'value'); // 永不过期
Cookies.set('name', 'value', { expires: 7 }); // 过期时间7天
Cookies.get('name'); // => 'value'
Cookies.remove('name');
Cookies.get('name'); // => undefined
```

### <a name="如何跨子应用数据交互">如何跨子应用数据交互</a>
1. 在`portal framework` 里我们定义了`portal.global`为一个`Observable`实例，`Observable`是`订阅/发布模式`的实现，所以`portal.global`支持 `get``set``subscribe``unsubscribe` 等方法
   ```js
    function callback(value, path) {
        console.log(value, path);
    }
        
    portal.global.set('foo', { bar: 'value' },true) // 改变属性foo的值，且不允许被订阅
    portal.global.set('foo.bar', 'newValue') // 改变属性 foo.bar的值
    portal.global.get('foo') // 获取属性foo 的值
    portal.global.get('foo.bar') // 获取属性bar 的值 
    portal.global.subscribe('foo', callback) // 监听foo属性的改变
    portal.global.subscribe('foo.bar', callback) // 监听bar属性的改变
    portal.global.unsubscribe('foo', callback) // 停止监听 foo 属性的改变
    portal.global.unsubscribe('foo.bar', callback) // 停止监听 bar 属性的改变
   ```
2. 子应用可以在 bootstrap 生命周期函数中，声明自己的可以被订阅的跨服务数据项，声明方式类似于：

    ```js
    portal.global.set("form.count",1,false)
    ```
3. 其他子界面可以在自己的bootstrap生命周期函数中声明要监听跨服务业数据项。声明方式类似于：

    ```js
    portal.global.subscribe("form.count",function(value, path){
        //获取value做相应动作
    });
    ```

### <a name="如何链接跳转">如何链接跳转</a>
1. 子应用里的链接要设置属性`target="_blank"`，使页面在新窗口打开。
2. 集成页面的js会遍历没有设置属性为`target="_blank"`的链接，并禁止这些链接在当前窗口打开。

### <a name="全局样式规范">全局样式规范</a>
  在集成页面已经引入`element-ui`,并且会对`element-ui`样式作统一调整，因此所有子应该尽量使用`element-ui`样式，并且不要自己再引入`element-ui`。参见`element-ui`文档 `http://element.eleme.io`  


## <a name="表单项验证增强">表单项验证增强</a>
### <a name="表单验证介绍">表单验证介绍</a>
 只是基于 element UI 的 el-form-item 原本的校验方式做了一层封装，主要让表单项的验证编码更快捷。

在 el-form-item 的 props 上新增了 一个 verify，非侵入式，完全不会影响你继续使用ElementUI的原生校验。

  源代码在： `/src/mixins/el-form-item.js`

### <a name="表单验证示例">表单验证示例</a>
```html
<template>
  <el-form :model="form" ref="numberForm" label-width="100px">

    <el-form-item label="名称" prop="name" :verify="['NotNull', 'Length=3']">
      <el-input v-model="form.name"></el-input>
    </el-form-item>

    <el-form-item label="年龄" prop="age" :verify="['NotNull', 'Number']">
      <el-input v-model="form.age"></el-input>
    </el-form-item>

    <el-form-item label="电子邮箱" prop="email" :verify="['NotNull', 'Email']">
      <el-input v-model="form.email"></el-input>
    </el-form-item>

    <el-form-item label="生日" prop="sr" :verify="['NotNull', 'DateTime=yyyy年MM月dd日']">
      <el-input v-model="form.sr"></el-input>
    </el-form-item>

    <el-form-item label="手机号码" prop="phone" :verify="['NotNull', 'CnPhone']">
      <el-input v-model="form.phone"></el-input>
    </el-form-item>

    <el-form-item label="备注" prop="bz" :verify="['NotNull', 'Regex=[a-z]{10,}']">
      <el-input v-model="form.bz"></el-input>
    </el-form-item>
    
    <el-form-item>
      <el-button type="primary">提交</el-button>
    </el-form-item>
  
  </el-form>
</template>

<script>
  export default {
    data () {
      return {
        dataLoading: true,
        detectors: [],
        form: {
          age: '1',
          name: '',
          email: '',
          sr: '',
          phone: '',
          bz: ''
        }
      }
    },
  }

</script>
```

### <a name="Props">Props</a>

| 参数          | 说明                          | 类型    | 默认值 | required   |
| ------------- | ---------------------------- | ------ | ------- | ---------- |
| verify        | 表单项，验证设置              | Array   | []     |             |


### <a name="verify设置项">verify设置项</a>

| 设置项         | 说明                         | 是否需要参数 | 示例                     |
| ------------- | ---------------------------- | ----------- | ------------------------ |
| NotNull       | 不能为空                      | 不需要      | 'NotNull'                |
| Number        | 必须为数字                    | 不需要      | 'Number                  |
| Int           | 必须为整数                    | 不需要      | 'Int'                    |
| DateTime      | 必须是日期时间                | 日期时间格式 | 'DateTime=yyyy年MM月dd日' |
| Email         | 必须是Email                  | 不需要       | 'Email'                  |
| ZipCode       | 必须是邮政编码                | 不需要       | 'ZipCode'                |
| CnTel         | 必须是固定电话                | 不需要       | 'CnTel'                  |
| CnPhone       | 必须是手机号码                | 不需要       | 'CnPhone'                |
| IDCardNo      | 必须身份证号码                | 不需要       | 'IDCardNo'               |
| Length        | 长度等于、大于、小于n                    | 长度         | 'Length=3', 'Length>3', 'Length<3'               |
| Regex         | 必须符合正则表达式            | 正则表达式    | 'Regex=[a-z]{1,}'   'Regex=\^\\\\w+$&#124;只能是数字或英文字母'       |

