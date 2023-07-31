import axios from 'axios'
import { ElNotification } from 'element-plus'

const request = axios.create({
    baseURL: '/api',
    timeout: 1000,
})

const requestMap = new Map()

request.interceptors.request.use((config) => {
    config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    // post 请求
    if (config.method === 'post') {
        const key = config.url + JSON.stringify(config.data)
        if (requestMap.has(key)) {
            const date = requestMap.get(key)
            if (new Date().getTime() - date < 1000) {
                const errMsg = 'Please do not repeat submit!'
                console.error(errMsg)
                return Promise.reject(errMsg)
            }
        }
        else {
            requestMap.set(key, new Date().getTime())
        }
    }
    return config
})

// const tip = '，请联系管理员'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-expect-error
request.interceptors.response.use((response) => {
    if (response.status === 200)
        return Promise.resolve(response.data)
},
(error) => {
    if (error.response.status === 401
            && !window.location.href.includes('/login')) {
        ElNotification({
            title: '系统提示',
            message: '登录已过期，请重新登录',
            type: 'warning',
        })
    }
    else if (error.response.status === 403) {
        ElNotification({
            title: '系统提示',
            message: '您没有权限访问，请联系管理员',
            type: 'warning',
        })
    }
},
)

export default request
