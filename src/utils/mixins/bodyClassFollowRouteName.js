import _ from 'lodash'
export default {
  computed: {
    calcRouteName () {
      return _.kebabCase(`${this.$route.name}`)
    }
  },
  watch: {
    calcRouteName: {
      handler (nv, ov) {
        ov && document.body.classList.remove(_.kebabCase(`page_${ov}`))
        nv && document.body.classList.add(_.kebabCase(`page_${nv}`))
      },
      immediate: true
    }
  }
}
