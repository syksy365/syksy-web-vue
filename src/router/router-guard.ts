import { ElNotification } from 'element-plus'
import type { Router } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { usePermissionStore } from '@/stores/permission'

// 白名单定义，指定不需要登录即可访问的路由路径
const whiteList = ['/login', '/404', '/401']

export function useGuardRouter(router: Router) {
    router.beforeEach((to, from, next) => {
        const userStore = useUserStore()

        // 检测用户是否已经登录
        const isLoggedIn = userStore.haveLogin

        // 判断目标路由是否在白名单中
        const isWhiteListed = whiteList.includes(to.path)

        // 如果用户未登录
        if (!isLoggedIn) {
            if (isWhiteListed) {
                // 处理登录页的特殊逻辑
                if (to.path === '/login') {
                    userStore.storeGetUserInfo().then(() => {
                        getPermission().then(() => {
                            // 如果获取到用户信息说明用户已经登录，提醒用户并重定向
                            ElNotification({
                                title: '系统提示',
                                message: '您已经登录了',
                                type: 'warning',
                            })
                            // 获取成功，放行至目标路由
                            next(from.fullPath) // 重定向到之前的页面
                        }).catch(() => {
                            next('/login')
                        })
                    }).catch(() => {
                        next() // 获取信息失败，继续停留在登录页
                    })
                    return // 终止后续代码执行
                }
                next() // 如果是其他白名单页面，直接放行
            }
            else {
                // 不在白名单中，尝试获取用户信息
                userStore.storeGetUserInfo().then(() => {
                    getPermission().then(() => {
                        // 获取成功，放行至目标路由
                        next()
                    }).catch(() => {
                        next('/login')
                    })
                }).catch(() => {
                    // 获取失败，重定向至登录页
                    next('/login')
                })
            }
        }
        else {
            // 用户已登录
            if (to.path === '/login') {
                getPermission().then(() => {
                    // 如果已登录且目标是登录页，重定向至首页
                    next({ path: '/' })
                }).catch(() => {
                    // 获取权限失败，重定向至登录页
                    next('/login')
                })
            }
            else {
                getPermission().then((permissionList) => {
                    // 其他情况直接放行
                    next()
                }).catch(() => {
                    next('/login')
                })
            }
        }
    })
}

// 获取路由信息
function getPermission() {
    return new Promise((resolve, reject) => {
        const permissionStore = usePermissionStore()
        if (permissionStore.have_permission_r) {
            resolve(permissionStore.permission_list_r)
        }
        else {
            permissionStore.getPermission().then((res) => {
                resolve(res)
            }).catch((err) => {
                reject(err)
            })
        }
    })
}
