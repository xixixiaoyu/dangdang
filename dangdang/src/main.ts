import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { LmgLoader } from "./utils/imgUtil";
LmgLoader.storageAllImg.apply(LmgLoader);
createApp(App).mount("#app");
