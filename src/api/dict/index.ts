/**
 * @description 字典相关请求
 */

import request from '@/utils/request'

function pageDict(params?: any) {
    return request({
        url: '/qz/api/setting/dic/item/list/page',
        params,
    })
}

function getDict(id: string) {
    return request({
        url: `/qz/api/setting/dic/item/list/${id}`,
    })
}

function addDict(data: any) {
    return request({
        url: '/qz/api/setting/dic/item/list',
        method: 'post',
        data,
    })
}

function updateDict(id: string, data: any) {
    return request({
        url: `/qz/api/setting/dic/item/list/${id}`,
        method: 'put',
        data,
    })
}

function removeDict(id: string) {
    return request({
        url: `/qz/api/setting/dic/item/list/${id}`,
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
