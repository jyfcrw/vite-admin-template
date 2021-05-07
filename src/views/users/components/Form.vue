<template>
  <div class="form__users">
    <el-form ref="form" :model="form" :rules="rules" label-width="80px">
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="手机号" prop="phone">
        <el-input v-model="form.phone"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="status">
        <el-select v-model="form.status" placeholder="请选择用户状态">
          <el-option
            v-for="(text, value) in $tm('models.users.status')"
            :key="value"
            :label="text"
            :value="value">
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="邮箱" prop="email">
        <el-input v-model="form.email"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password" :rules="passwordRules">
        <el-input type="password" v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleSubmit" :loading="submitting">{{ persisted ? '更新' : '创建' }}</el-button>
        <el-button @click="handleCancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { createUser, updateUser } from '@/api/user'
import useLoading from '@/composables/useLoading'

export default {
  props: {
    defaultForm: {
      type: Object,
    },
    persisted: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    const { loading:submitting, wrapLoading } = useLoading()

    return {
      submitting,
      wrapLoading
    }
  },
  data() {
    return {
      form: {},
      rules: {
        name: [
          { required: true, message: '请输入名称', trigger: 'blur' }
        ],
        status: [
          { required: true, message: '请选择用户状态', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号', trigger: 'blur' }
        ],
        email: [
          { required: false, message: '请输入邮箱地址', trigger: 'blur' }
        ],
      }
    }
  },
  created() {
    this.$watch('defaultForm', () => {
      this.form = Object.assign({}, this.defaultForm)
    }, { immediate: true })
  },
  computed: {
    passwordRules() {
      return [
        { required: !this.persisted, message: '请输入密码', trigger: 'blur' }
      ]
    }
  },
  methods: {
    handleSubmit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          let result
          let params = Object.assign({}, this.form)

          this.wrapLoading(async () => {
            if (this.persisted) {
              result = await updateUser(params)
            } else {
              result = await createUser(params)
            }

            if (result.code === 0) {
              this.$router.push({ name: 'UserShow', params: { id: result.data.id }})
            } else {
              this.$message.error(result.message);
            }
          })
        }
      })
    },
    handleCancel() {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form {
  width: 600px;
  padding: 30px 50px;
}
</style>