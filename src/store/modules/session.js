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
  async refreshAccessToken({ state, commit }) {
    const { code, data=null } = await refresh()
    if (code === 0) {
      commit('setToken', { ...state.token, ...data })
    }
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
