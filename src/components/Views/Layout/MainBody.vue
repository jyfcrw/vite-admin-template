<template>
  <div class="main-body" :class="{'is-full': isFullContainer}">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    cachedViews () {
      return []
    },
    key () {
      return this.$route.fullPath
    },
    isFullContainer() {
      return !!this.$route.meta.fullContainer
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-body {
    flex: 1;
    overflow: auto;
    padding: 25px;

    &.is-full {
      padding: 0;
      margin: 0;
    }
  }
</style>
