import { createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout/index.vue'
import { useGuardRouter } from '@/router/router-guard'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: layout,
            redirect: '/index',
            children: [
                {
                    path: '/index',
                    component: () => import('@/views/index/index.vue'),
                    name: 'Index',
                    meta: { title: '首页' },
                },
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/index.vue'),
            meta: { title: '登录' },
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('@/views/error/404.vue'),
            meta: { title: '404' },
        },
        {
            path: '/401',
            name: '401',
            component: () => import('@/views/error/401.vue'),
            meta: { title: '401' },
        },
    ],
})

useGuardRouter(router)

export default router
