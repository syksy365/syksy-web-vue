/**
 * @description 字典相关请求
 */

import request from '@/utils/request'
import { setting } from '@/api/setting/common'

function pageDict(params?: any) {
    return request({
        url: `${setting}/dic/item/page`,
        params,
    })
}

function getDict(id: string) {
    return request({
        url: `${setting}/dic/${id}`,
    })
}

function addDict(data: any) {
    return request({
        url: `${setting}/dic`,
        method: 'post',
        data,
    })
}

function updateDict(id: string, data: any) {
    return request({
        url: `${setting}/dic/${id}`,
        method: 'put',
        data,
    })
}

function removeDict(id: string) {
    return request({
        url: `${setting}/dic/${id}`,
        method: 'delete',
    })
}

export {
    pageDict,
    getDict,
    addDict,
    updateDict,
    removeDict,
}
