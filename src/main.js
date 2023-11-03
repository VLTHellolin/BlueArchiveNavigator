import { createApp } from "vue";
import App from "./App.vue";
import MenuRouter from "./routers";
import "./assets/common.styl";

var app = createApp(App);
app.use(MenuRouter);
app.mount("#app");
