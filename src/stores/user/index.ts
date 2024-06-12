import { defineStore } from 'pinia'
import { ref } from 'vue'
import { type Models as UserModels, getUserInfo, login } from '@/api/user'

export const useUserStore = defineStore('user', () => {
    const info = ref<UserModels.UserInfo | null>(null)
    const haveLogin = ref<boolean>(false)

    // 登录
    const storeLogin = (data: UserModels.LoginParams) => {
        return login(data)
    }

    // 获取用户信息
    const storeGetUserInfo = () => {
        return new Promise((resolve, reject) => {
            if (haveLogin.value)
                resolve(info.value)
            getUserInfo().then((res) => {
                info.value = res.data
                haveLogin.value = true
                resolve(res)
            }).catch((err) => {
                info.value = null
                haveLogin.value = false
                reject(err)
            })
        })
    }

    return {
        info,
        haveLogin,
        storeLogin,
        storeGetUserInfo,
    }
})
