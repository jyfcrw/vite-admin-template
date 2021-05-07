<template>
  <div class="page--edit">
    <div class="page-hd">
      <div class="float-left">
        <i class="el-icon-edit-outline"></i>
        <span class="text-xl p-2">编辑管理员</span>
      </div>
      <div class="float-right">
        <router-link :to="{ name: 'Admin' }">
          <el-button icon="el-icon-back">返回</el-button>
        </router-link>
      </div>
    </div>
    <div class="page-bd" ref="loadingTarget">
      <div class="form-container">
        <Form :defaultForm="admin" :persisted="true" />
      </div>
    </div>
  </div>
</template>

<script>
import { getAdmin } from '@/api/admin'
import Form from './components/Form'
import useLoading from '@/composables/useLoading'

export default {
  components: {
    Form
  },
  setup() {
    return {
      ...useLoading()
    }
  },
  data() {
    return {
      admin: {}
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData(params) {
      params = Object.assign({}, this.$route.params, params)

      this.wrapLoading(async () => {
        const result = await getAdmin(params)
        if (result.code > 0) {
          this.$message.error(result.message);
        } else {
          this.admin = result.data
        }
      })
    },
  }
}
</script>
