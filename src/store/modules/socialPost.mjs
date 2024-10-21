export default {
  namespaced: true,
  state: {
    lastPostedToken: null,
    lastPostTime: null,
  },
  mutations: {
    setLastPostedToken(state, token) {
      state.lastPostedToken = token;
    },
    setLastPostTime(state, time) {
      state.lastPostTime = time;
    },
  },
  actions: {
    updateLastPost({ commit }, { token, time }) {
      commit('setLastPostedToken', token);
      commit('setLastPostTime', time);
    },
  },
  getters: {
    getLastPostedToken: (state) => state.lastPostedToken,
    getLastPostTime: (state) => state.lastPostTime,
  },
};
