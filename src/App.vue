<template>
  <router-view class="app__main" />
</template>

<script>
export default {
  provide() {
    return {
      store: this.$store
    }
  }
}
</script>

<style lang="scss" scoped>
.app__main {
  height: 100vh
}
</style>

