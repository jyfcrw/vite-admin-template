<template>
  <component class="svg-icon" :is="componentName" viewbox="0 0 130 130"></component>
</template>

<script>
// 异步导入， 等价asyncDefineComponent
// const modules = import.meta.glob('./svg/*.svg')
// 同步导入
const modules = import.meta.globEager('./svg/*.svg')
import {computed} from 'vue'
export default {
  props: {
    name: {
      type: String,
      required: true
    }
  },
  setup(props) {
    return {
      componentName: computed(() => `${props.name}-icon`)
    }
  },
  // https://vitejs.dev/guide/features.html#glob-import
  components: {
    ...Object.assign({}, ...Object.keys(modules).map(key => {
      const iconName = key.match(/([\w|-]+).svg$/i)[1]
      const componentName = `${iconName}-icon`
      return { [componentName]: modules[key].default }
    }))
  }
}
</script>

<style lang="scss">
.svg-icon {
  width: 1em;
  height: 1em;
  fill: currentColor;
  overflow: hidden;
  ::v-deep(path) {
    fill: currentColor;
  }

  &.btn {
    cursor: pointer;
  }
}
</style>