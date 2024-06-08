import { createRouter, createWebHistory } from 'vue-router'
import { ElNotification } from 'element-plus'
import layout from '@/layout/index.vue'
import { useUserStore } from '@/stores/user'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'layout',
            component: layout,
            children: [
                // todo:主界面的子路由~
            ],
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('@/views/login/index.vue'),
        },
        {
            path: '/:pathMatch(.*)*',
            name: '404',
            component: () => import('@/views/error/404.vue'),
        },
        {
            path: '/401',
            name: '401',
            component: () => import('@/views/error/401.vue'),
        },
    ],
})

// 白名单
const whiteList = ['/login', '/404', '/401'] // no redirect whitelist

router.beforeEach((to, from, next) => {
    const userStore = useUserStore()

    // 如果没有登录
    if (!userStore.haveLogin) {
        // 如果去白名单就不拉去用户信息了
        if (whiteList.includes(to.path)) {
            // 单独处理进入登录界面的
            if (to.path === '/login') {
                userStore.storeGetUserInfo().then(() => {
                    // 如果已经登录了就跳转到主界面
                    ElNotification({
                        title: '系统提示',
                        message: '您已经登录了',
                        type: 'warning',
                    })
                    // 回到来的地方
                    console.log(from)
                    next(from)
                }).catch(() => {
                    next()
                })
                return// 终止这个if
            }
            next()
        }
        else {
            // 拉取用户信息
            userStore.storeGetUserInfo().then(() => {
                next()
            })
        }
    }
    else {
        // 如果已经登录
        if (to.path === '/login') {
            next({ path: '/' })
            return
        }
        next()
    }
})

export default router
