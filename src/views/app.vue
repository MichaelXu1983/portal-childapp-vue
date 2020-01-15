<template>
  <div class='page'>
    <div id='domain' class='domain'>
      <a class='header-logo'>{{SERVICENAME}}</a>
    </div>
    <div class='content'>
      <div class='sidebar'>
        <el-menu
          class='sidebarwrap el-menu-vertical-demo'
          text-color='#FFFFFF'
          background-color='#313538'
          :collapse='isCollapse'
        >
          <div v-for='(item,index) in menus' :key='index'>
            <router-link :to='item.path' v-if='!item.children || item.children.length ===0'>
              <el-menu-item :index='`${index}`'>
                <template>
                  <i :class='item.meta.icon'></i>
                  <span>{{item.meta.title}}</span>
                </template>
              </el-menu-item>
            </router-link>
            <el-submenu :index='`${index}`' v-else>
              <template slot='title'>
                <i :class='item.meta.icon'></i>
                <span>{{item.meta.title}}</span>
              </template>
              <div v-for='(item2,index2) in item.children' :key='index2'>
                <router-link :to='item2.path' v-if='!item2.children || item2.children.length ===0'>
                  <el-menu-item :index='`${index}-${index2}`'>
                    <template>
                      <i :class='item2.meta.icon'></i>
                      <span>{{item2.meta.title}}</span>
                    </template>
                  </el-menu-item>
                </router-link>
                <el-submenu :index='`${index}-${index2}`' v-else>
                  <template slot='title'>
                    <i :class='item2.meta.icon'></i>
                    <span>{{item2.meta.title}}</span>
                  </template>
                  <router-link
                    :to='item3.path'
                    v-for='(item3,index3) in item2.children'
                    :key='index3'
                  >
                    <el-menu-item :index='`${index}-${index2}-${index3}`'>
                      <template>
                        <i :class='item3.meta.icon'></i>
                        <span>{{item3.meta.title}}</span>
                      </template>
                    </el-menu-item>
                  </router-link>
                </el-submenu>
              </div>
            </el-submenu>
          </div>
        </el-menu>
      </div>

      <div id='services-container' class='services-container'>
        <div :id='SERVICEID' :class='SERVICEID'>
          <router-view :key='$route.fullPath'></router-view>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { SERVICEID, SERVICENAME } from '../config.js';
import menu from '../router/menu.js';
import { fakeUser } from '@/api/home';

const menus = JSON.parse(JSON.stringify(menu));
for (let i = menus.length - 1; i >= 0; i--) {
  let menu = menus[i];
  if (!menu.meta || !menu.meta.title) {
    menus.splice(i, 1);
  } else if (menu.children && menu.children.length) {
    for (let j = menu.children.length - 1; j >= 0; j--) {
      let submenu = menu.children[j];
      if (!submenu.meta || !submenu.meta.title) {
        menu.children.splice(j, 1);
      }
    }
  }
}
export default {
  data() {
    return {
      SERVICEID,
      SERVICENAME,
      menus,
      isCollapse: true
    };
  }
};
</script>
<style scoped>
.page {
  position: relative;
  overflow: hidden;
}
.domain {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  right: 0;
  width: 100%;
  height: 50px;
  background-color: #313538;
}
.domain .logo {
  display: inline-block;
  min-width: 190px;
  line-height: 48px;
  font-size: 18px;
  text-align: center;
  color: #fff;
}
.header-logo {
  padding-left: 18px;
  line-height: 50px;
  color: #c3c3c4;
  font-size: 24px;
}

.content {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding-top: 50px;
}

.sidebar {
  /* position: fixed;
  top: 50px;
  left: 0;
  bottom: 0;*/
  float: left;
  color: #a3b6cc;
  background-color: #313538;
  font-size: 16px;
  width: 80px;
  overflow: hidden;
  height: calc(100vh);
}
.sidebarwrap {
  overflow: hidden;
}
.sidebarwrap i {
  color: hsla(0, 0%, 100%, 0.65) !important;
}
.services-container {
  width: auto;
  height: calc(100vh);
  overflow: scroll;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu--collapse {
  width: 80px;
  border: none
}

.menus-container {
  list-style-type: none;
  height: 100%;
}

.menus-container a {
  text-decoration: none;
  color: #cdd3f3;
}
.menu li {
  list-style: none;
  line-height: 40px;
  position: relative;
  user-select: none;
}
.menu li.haschilds > ul {
  display: none;
}
.menu li.haschilds.expanded > ul {
  display: block;
}
.menu li a::before {
  content: '○';
  vertical-align: 1px;
  display: inline-block;
  width: 16px;
  opacity: 0.5;
}

.menu li a.router-link-active,
.menu li a.router-link-active {
  color: #fff;
  background-color: #485cb4;
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0);
}
.menu li a.router-link-active::before {
  opacity: 1;
}
.menu li a.haschilds::before {
  display: none;
}
.menu li a.haschilds::after {
  content: '';
  width: 8px;
  height: 8px;
  border: 2px solid #a3b6cc;
  border-width: 0 2px 2px 0;
  position: absolute;
  right: 15px;
  top: 17px;
  transform: rotate(45deg);
  transition: transform 0.2s;
}
.menu li.expanded a.haschilds::after {
  transform: rotate(-135deg);
}
.menu li a {
  display: block;
  padding-left: 20px;
  background-color: rgba(255, 255, 255, 0.07);
  border-top: 1px solid rgba(0, 0, 0, 0);
  border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  transition: background-color 0.2s;
}
.menu li.level2 a {
  padding-left: 20px;
  background-color: rgba(0, 0, 0, 0.07);
}
.menu li.level1 a:hover {
  background-color: rgba(59, 81, 168, 0.05);
}

.menu li.level2 a:hover {
  background-color: rgba(59, 81, 168, 0.5);
  border-top: 1px solid rgba(0, 0, 0, 0.1);
  border-bottom: 1px solid rgba(0, 0, 0, 0);
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

table tr th,
table tr td {
  word-wrap: break-word;
}

table > thead > tr > th {
  border-bottom-width: 2px;
  background-color: #f8f8f8;
  font-weight: normal;
}

.servieces-list {
  position: absolute;
  left: 0;
  right: 0;
  top: 50px;
}

.servieces-list > div {
  width: calc(20% - 20px);
}
.servieces-list > div {
  cursor: pointer;
  display: flex;
  border-radius: 6px 0 0 6px;
  overflow: hidden;
}
.servieces-list .icon {
  width: 80px;
  min-height: 80px;
  font-size: 40px;
  text-align: center;
  line-height: 80px;
  color: #fff;
}

.servieces-list .info {
  padding: 10px 15px;
  background-color: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 0 6px 6px 0;
  flex: 1;
  display: flex;
  align-items: center;
}
</style>
