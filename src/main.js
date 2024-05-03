import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from './store/index'; 
import  Axios  from "axios";

const app = createApp(App);
app.use(router);
app.use(store)

Axios.defaults.baseURL = import.meta.env.VITE_API_URL
app.mount("#app");
