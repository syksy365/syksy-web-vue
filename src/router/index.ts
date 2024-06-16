import { type RouteRecordRaw, createRouter, createWebHistory } from 'vue-router'
import layout from '@/layout/index.vue'
import { useGuardRouter } from '@/router/router-guard'

export const baseRouter: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'layout',
        component: layout,
        redirect: '/',
        children: [
            {
                path: '/',
                component: () => import('@/views/index/index.vue'),
                name: 'Index',
                meta: { title: '首页' },
            },
        ],
    },
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        ...baseRouter,
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
