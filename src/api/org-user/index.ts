import type * as Models from './models'
import { request } from '@/utils'

// /qz/api/upms/org/list
// get 组织列表
export function getOrgList() {
    return request<ResponseData<Models.OrgList>>({
        url: '/upms/org/list',
        method: 'get',
    })
}

interface GetOrgUserParams {
    username: string
    email: string
    phone: string
    orgId: string
    roleId: string
    notRoleId: string
    current: number
    pageSize: number
    // 排序，json对象，如{'createTime':'ascend'}
    sorter: string
    // 过滤条件，json对象，如{'status':['0','1'],...}
    filter: string
}

type PartialGetOrgUserParams = Partial<GetOrgUserParams>

export function getOrgUser(params: PartialGetOrgUserParams) {
    return request<ResponseData<Models.OrgUserList>>({
        url: '/upms/user/list',
        method: 'get',
        params,
    })
}

export type {
    Models as OrgUserModels,
    GetOrgUserParams,
    PartialGetOrgUserParams,
}
