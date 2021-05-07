<template>
  <el-pagination
    :page-size="pagination.per_page"
    :current-page="pagination.page"
    @current-change="handleCurrentChange"
    @size-change="handleSizeChange"
    layout="total, sizes, prev, pager, next"
    :total="pagination.total_count">
  </el-pagination>
</template>

<script>
export default {
  props: {
    pagination: {
      type: Object,
      default: () => ({
        total_count: 0
      })
    }
  },
  methods: {
    handleCurrentChange(page) {
      const { per_page } = this.pagination
      this.$emit('change', { page, per_page })
    },
    handleSizeChange(per_page) {
      const { page, } = this.pagination
      this.$emit('change', { page, per_page })
    },
  }
}
</script>

<style lang="scss" scoped>

</style>