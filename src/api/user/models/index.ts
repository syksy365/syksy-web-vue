export interface CaptchaStatusResponse {
    enable: boolean
    effectiveTime: number
}

export interface UserInfo {
    userid: string
    email: string
    country: string
    address: string
    phone: string
    avatar: string
    name: string
    title: string
    group: string
    signature: string
    access: string
    unreadCount: number
    tags: Array<{
        key: string
        label: string
    }>
}

export interface LoginParams {
    username: string
    password: string
    captcha: string
}

export interface LoginResponse {
    status: ResStatus
    type: 'account'
    message: string
}
