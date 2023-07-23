import {defineStore} from "pinia";
import {ref} from "vue";
import {getUserInfo, login} from "@/api/user";

export const useUserStore = defineStore('user', () => {
    /**
     * {
     *     "userid": "1322014259407925249",
     *     "email": "antdesign@alipay.com",
     *     "country": "China",
     *     "address": "西湖区工专路 77 号",
     *     "phone": "0752-268888888",
     *     "avatar": "https://gw.alipayobjects.com/zos/antfincdn/XAosXuNZyF/BiazfanxmamNRoxxVxka.png",
     *     "name": "admin",
     *     "title": "员工",
     *     "group": "科技组",
     *     "signature": "凛冬将至",
     *     "access": "admin",
     *     "unreadCount": 10,
     *     "tags": [
     *         {
     *             "key": "1",
     *             "label": "机智"
     *         }
     *     ]
     * }
     */
    const info = ref({})
    const haveLogin = ref(false)

    //登录
    const storeLogin = (data: any): any => {
        return login(data).then((res: any) => {
            return Promise.resolve(res)
        })
    }

    //获取用户信息
    const storeGetUserInfo = (): any => {
        return getUserInfo().then((res: any) => {
            if (res.success) {
                info.value = res.data
                haveLogin.value = true
                return Promise.resolve()
            } else {
                return Promise.reject()
            }
        })
    }

    return {
        info,
        haveLogin,
        storeLogin,
        storeGetUserInfo,
    }
})