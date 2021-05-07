import { createStore, createLogger } from 'vuex'
import plugins from './plugins'


import app from './modules/app'
import session from './modules/session'
import errLog from './modules/errLog'

const getters = {
  isAuthenticated(state, getters) {
    return getters['session/isAccessTokenValid']
  },
  canRefreshAccessToken(state, getters) {
    return getters['session/isRefreshTokenValid']
  },
  currentAdmin(state, getters) {
    return state.session.profile
  }
}

export default createStore({
  getters,
  modules: {
    app,
    session,
    errLog
  },
  plugins: [
    createLogger(),
    ...plugins
  ]
})
