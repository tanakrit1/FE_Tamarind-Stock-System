import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "Home",
            component: () => import("./pages/home/index.vue"),
            props: true 
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./pages/login/index.vue"),
            props: true 
        },
    ],
});

export default router