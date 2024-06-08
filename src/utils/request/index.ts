import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios'
import { ElNotification } from 'element-plus'
import { merge } from 'lodash-es'
import router from '@/router'
import { i18n } from '@/plugins/I18n'

const pendingMap = new Map<string | number | symbol, AbortController>()

function getPendingKey(config: AxiosRequestConfig) {
    const { method, url, params, data } = config
    return [method, url, JSON.stringify(params), JSON.stringify(data)].join('&')
}

function addPending(config: AxiosRequestConfig) {
    const pendingKey = getPendingKey(config)
    const abortController = new AbortController()
    config.signal = abortController.signal
    pendingMap.set(pendingKey, abortController)
}

function removePending(config: AxiosRequestConfig) {
    const pendingKey = getPendingKey(config)
    const abortController = pendingMap.get(pendingKey)
    if (abortController) {
        abortController?.abort()
        pendingMap.delete(pendingKey)
    }
}

function createService() {
    const service = axios.create()

    // FIXME:进入页面I18n还没有加载完毕的时候 给默认值 不清楚怎么处理好一些 先这样 2023年8月8日
    const { te } = i18n.global
    // 请求拦截器
    service.interceptors.request
        .use(
            (config) => {
            // 请求前，将请求添加到 pending 中
                removePending(config)
                addPending(config)

                return config
            },
            error => Promise.reject(error),
        )

    // 响应拦截器
    service.interceptors.response
        .use(
            (response) => {
            // 请求完成后，将请求从 pending 中移除
                removePending(response.config)

                const data = response.data
                // 判断是否返回为二进制
                const responseType = response.request?.responseType
                if (responseType === 'blob' || responseType === 'arraybuffer')
                    return data
                return data
            },
            (error) => {
                const code = error.response?.status as number

                switch (code) {
                    case 401: {
                        error.message = te('error.msg.401') || '登录已过期，请重新登录'
                        const fullPath = encodeURIComponent(router.currentRoute.value.fullPath)
                        router.push(`/login?redirectUrl=${fullPath}`).then(_ => _)
                        break
                    }
                    case 403:
                        error.message = te('error.msg.403') || '您没有权限访问该页面'
                        break
                    default:
                        error.message = te('error.msg.default') || '您访问的页面不存在'
                        break
                }

                ElNotification({
                    title: '系统提示',
                    message: error.message,
                    type: 'warning',
                })
                return Promise.reject(error)
            },
        )

    return service
}

function createRequest(service: AxiosInstance) {
    return function <T>(config: AxiosRequestConfig): Promise<Response<T>> {
        const defaultConfig: AxiosRequestConfig = {
            headers: {
                // 携带 Token
                'Content-Type': 'application/json;charset=UTF-8',
            },
            withCredentials: true,
            baseURL: import.meta.env.VITE_API_BASE_URL,
            timeout: 10000,
        }

        // 将默认配置 defaultConfig 和传入的自定义配置 config 进行合并成为 mergeConfig
        const mergeConfig = merge(defaultConfig, config)
        return service(mergeConfig)
    }
}

export const service = createService()

export const request = createRequest(service)
