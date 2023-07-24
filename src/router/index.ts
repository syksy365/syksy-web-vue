import {createRouter, createWebHistory} from 'vue-router'
import layout from "@/layout/index.vue";
import {useUserStore} from "@/stores/user";


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

//白名单
const whiteList = ['/login', '/404', '/401'] // no redirect whitelist

router.beforeEach((to, from, next) => {
    const userStore = useUserStore();

    //如果没有登录
    if (!userStore.haveLogin) {
        //如果去白名单就不拉去用户信息了
        if (whiteList.includes(to.path)) {
            //单独处理进入登录界面的
            if (to.path === '/login') {
                // userStore.storeGetUserInfo().then(() => {
                //     //如果已经登录了就跳转到主界面
                //     next('/');
                //     return;
                // }).catch(() => {
                //     next()
                //     return;
                // })
                next();
                return;//终止这个if
            }
            next()
            return;
        } else {
            //拉取用户信息
            userStore.storeGetUserInfo().then(() => {
                next();
                return
            }).catch(() => {
                next(`/login?redirect=${to.path}`)
            })
        }
    } else {
        //如果已经登录
        if (to.path === '/login') {
            next({path: '/'});
            return;
        }
        next();
        return;
    }


})

export default router
