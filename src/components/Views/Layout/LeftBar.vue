<template>
  <el-menu :class="{opened: sidebar.opened}" 
    :collapse-transition="false"
    :collapse="!sidebar.opened"
    :default-active="currentRouteName"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#1890ff"
    mode="vertical">
    <router-link :to="{ name: 'Dashboard' }">
      <el-menu-item index="Dashboard">
        <svg-icon name="dashboard"></svg-icon>
        <template #title>{{ routeTitle('Dashboard') }}</template>
      </el-menu-item>
    </router-link>

    <router-link :to="{ name: 'User' }">
      <el-menu-item index="User">
        <svg-icon name="user"></svg-icon>
        <template #title>{{ routeTitle('User') }}</template>
      </el-menu-item>
    </router-link>

    <el-submenu index="SystemGroup">
      <template #title>
        <i class="el-icon-setting"></i>
        <span class="title">系统设置</span>
      </template>
      <router-link :to="{ name: 'Admin' }">
        <el-menu-item index="Admin">{{ routeTitle('Admin') }}</el-menu-item>
      </router-link>
    </el-submenu>
  </el-menu>
</template>

<script>
import { mapState } from 'vuex'
import _ from 'lodash'
export default {
  computed: {
    ...mapState({
      sidebar: state => state.app.sidebar
    }),
    routeTitle() {
      return (routeName) => {
        const route = _.find(this.$router.getRoutes(), { name: routeName })
        return route ? (route.meta?.title || route.name) : '未定义'
      }
    },
    currentRouteName() {
      const routeInMenu = _.findLast(this.$route.matched, (item) => item.meta.menu) 
      if (routeInMenu)
        return routeInMenu.name
      else
        return this.$route.name
    }
  },
}
</script>

<style lang="scss" scoped>
  .el-menu {
    height: 100%;
    overflow-y: auto;

    &.opened {
      width: 220px;
    }

    .svg-icon {
      margin-right: 5px;
      width: 24px;
      text-align: center;
      font-size: 18px;
      vertical-align: middle;
      color: #909399;
    }
  }
</style>
