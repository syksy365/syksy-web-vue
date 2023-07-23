import axios from "axios";
import {ElNotification, ElMessageBox, ElMessage, ElLoading} from 'element-plus'

const request = axios.create({
    baseURL: "/api",
    timeout: 1000,
});

const requestMap = new Map();

request.interceptors.request.use((config) => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    //post 请求
    if (config.method === "post") {
        const key = config.url + JSON.stringify(config.data);
        if (requestMap.has(key)) {
            const date = requestMap.get(key);
            if (new Date().getTime() - date < 1000) {
                const errMsg = "Please do not repeat submit!";
                console.error(errMsg);
                return Promise.reject(errMsg);
            }
        } else {
            requestMap.set(key, new Date().getTime());
        }
    }
    return config;
});


const tip = "，请联系管理员";
// @ts-ignore
request.interceptors.response.use((response) => {
        if (response.status === 200) {
            return Promise.resolve(response.data);
        } else if (response.status === 401) {
            ElMessage({
                message: '登录过期，请重新登录' + tip,
                type: 'error',
            })
            return Promise.reject(response.data);
        } else if (response.status === 403) {
            ElMessage({
                message: '权限不足，无法访问' + tip,
                type: 'error',
            })
            return Promise.reject(response.data);
        } else if (response.status === 404) {
            ElMessage({
                message: '请求资源不存在' + tip,
                type: 'error',
            })
            return Promise.reject(response.data);
        } else if (response.status === 500) {
            ElMessage({
                message: '服务器错误' + tip,
                type: 'error',
            })
            return Promise.reject(response.data);
        } else {
            ElMessage({
                message: '未知错误' + tip,
                type: 'error',
            })
            return Promise.reject(response.data);
        }

    },
    (error) => {
        //message: 'Network Error'
        let message = error.message;
        if (message === "Network Error") {
            message = "网络错误，请检查网络连接"
        } else if (message.includes("timeout")) {
            message = "请求超时"
        } else if (message.includes("Request failed with status code")) {
            message = "请求错误，请检查网络连接"
        }

        ElMessage({
            message,
            type: 'error',
        })

    }
)


export default request;