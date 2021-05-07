<template>
  <div class="page--new">
    <div class="page-hd">
      <div class="float-left">
        <i class="el-icon-edit-outline"></i>
        <span class="text-xl p-2">新建管理员</span>
      </div>
      <div class="float-right">
        <router-link :to="{ name: 'Admin' }">
          <el-button icon="el-icon-back">返回</el-button>
        </router-link>
      </div>
    </div>
    <div class="page-bd">
      <div class="form-container">
        <Form />
      </div>
    </div>
  </div>
</template>

<script>
import Form from './components/Form'

export default {
  components: {
    Form
  }
}
</script>
