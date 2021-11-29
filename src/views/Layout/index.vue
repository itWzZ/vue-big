<template>
  <div>
    <el-container class="main-container">
      <!-- 头部区域 -->
      <el-header>
        <!-- 左侧的 logo -->
        <img src="../../assets/images/logo.png" alt="" />
        <!-- 右侧的菜单 -->
        <el-menu
          class="el-menu-top"
          mode="horizontal"
          background-color="#23262E"
          text-color="#fff"
          active-text-color="#409eff"
        >
          <el-submenu index="1">
            <template slot="title">
              <!-- 头像 -->
              <img
                :src="userInfo.user_pic || defaultImg"
                alt=""
                class="avatar"
              />
              <span>个人中心</span>
            </template>
            <el-menu-item index="1-1" @click="$router.push('user-info')"
              ><i class="el-icon-s-operation"></i>基本资料</el-menu-item
            >
            <el-menu-item index="1-2" @click="$router.push('user-avatar')"
              ><i class="el-icon-camera"></i>更换头像</el-menu-item
            >
            <el-menu-item index="1-3" @click="$router.push('user-pwd')"
              ><i class="el-icon-key"></i>重置密码</el-menu-item
            >
          </el-submenu>
          <span index="2" @click="logOut" style="width: 89px" class="logOutA"
            ><i
              class="el-icon-switch-button"
              style="color: #909399; margin-right: 8px; font-size: 17px"
            ></i
            >退出</span
          >
        </el-menu>
      </el-header>
      <el-container>
        <!-- 侧边栏区域 -->
        <el-aside style="width: 200px">
          <div class="aside-info">
            <img :src="userInfo.user_pic || defaultImg" alt="" class="avatar" />
            <span>欢迎你 {{ userInfo.nickname }}</span>
          </div>
          <el-menu
            class="el-menu-vertical-demo"
            @open="handleOpen"
            @close="handleClose"
            background-color="#23262e"
            text-color="#fff"
            active-text-color="#ffd04b"
            unique-opened
            router
            :default-active="$route.fullPath"
          >
            <div v-for="(item, index) in menus" :key="index">
              <el-menu-item :index="item.indexPath" v-if="!item.children">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.title }}</span>
              </el-menu-item>

              <el-submenu :index="item.indexPath" v-else style="width: 200px">
                <template slot="title" style="width: 160px">
                  <i :class="item.icon"></i>
                  <span>{{ item.title }}</span>
                </template>

                <el-menu-item
                  :index="item2.indexPath"
                  v-for="(item2, index2) in item.children"
                  :key="index2"
                  ><i :class="item2.icon"></i>{{ item2.title }}</el-menu-item
                >
              </el-submenu>
            </div>
            <!-- 导航二
            <el-submenu index="3">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>个人中心</span>
              </template>
              <el-menu-item index="/userinfo9 mnm">基本资料</el-menu-item>
              <el-menu-item index="3-2">更换头像</el-menu-item>
              <el-menu-item index="3-2">重置密码</el-menu-item>
            </el-submenu> -->
          </el-menu>
        </el-aside>
        <el-container>
          <!-- 页面主体区域 -->
          <el-main> <router-view></router-view></el-main>
          <!-- 底部 footer 区域 -->
          <el-footer> @itWzZ</el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { menusApi } from '../../api/index.js'
import { mapState } from 'vuex'
import defaultImg from '@/assets/images/avatar.jpg'
export default {
  data () {
    return {
      menus: [],
      defaultImg: defaultImg
    }
  },

  created () {
    this.$store.dispatch('userInfoHandle')
    this.getMenus()
    this.$router.push('/home')
  },

  computed: {
    ...mapState(['userInfo'])
  },

  methods: {
    async logOut () {
      const sesult = await this.$confirm('您要退出首页, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).catch((e) => {
        return e
      })
      if (sesult === 'confirm') {
        this.$store.commit('delToken')
        localStorage.clear()
        this.$router.push('/login')
      } else {
        return false
      }
    },
    handleOpen (key, keyPath) {
      // console.log(key, keyPath)
    },
    handleClose (key, keyPath) {
      // console.log(key, keyPath)
    },
    async getMenus () {
      const res = await menusApi()
      this.menus = res.data.data
    },
    mounted () {}
  }
}
</script>
<style lang='less' scoped>
.main-container {
  height: 100%;
  height: 100vh;
  .el-header,
  .el-aside {
    background-color: #23262e;
  }

  .el-header {
    padding: 0;
    display: flex;
    justify-content: space-between;
  }

  .el-footer {
    background-color: #eee;
    font-size: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px !important;
  }
}
.aside-info {
  width: 200px;
  height: 70px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid #000;
  span {
    color: #fff;
    font-size: 12px;
  }
}
.el-menu-item,
is-active,
.el-submenu__title {
  width: 200px;
}
.avatar {
  border-radius: 50%;
  width: 55px;
  height: 55px;
  background-color: #fff;
  margin-right: 10px;
  object-fit: cover;
}
.logOutA {
  width: 89px;
  display: inline-block;
  height: 60px;
  text-align: center;
  color: #fff;
  line-height: 60px;
  font-size: 13px;
  cursor: pointer;
}
.logOutA:hover {
  background-color: #1c1e25;
}
</style>
