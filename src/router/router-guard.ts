import type { NavigationGuardNext, Router } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'
import { notification } from '@/utils'

const whiteList = ['/login', '/404', '/401']

export function useGuardRouter(router: Router) {
    router.beforeEach(async (to, from, next) => {
        const userStore = useUserStore()
        const isLoggedIn = userStore.haveLogin
        const isWhiteListed = whiteList.includes(to.path)
        if (!isLoggedIn) {
            if (isWhiteListed) {
                // TODO:我想让登录之后就不可以去登录页面 这里先next放过 不然会有问题
                next()
            }
            else {
                await handleUnauthorizedRoute(userStore, next, to)
            }
        }
        else {
            if (to.path === '/login') {
                await handleLoggedInLoginRoute(next)
            }
            else {
                await handleLoggedInRoute(next)
            }
        }
    })
}

async function handleLoginRoute(userStore: ReturnType<typeof useUserStore>, from: any, next: NavigationGuardNext) {
    try {
        await userStore.storeGetUserInfo()
        await getPermission()
        notification.warning('您已经登录了')
        next(from.fullPath)
    }
    catch {
        next()
    }
}

async function handleUnauthorizedRoute(userStore: ReturnType<typeof useUserStore>, next: NavigationGuardNext, to: any) {
    try {
        await userStore.storeGetUserInfo()
        await getPermission()
        console.log('to', to)
        // debugger
        // next({...to, replace: true})
        next(to.fullPath)
    }
    catch {
        next('/login')
    }
}

async function handleLoggedInLoginRoute(next: NavigationGuardNext) {
    try {
        await getPermission()
        next({ path: '/' })
    }
    catch {
        next('/login')
    }
}

async function handleLoggedInRoute(next: NavigationGuardNext) {
    try {
        await getPermission()
        next()
    }
    catch {
        next('/login')
    }
}

async function getPermission() {
    const permissionStore = usePermissionStore()
    if (permissionStore.have_permission_r) {
        return permissionStore.permission_list_r
    }
    else {
        return await permissionStore.getPermission()
    }
}
