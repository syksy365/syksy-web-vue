// /upms/menu/current

import type * as Models from './models'
import { request } from '@/utils'

export function getPermissionList() {
    return request<ResponseData<Models.PermissionList>>({
        url: '/upms/menu/current',
        method: 'get',
    })
}

export type {
    Models as PermissionModels,
}
