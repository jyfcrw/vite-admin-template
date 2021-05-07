<template>
  <div class="page--show">
    <div class="page-hd">
      <div class="float-left">
        <i class="el-icon-tickets"></i>
        <span class="text-xl p-2">管理员详情</span>
      </div>
      <div class="float-right">
        <router-link :to="{ name: 'Admin' }">
          <el-button icon="el-icon-back">返回</el-button>
        </router-link>
      </div>
    </div>
    <div class="page-bd">
      <div class="show-container" ref="loadingTarget">
        <el-row :gutter="20">
          <el-col class="label" :span='6'>名称</el-col>
          <el-col :span='12'>{{admin.name}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="label" :span='6'>邮箱</el-col>
          <el-col :span='12'>{{admin.email}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="label" :span='6'>创建时间</el-col>
          <el-col :span='12'>{{$filters.formatTime(admin.created_at)}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col class="label" :span='6'>更新时间</el-col>
          <el-col :span='12'>{{$filters.formatTime(admin.updated_at)}}</el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :offset="6" :span='12'>
            <el-divider></el-divider>
            <el-button icon="el-icon-edit" @click="handleEditClick">编辑</el-button>
            <el-button type="danger" icon="el-icon-delete" @click="handleDeleteClick">移除该管理员</el-button>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getAdmin, destroyAdmin } from '@/api/admin'
import useLoading from '@/composables/useLoading'

export default {
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
    handleEditClick() {
      this.$router.push({ name: 'AdminEdit', params: { id: this.admin.id } })
    },
    async handleDeleteClick() {
      await this.$confirm('是否确认要移除该管理员？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })

      const result = await destroyAdmin({ id: this.admin.id })
      if (result.code > 0) {
        this.$message.error(result.message);
      } else {
        this.$router.push({ name: 'Admin' })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.show-container {
  .el-row {
    line-height: 40px;
  }
  .el-col.label {
    text-align: right;
  }
}
</style>