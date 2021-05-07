<template>
  <div class="dashboard">
    <el-row :gutter="10">
      <el-col :span="6">
        <el-card shadow="never" class="top-card">
          <h4>总数</h4>
          <p>100</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="top-card">
          <h4>总数2</h4>
          <p>100</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="top-card">
          <h4>总数3</h4>
          <p>100</p>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card shadow="never" class="top-card">
          <h4>总数4</h4>
          <p>100</p>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
}
</script>

<style lang="scss" scoped>
.top-card {
  h4 {
    padding: 0;
    margin: 0;
    font-weight: normal;
    
  }
  p {
    margin: 0;
    font-size: 2em;
    margin-top: 20px;
  }
}
</style>