import {defineStore} from "pinia";
import {ref} from "vue";
import {login} from "@/api/user";

export const useUserStore = defineStore('user', () => {
    const info = ref({})
    const haveLogin = ref(false)

    //登录
    const storeLogin = (data: any): any => {
        login(data).then((res: any) => {
            console.log(res)
        })
    }

    //获取用户信息
    const getUserInfo = (): any => {

    }

    return{
        info,
        haveLogin,
        storeLogin,
        getUserInfo,
    }
})