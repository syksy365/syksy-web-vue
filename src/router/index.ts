import {createRouter, createWebHistory} from 'vue-router'
import layout from "@/layout/index.vue";
import {getCookie} from "@/utils";
import cookie from "cookiejs";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '',
            name: 'layout',
            component: layout,
            children: [
                //todo:主界面的子路由~
            ]
        },
        {
            path: '/login',
            name: 'login',
            component: () => import("@/views/login/index.vue"),
        },
        {
            path: "/:pathMatch(.*)*",
            name: '404',
            component: () => import('@/views/error/404.vue'),
        },
        {
            path: '/401',
            name: '401',
            component: () => import('@/views/error/401.vue'),
        },
    ]
})


//路由守卫
const whiteList = ['/login', '/404', '/401'] // no redirect whitelist
router.beforeEach((to, from, next) => {
    next();

    // let hasToken = true;//todo
    // //todo
    //
    // if (hasToken) {
    //     if (to.path === '/login') {
    //         // if is logged in, redirect to the home page
    //         next({path: '/'})
    //     } else {
    //         next()
    //     }
    // } else {
    //     /* has no token*/
    //
    //     if (whiteList.indexOf(to.path) !== -1) {
    //         // in the free login whitelist, go directly
    //         next()
    //     } else {
    //         // other pages that do not have permission to access are redirected to the login page.
    //         next(`/login?redirect=${to.path}`)
    //     }
    // }

})

export default router
