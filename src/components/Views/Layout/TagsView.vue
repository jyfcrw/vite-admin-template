<template>
  <div class="tags-view">
    <router-link v-for="view in visitedViews" :key="view.path" :to="{path: view.path}" 
      class="tag-item"
      :class="{'active': $route.path == view.path}"
      style="margin: 4px 0 4px 2px">
      {{view.title}}
      <span class='el-tag__close el-icon-close' @click.prevent.stop='closeSelectedView(view)'></span>
    </router-link>
  </div>
</template>

<script>
export default {
  computed: {
    visitedViews () {
      return this.$store.state.app.visitedViews
    }
  },
  watch: {
    '$route': {
      handler (nv) {
        if (nv.name) {
          this.$store.dispatch('app/addVisitedView', nv)
        }
      },
      immediate: true
    }
  },
  methods: {
    closeSelectedView (view) {
      this.$store.dispatch('app/removeVisitedView', view)
    }
  }
}
</script>

<style lang="scss" scoped>
  .tags-view {
    background: #f8f8f8;
    border-bottom: 1px solid #e6e6e6;

    &:empty {
      border-bottom: none;
    }

    .tag-item {
      background-color: #fff;
      border-color: #e6e6e6;
      color: #999;
      display: inline-block;
      height: 24px;
      padding: 0 10px;
      line-height: 22px;
      font-size: 12px;
      border-width: 1px;
      border-style: solid;
      box-sizing: border-box;
      white-space: nowrap;
      transition: all 1s;

      .el-tag__close {
      }

      &:hover {
        .el-tag__close {
          display: inline-block;
        }
      }
      &.active {
        // background-color: #e4f2ff;
        color: #1890ff;
      }
    }
  }
</style>
