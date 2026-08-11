import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import { createPinia } from "pinia";
import { VueQueryPlugin } from "@tanstack/vue-query";

const app = createApp(App);
app.use(VueQueryPlugin);
app.use(router);
app.use(createPinia());
app.mount("#app");
