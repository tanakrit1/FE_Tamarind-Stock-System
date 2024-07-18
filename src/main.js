import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import router from "./router";
import store from './store/index'; 
import  Axios  from "axios";

const app = createApp(App);
app.use(router);
app.use(store)
// app.use(VueEcharts)

// Axios.defaults.baseURL = import.meta.env.VITE_API_URL
Axios.defaults.baseURL = 'https://www.makhamsamkler.com:9800'
app.mount("#app");
