<template>
  <el-select
    v-model="value"
    filterable
    remote
    :placeholder="placeholder || '请选择用户'"
    :remote-method="handleRemoteSearch"
    :loading="loading">
    <el-option
      v-for="user in list"
      :key="user.id"
      :label="user.name"
      :value="user.id">
    </el-option>
  </el-select>
</template>

<script>
import { debounce } from 'lodash'
import { getUsers } from '@/api/user'

export default {
  props: {
    value: {
      type: Number,
    },
    placeholder: {
      type: String
    },
  },
  data() {
    return {
      loading: false,
      list: []
    }
  },
  created() {
    this.debouncedFetchData = debounce(this.fetchData, 350)
  },
  methods: {
    handleRemoteSearch(query) {
      if (query && query.length > 2) {
        this.debouncedFetchData({ q_name_or_phone_cont: query })
      } else {
        this.list = [];
      }
    },
    async fetchData(params) {
      params = Object.assign({}, params)
      this.loading = true;
      const result = await getUsers(params)
      this.loading = false;

      if (result.code > 0) {
        this.$message.error(result.message);
      } else {
        this.list = result.data.list
      }
    }
  }
}
</script>

<style lang="scss" scoped>

</style>