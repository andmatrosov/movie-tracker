import "uimini/dist/css/uimini.css";

import { createApp } from "vue";
import App from "./App.vue";
import { autoAnimatePlugin } from "@formkit/auto-animate/vue";
import router from "./router";
import store from "./store";

const app = createApp(App);

app.use(router);
app.use(store);
app.use(autoAnimatePlugin);

app.mount("#app");
