import { createRouter, createWebHistory } from 'vue-router'
import { ElMessage } from 'element-plus'
import store from '@/store'

/* Layout */
import Layout from '../components/Views/Layout'

const routes = [
  { path: '/', redirect: '/dashboard', component: Layout, children: [
      { path: '/dashboard', name: 'Dashboard', meta: { title: '仪表盘', requiresAuth: true }, component: () => import( '../views/dashboard') },

      // User
      { path: '/users', name: 'User', meta: { title: '用户管理', requiresAuth: true, menu: true }, redirect: { name: 'UserList' }, component: () => import('../views/users'), children: [
        { path: '', name: 'UserList', meta: { title: '用户列表', indexFor: 'User', cache: true  }, component: () => import('../views/users/list') },
        { path: 'new', name: 'UserNew', meta: { title: '新建用户' }, component: () => import('../views/users/new') },
        { path: ':id/edit', name: 'UserEdit', meta: { title: '修改用户' }, component: () => import('../views/users/edit') },
        { path: ':id', name: 'UserShow', meta: { title: '用户详情' }, component: () => import('../views/users/show') },
      ]},

      // Admin
      { path: '/admins', name: 'Admin', meta: { title: '管理员管理', requiresAuth: true, menu: true }, redirect: { name: 'AdminList' }, component: () => import('../views/admins'), children: [
        { path: '', name: 'AdminList', meta: { title: '管理员列表', indexFor: 'Admin', cache: true  }, component: () => import('../views/admins/list') },
        { path: 'new', name: 'AdminNew', meta: { title: '新建管理员' }, component: () => import('../views/admins/new') },
        { path: ':id/edit', name: 'AdminEdit', meta: { title: '修改管理员' }, component: () => import('../views/admins/edit') },
        { path: ':id', name: 'AdminShow', meta: { title: '管理员详情' }, component: () => import('../views/admins/show') },
      ]},
    ]
  },
  { path: '/login', name: 'Login', component: () => import(/* webpackChunkName: "Login" */ '../views/login') },
  { path: '/404', name: '404', component: () => import(/* webpackChunkName: "404" */ '../views/404') },
]

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_APP_BASE_URL),
  routes
})

router.beforeEach(async (to, from) => {
  if (store.getters['isAuthenticated']) {
    if (to.name === 'Login') {
      return { path: to.query?.redirect || '/' }
    }
  }

  if (!store.getters['isAuthenticated'] && to.meta.requiresAuth) {
    if (store.getters['canRefreshAccessToken']) {
      await store.dispatch('session/refreshAccessToken')
      if (store.getters['isAuthenticated']) {
        return true
      }
    }

    ElMessage({
      message: '认证已过期，请重新登录',
      type: 'error',
      duration: 5 * 1000
    })

    return {
      path: '/login',
      query: { redirect: to.fullPath },
    }
  }
})

export default router
