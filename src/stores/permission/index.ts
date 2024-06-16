import { defineStore } from 'pinia'
import { ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { PermissionList } from '@/api/permission/models'
import { getPermissionList } from '@/api/permission'
import router from '@/router'

const allViews = import.meta.glob('./../../views/**/*.vue')
console.log(allViews)
const useAllView = Object.entries(allViews).map(([key, value]) => {
    return {
        key: key.split('/views/')[1].split('.vue')[0],
        value,
    }
})

console.log('useAllView', useAllView)

interface SidebarItem {
    name: string
    path: string
    children: SidebarItem[]
}

export const usePermissionStore = defineStore('permission', () => {
    const permission_list_r = ref<PermissionList>([])
    const have_permission_r = ref<boolean>(false)
    // 侧边栏展示需要的
    const use_sidebar_r = ref<SidebarItem[]>([])

    function reset() {
        permission_list_r.value = []
        have_permission_r.value = false
        use_sidebar_r.value = []
    }

    function getPermission() {
        return new Promise<PermissionList>((resolve, reject) => {
            if (have_permission_r.value) {
                resolve(permission_list_r.value)
                return
            }
            getPermissionList().then((res) => {
                permission_list_r.value = res.data
                have_permission_r.value = true
                use_sidebar_r.value.push(...generateSidebar(cloneDeep(res.data)))
                console.log('use_sidebar_r', use_sidebar_r.value)
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    function generateSidebar(permission_list: PermissionList): SidebarItem[] {
        return permission_list.filter((item) => {
            return item.genre === 'directory'
        }).map((item, index) => {
            // 顺便这里给addRoute用上
            const component = useAllView.find((view) => {
                return `/${view.key}` === `${item.path}/index`
            })?.value
            if (component) {
                // 如果可以给后端也重构就好了 目前很多东西都无法实现的
                router.addRoute('layout', {
                    name: item.name,
                    path: item.path || '/',
                    component,
                })
            }
            return ({
                path: item.path || '/',
                name: item.name,
                children: item.children && generateSidebar(item.children),
            })
        })
    }

    return {
        permission_list_r,
        have_permission_r,
        use_sidebar_r,
        getPermission,
    }
})
