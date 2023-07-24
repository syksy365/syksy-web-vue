import request from "@/utils/request";

//登录
const login = (data: any): any => {
    return request({
        url: "/login/account",
        method: "post",
        data,
    });
}

//获取用户信息
const getUserInfo = (): any => {
    return request({
        url: "/upms/user/current",
        method: "get",
    })
}

//获取验证码
const getCaptcha = (): any => {
    return request({
        url: "/captcha",
        method: "get",
        responseType: "blob",
    })
}


export {
    login,
    getUserInfo,
    getCaptcha,
}