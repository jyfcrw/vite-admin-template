export default {
  namespaced: true,
  state: {
    logs: []
  },
  actions: {
    'addErrorLog' ({ state, commit }, log) {
      state.logs.push(log)
    }
  }
}
