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


export {
    login,
    getUserInfo,
}