<template>
  <div class="main-container">
    <div class="left-side">
      <left-bar></left-bar>
    </div>
    <div class="right-side">
      <top-bar></top-bar>
      <tags-view></tags-view>
      <main-body></main-body>
    </div>
  </div>
</template>

<script>
import LeftBar from './LeftBar.vue'
import TopBar from './TopBar.vue'
import TagsView from './TagsView.vue'
import MainBody from './MainBody.vue'
import { getProfile } from '@/api/session'

export default {
  components: {
    LeftBar,
    TopBar,
    TagsView,
    MainBody
  },
  async mounted() {
    const profileResult = await getProfile()
    this.$store.commit('session/setProfile', profileResult.data)
  }
}
</script>

<style lang="scss" scoped>
.main-container {
  width: 100%;
  display: flex;
  @include clearfix;
}

.left-side {
  height: 100%;
}

.right-side {
  height: 100%;
  overflow: hidden;
  flex: 1;
  display: flex;
  flex-direction: column;
}
</style>
