export default {
  namespaced: true,
  state: {
    visitedViews: [],
    sidebar: {
      opened: true
    }
  },
  actions: {
    toggleSideBar({ state }, opened) {
      state.sidebar.opened = opened
    },
    addVisitedView({ state }, view) {
      if (state.visitedViews.some(v => v.path === view.path)) {
        return
      }

      if (view.meta.cache) {
        state.visitedViews.push(Object.assign({}, view, {
          title: view.meta.title || view.name
        }))
      }
    },
    removeVisitedView({state}, view) {
      state.visitedViews.splice(state.visitedViews.indexOf(view), 1)
    }
  }
}
