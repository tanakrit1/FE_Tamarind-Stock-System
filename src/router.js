import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "dashboard",
            component: () => import("./pages/dashboard/index.vue"),
            props: true 
        },
        {
            path: "/login",
            name: "login",
            component: () => import("./pages/login/index.vue"),
            props: true 
        },
        {
            path: "/import-by-supplier",
            name: "import-by-supplier",
            component: () => import("./pages/import-product/by-supplier/index.vue"),
            props: true 
        },
        {
            path: "/import-by-deposit",
            name: "import-by-deposit",
            component: () => import("./pages/import-product/by-deposit/index.vue"),
            props: true 
        },
    ],
});

export default router