import createPersistedState from 'vuex-persistedstate'

const plugin = createPersistedState({
  storage: window.localStorage,
  key: 'vite-admin-template',
  reducer: state => {
    return {
      session: {
        token: state.session.token
      }
    }
  }
})

export default plugin
