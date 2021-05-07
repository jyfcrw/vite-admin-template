<template>
  <div class="page--show">
    <div class="page-hd">
      <div class="float-left">
        <span class="text-lg">用户详情</span>
      </div>
      <div class="float-right">
        <el-button icon="el-icon-edit" @click="handleEditClick">编辑</el-button>
        <el-divider direction="vertical"></el-divider>
        <router-link :to="{ name: 'User' }">
          <el-button icon="el-icon-back">返回</el-button>
        </router-link>
      </div>
    </div>
    <div class="page-bd">
      <div class="show-container" ref="loadingTarget">
        <el-row :gutter="20" class="text-sm my-5">
          <el-col class="label" :span='6'>名称</el-col>
          <el-col :span='6'>{{user.name}}</el-col>
          <el-col class="label" :span='6'>手机号</el-col>
          <el-col :span='6'>{{user.phone}}</el-col>
          <el-col class="label" :span='6'>邮箱</el-col>
          <el-col :span='6'>{{user.email}}</el-col>
          <el-col class="label" :span='6'>状态</el-col>
          <el-col :span='6'>{{$t(`models.users.status.${user.status}`)}}</el-col>
          <el-col class="label" :span='6'>创建时间</el-col>
          <el-col :span='6'>{{user.created_at && $d(user.created_at, 'l')}}</el-col>
          <el-col class="label" :span='6'>更新时间</el-col>
          <el-col :span='6'>{{user.updated_at && $d(user.updated_at, 'l')}}</el-col>
        </el-row>

        <el-row :gutter="20" class="my-5 min-h-md">
          <el-col :span='24'>
            <span class="text-lg">用户模块1</span>
            <p>模块内容</p>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="my-5">
          <el-col :span='24'>
            <span class="text-lg">用户简介</span>
            <el-divider class="my-1"></el-divider>
            <div v-if="user.profile && user.profile.length > 0" v-html="user.profile"></div>  
            <el-empty :image-size="100" description="未填写介绍内容"></el-empty>
          </el-col>
        </el-row>

        <el-row :gutter="20" class="my-5">
          <el-col :span='24'>
            <span class="text-lg">更多操作</span>
            <div class="border border-solid border-red-400 rounded divide-y divide-gray-200 divide-solid">
              <div class="p-2 border-0 flex">
                <div class="flex-grow">移除用户，之后将无法撤销</div>
                <el-button type="danger" @click="handleDeleteClick">移除该用户</el-button>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getUser, destroyUser } from '@/api/user'
import useLoading from '@/composables/useLoading'

export default {
  components: {
  },
  setup() {
    return {
      ...useLoading(),
    }
  },
  data() {
    return {
      user: {},
    }
  },
  mounted() {
    this.fetchData()
  },
  methods: {
    fetchData(params) {
      params = Object.assign({}, this.$route.params, params)

      this.wrapLoading(async () => {
        const result = await getUser(params)
        if (result.code > 0) {
          this.$message.error(result.message);
        } else {
          this.user = result.data
        }
      })
    },
    handleEditClick() {
      this.$router.push({ name: 'UserEdit', params: { id: this.user.id } })
    },
    async handleDeleteClick() {
      await this.$confirm('是否确认要移除该用户？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })

      const result = await destroyUser({ id: this.user.id })
      if (result.code > 0) {
        this.$message.error(result.message);
      } else {
        this.$router.push({ name: 'User' })
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