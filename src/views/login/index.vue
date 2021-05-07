<template>
  <div class="login-wrapper">
    <div class="login">
      <div class="login-header">Vite Admin</div>

      <el-form :model="form" :rules="rules" ref="loginForm" label-width="0px">
        <el-form-item prop="email">
          <el-input v-model="form.email" placeholder="邮箱">
            <template #prefix>
              <i class="el-icon-user el-input__icon"></i>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input type="password" placeholder="密码" v-model="form.password" @keyup.enter.native="handleSubmit('loginForm')">
            <template #prefix>
              <i class="el-icon-key el-input__icon"></i>
            </template>
          </el-input>
        </el-form-item>
        <div class="login-btn">
          <el-button type="primary" @click="handleSubmit('loginForm')">登录</el-button>
        </div>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/session'

export default {
  data () {
    return {
      form: {
        email: '',
        password: '',
        remember_me: true
      },
      rules: {
        email: [
          { required: true, message: '请输入邮箱地址', trigger: 'change,blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    handleSubmit(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          const loginResult = await login(this.form)
          this.$store.commit('session/setToken', loginResult.data)
          this.$router.push({ path: '/' })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .login-wrapper {
    position: relative;
    height: 100%;
    width: 100%;
    background: #324157;
  }

  .login {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 400px;
    padding: 40px 30px;
    border-radius: 5px;
    background: #fff;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 30px 15px rgba(0, 0, 0, .4);
  }

  .login-header {
    width: 100%;
    text-align: center;
    font-size: 24px;
    color: #333;
    margin-bottom: 30px;
  }

  .login-btn {
    button {
      width: 100%;
    }
  }
</style>
