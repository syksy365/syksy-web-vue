import request from '@/utils/request'
import { setting } from '@/api/setting/common'

function pageDict(params?: any) {
    return request({
        url: `${setting}/dic/item/list/page`,
        params,
    })
}

function getDict(id: string) {
    return request({
        url: `${setting}/dic/item/list/${id}`,
    })
}

function addDict(data: any) {
    return request({
        url: `${setting}/dic/item/list`,
        method: 'post',
        data,
    })
}

function updateDict(id: string, data: any) {
    return request({
        url: `${setting}/dic/item/list/${id}`,
        method: 'put',
        data,
    })
}

function removeDict(id: string) {
    return request({
        url: `${setting}/dic/item/list/${id}`,
        method: 'delete',
    })
}

function getDictInfo(dicName: string) {
    return request({
        url: `${setting}/dic/item/list/list`,
        params: { dicName },
    })
}

export {
    pageDict,
    getDict,
    addDict,
    updateDict,
    removeDict,
    getDictInfo,
}
