export default {
  state: {
    tasks: [
      {
        id: 1,
        title: "GrowthBusters: Hooked on Growth",
        description:
          "I directed this documentary challenging the myths linking growth with prosperity and fulfillment. It explores how our beliefs about economic and consumption",
        whatWatch: "Film",
        time: '1 Hours 30 Minutes',
        completed: false,
        editing: false,
        tags: [{title: 'Other'}]
      },
      {
        id: 2,
        title: "Game of thrones",
        description: "Best serials",
        whatWatch: "Serial",
        time: '76 Hours 10 Minutes',
        completed: false,
        editing: false,
        tags: [{title: 'Fantasy'}]
      },
    ],
  },
  mutations: {
    newTask(state, payload) {
      payload.id = Math.random();
      state.tasks.push(payload);
    },
  },
  actions: {
    newTask({ commit }, payload) {
      commit("newTask", payload);
    },
  },
  getters: {
    tasks(state) {
      return state.tasks;
    },
    tasksCompleted(state) {
      return state.tasks.filter((task) => task.completed);
    },
    tasksActive(state) {
      return state.tasks.filter((task) => !task.completed);
    },
  },
};
