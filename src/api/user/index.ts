import type * as Models from './models'
import request from '@/utils/request'

/** 验证码状态 */
function getCaptchaStatus() {
    return request<Models.CaptchaStatusResponse>({
        url: '/captcha/status',
        method: 'get',
    })
}

// 登录
function login(data: any): any {
    return request({
        url: '/login/account',
        method: 'post',
        data,
    })
}

// 获取用户信息
function getUserInfo(): any {
    return request({
        url: '/upms/user/current',
        method: 'get',
    })
}

// 获取验证码
function getCaptcha(): any {
    return request({
        url: '/captcha',
        method: 'get',
        responseType: 'blob',
    })
}

export {
    login,
    getUserInfo,
    getCaptcha,
    getCaptchaStatus,
}
