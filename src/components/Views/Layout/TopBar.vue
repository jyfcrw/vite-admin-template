<template>
  <el-menu class="navbar clearfix" mode="horizontal">
    <hamburger></hamburger>
    <div class="content">
      <breadcrumb class="breadcrumb"></breadcrumb>
    </div>
    <!--右侧-->
    <div class="right-menu">
      <ex-err-log class="errLog-container right-menu-item"></ex-err-log>
      <el-dropdown class="avatar-container right-menu-item" trigger="click">
        <div class="avatar-wrapper">
          <span>{{ currentAdmin && currentAdmin.email }}</span>
          <i class="el-icon-caret-bottom"></i>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/">
              <el-dropdown-item>
                修改密码
              </el-dropdown-item>
            </router-link>
            <el-dropdown-item divided>
              <span @click="handleLogout" style="display: block;">退出</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
  </el-menu>
</template>

<script>
import { mapGetters } from 'vuex'
import { logout } from '@/api/session'
import Breadcrumb from './Breadcrumb.vue'
import Hamburger from './Hamburger'
import ExErrLog from './ExErrLog'

export default {
  computed: {
    ...mapGetters([
      'currentAdmin'
    ]),
    currentRouteName() {
      return this.$route.name
    }
  },
  methods: {
    async handleLogout () {
      await logout()
      this.$store.commit('session/clearToken')
      this.$router.push({name: 'Login'})
    }
  },
  created () {
    // if (!this.currentUser) {
    //   this.$router.push({name: 'Login'})
    // }
  },
  components: {
    Breadcrumb,
    Hamburger,
    ExErrLog
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  height: 51px;
  padding: 10px;
  //line-height: 20px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: space-around;

  .content {
    display: inline-block;
    .breadcrumb {
      padding-left: 10px;
      line-height: 30px;
    }
    @include mobile-device {
      display: none;
    }
  }

  .right-menu {
    //line-height: 28px;
    overflow: hidden;
    flex: 1;
    text-align: right;
    .avatar-wrapper {
      cursor: pointer;
    }
  }
}
</style>
