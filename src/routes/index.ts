import { createWebHistory, createRouter, RouteRecordRaw, RouterOptions } from 'vue-router'
import HomeVue from '../pages/Home.vue'

const routes: RouteRecordRaw[] = [
    { path: '/', component: HomeVue }
]

const routerOptions: RouterOptions = {
    history: createWebHistory(),
    routes
}

export const router = createRouter(routerOptions)