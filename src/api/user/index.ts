import type * as Models from './models'
import { request, service } from '@/utils/request'

/** 验证码状态 */
function getCaptchaStatus() {
    return request<Models.CaptchaStatusResponse>({
        url: '/captcha/status',
        method: 'get',
    })
}

// 登录
function login(data: Models.LoginParams) {
    return request<Models.LoginResponse>({
        url: '/login/account',
        method: 'post',
        data,
    })
}

// 获取用户信息
function getUserInfo() {
    return request<Models.UserInfo>({
        url: '/upms/user/current',
        method: 'get',
    })
}

// 获取验证码
function getCaptcha() {
    return service<Blob>({
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

export type{
    Models,
}
