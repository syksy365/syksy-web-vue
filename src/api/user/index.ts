import request from "@/utils/request";

const login = (data: any): any => {
    return request({
        url: "/login/account",
        method: "post",
        data,
    });
}

export {
    login,
}