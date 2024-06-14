import { defineStore } from 'pinia'
import { ref } from 'vue'
import { cloneDeep } from 'lodash-es'
import type { PermissionList } from '@/api/permission/models'
import { getPermissionList } from '@/api/permission'
import { baseRouter } from '@/router'

const allViews = import.meta.glob('./../../views/**/*.vue')
console.log(allViews)
const useAllView = Object.entries(allViews).map(([key, value]) => {
    return {
        key: key.split('/views/')[1].split('.vue')[0],
        value,
    }
})

console.log(useAllView)

export const usePermissionStore = defineStore('permission', () => {
    const permission_list_r = ref<PermissionList>([])
    const have_permission_r = ref<boolean>(false)
    // TODO:类型 需要重写
    const use_sidebar_r = ref<any[]>(baseRouter)

    // TODO：退出的时候要清空
    function getPermission() {
        return new Promise<PermissionList>((resolve, reject) => {
            if (have_permission_r.value) {
                resolve(permission_list_r.value)
                return
            }
            getPermissionList().then((res) => {
                permission_list_r.value = res.data
                have_permission_r.value = true
                use_sidebar_r.value = generateSidebar(cloneDeep(res.data))
                console.log(use_sidebar_r)
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    function generateSidebar(permission_list: PermissionList): PermissionList {
        return permission_list.filter((item) => {
            return item.genre === 'directory'
        }).map(({ children, ...item }) => {
            return ({
                ...item,
                path: item.path || '/',
                key: item.id,
                // icon: breadthFirstSearchIcon(item.path),
                children: children && generateSidebar(children),
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
