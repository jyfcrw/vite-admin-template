<template>
  <el-breadcrumb separator="/" class="breadcrumb fl">
    <template v-for="(item, index) in levelList" :key="index">
      <el-breadcrumb-item :to="{ name: item.name, params: $route.params }">
        <span class="item">{{ item.meta.title }}</span>
      </el-breadcrumb-item>
    </template>
  </el-breadcrumb>
</template>

<script>
import _ from 'lodash'

export default {
  computed: {
    levelList () {
      const levels = this.$route.matched.filter(item => item.name)
      const indexForLevelPos = _.findLastIndex(levels, (item) => item.meta?.indexFor)
      if (indexForLevelPos >= 0) {
        const indexForLevel = levels[indexForLevelPos]
        const parentLevelPos = _.findLastIndex(levels, (item) => item.name === indexForLevel.meta.indexFor);
        if (parentLevelPos >= 0) {
          return _.slice(levels, parentLevelPos, indexForLevelPos - parentLevelPos)
        }
      }
      return levels
    }
  }
}
</script>

<style lang="scss" scoped>
.item {
  line-height: 31px;
}
</style>
