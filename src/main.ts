import { createApp } from "vue";
import "./index.css";
import App from "./App.vue";
import router from "./router";
import CategorySelect from "./components/CategorySelect.vue";
createApp(App)
  .use(router)
  .component("CategorySelect", CategorySelect)
  .mount("#app");
