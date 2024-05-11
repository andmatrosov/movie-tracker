export default {
  state: {
    tags: [
      {
        title: "Comedy",
        used: false,
      },
      {
        title: "Westerns",
        used: false,
      },
      {
        title: "Adventure",
        used: false,
      },
    ],
  },
  mutations: {
    newTag(state, payload) {
      state.tags.push(payload);
    },
  },
  actions: {
    newTag({ commit }, payload) {
      commit("newTag", payload);
    },
  },
  getters: {
    tags(state) {
      return state.tags;
    },
  },
};
