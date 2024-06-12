import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PermissionList } from '@/api/permission/models'
import { getPermissionList } from '@/api/permission'

export const usePermissionStore = defineStore('permission', () => {
    // TODO：退出的时候要清空
    const permission_list_r = ref<PermissionList>([])
    const have_permission_r = ref<boolean>(false)

    function getPermission() {
        return new Promise<PermissionList>((resolve, reject) => {
            getPermissionList().then((res) => {
                permission_list_r.value = res.data
                have_permission_r.value = true
                resolve(res.data)
            }).catch((err) => {
                reject(err)
            })
        })
    }

    return {
        permission_list_r,
        have_permission_r,
        getPermission,
    }
})
