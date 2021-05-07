import dayjs from 'dayjs'
import { refresh } from '@/api/session'

const state = {
  token: {},
  profile: {}
}

const getters = {
  accessTokenExpiresTime(state) {
    return dayjs(state.token.access_expires_at)
  },
  refreshTokenExpiresTime(state) {
    return dayjs(state.token.refresh_expires_at)
  },
  isAccessTokenValid(state, getters) {
    return state.token.access && getters.accessTokenExpiresTime > dayjs()
  },
  isRefreshTokenValid(state, getters) {
    return state.token.refresh && getters.refreshTokenExpiresTime > dayjs()
  }
}

const actions = {
  refreshAccessToken({ commit }) {
    refresh().then((data) => {
      console.log('data: ', data)
      // TODO:
    })
  }
}

const mutations = {
  setToken(state, tokenInfo) {
    state.token = tokenInfo
  },

  setProfile(state, profile) {
    state.profile = profile
  },

  clearToken(state) {
    state.token = {}
  }
}


export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
