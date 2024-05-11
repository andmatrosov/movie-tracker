import { createApp } from "vue";
import { createStore } from "vuex";

import task from "./task";
import tags from "./tags";

const store = createStore({
  modules: {
    task,
    tags,
  },
});

export default store;
