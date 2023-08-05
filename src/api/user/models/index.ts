export interface CaptchaStatusResponse {
    success: boolean
    data: {
        enable: boolean
        effectiveTime: number
    }

}
