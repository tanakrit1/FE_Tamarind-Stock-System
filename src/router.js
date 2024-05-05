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
        {
            path: "/report/product-list",
            name: "product-list",
            component: () => import("./pages/report/product-list.vue"),
            props: true 
        },
        {
            path: "/report/order-list",
            name: "order-list",
            component: () => import("./pages/report/order-list.vue"),
            props: true 
        },
        {
            path: "/add-list-deposit",
            name: "add-list-deposit",
            component: () => import("./pages/export-product/add-list-deposit/index.vue"),
            props: true 
        },
        {
            path: "/add-list-supplier",
            name: "add-list-supplier",
            component: () => import("./pages/export-product/add-list-supplier/index.vue"),
            props: true 
        },

        {
            path: "/master-employee",
            name: "master-employee",
            component: () => import("./pages/master/employees/index.vue"),
            props: true 
        },
        {
            path: "/master-customer",
            name: "master-customer",
            component: () => import("./pages/master/customers/index.vue"),
            props: true 
        },
        {
            path: "/master-supplier",
            name: "master-suppliers",
            component: () => import("./pages/master/suppliers/index.vue"),
            props: true 
        },
        {
            path: "/master-product",
            name: "master-product",
            component: () => import("./pages/master/products/index.vue"),
            props: true 
        },
        
    ],
});

export default router