/**
 * @description 字典相关请求
 */

import { request } from '@/utils/request'
import { setting } from '@/api/setting/common'

function getDictTreeInfo(id: string) {
    return request({
        url: `${setting}/dic/item/tree/${id}`,
    })
}

function editDictTreeInfo(id: string, data: any) {
    return request({
        url: `${setting}/dic/item/tree/${id}`,
        method: 'put',
        data,

    })
}

function removeTreeDict(id: string) {
    return request({
        url: `${setting}/dic/item/tree/${id}`,
        method: 'delete',
    })
}

function expandTreeDict(id: string, expand: boolean) {
    return request({
        url: `${setting}/dic/item/tree/expand/${id}`,
        method: 'put',
        params: { expand },
    })
}

function getTreeDictList(id: number) {
    return request({
        url: `${setting}/dic/item/tree/list`,
        params: { id },
    })
}

function addTreeDict(data: any) {
    return request({
        url: `${setting}/dic/item/tree`,
        method: 'post',
        data,
    })
}

// 获取层级ID
function getDiceLevel(id: number, dicId: number) {
    return request({
        url: `${setting}/dic/item/tree/level${id}`,
        params: { dicId },
    })
}

export {
    getDictTreeInfo,
    editDictTreeInfo,
    removeTreeDict,
    expandTreeDict,
    getTreeDictList,
    addTreeDict,
    getDiceLevel,
}
