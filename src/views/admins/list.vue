<template>
  <div class="page--list">
    <div class="page-hd">
      <div class="float-right">
        <router-link :to="{ name: 'AdminNew' }">
          <el-button type="primary">新建管理员</el-button>
        </router-link>
      </div>
      <div class="float-left">
        <div class="form--search">
          <el-form :inline="true" ref="searchForm" :model="searchForm">
            <el-form-item>
              <el-input v-model="searchForm.q_name_or_email_cont" placeholder="姓名/邮箱">
                <template #append>
                  <el-button icon="el-icon-search" @click="handleSearch('searchForm')"></el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div class="page-bd" ref="loadingTarget">
      <el-table
        :data="list">
        <el-table-column
          property="name"
          label="姓名">
        </el-table-column>
        <el-table-column
          property="email"
          label="邮箱">
        </el-table-column>
        <el-table-column
          property="created_at"
          label="创建时间"
          :formatter="dateTimeFormatter"
          width="180">
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template #default="scope">
            <el-button @click="handleShowClick(scope.row)" type="text">查看</el-button>
            <el-button @click="handleEditClick(scope.row)" type="text">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="page-ft">
      <Pagination :pagination="pagination" @change="handlePaginate" />
    </div>
  </div>
</template>

<script>
import { getAdmins } from '@/api/admin'
import useLoading from '@/composables/useLoading'
import Pagination from '@/components/Views/Pagination.vue'

export default {
  components: {
    Pagination
  },
  setup() {
    return {
      ...useLoading()
    }
  },
  data() {
    return {
      list: [],
      pagination: {},
      searchForm: {},
    }
  },
  mounted() {
    this.$watch(
      () => this.$route.params,
      () => this.fetchData(),
      { immediate: true }
    )
  },
  methods: {
    fetchData(params) {
      this.wrapLoading(async () => {
        const result = await getAdmins(params)
        if (result.code > 0) {
          this.$message.error(result.message);
        } else {
          this.list = result.data.list
          this.pagination = result.data.pagination
        }
      })
    },
    dateTimeFormatter(row, column, cellValue) {
      return this.$d(cellValue, 'l')
    },
    handlePaginate(pageParams) {
      this.fetchData({ ...pageParams, ...this.searchForm })
    },
    handleSearch() {
      const { per_page } = this.pagination
      this.fetchData({ page: 1, per_page, ...this.searchForm })
    },
    handleShowClick(row) {
      this.$router.push({ name: 'AdminShow', params: { id: row.id }})
    },
    handleEditClick(row) {
      this.$router.push({ name: 'AdminEdit', params: { id: row.id }})
    }
  }
}
</script>
