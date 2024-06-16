export interface OrgItem {
    id: string
    name: string
    parentId: string
    nextId: string | null
    children: Array<OrgItem>
    expand: boolean | null
    createTime: string
    updateTime: string
}

export type OrgList = Array<OrgItem>

export interface OrgUserItem {
    id: string
    username: string
    name: string
    email: string | null
    phone: string | null
    orgId: string
    orgIds: Array<string>
    orgs: Record<string, string>
    roleIds: Array<string>
    roles: Record<string, string>
    avatar: null
    onOff: boolean
    remark: string | null
    createTime: string
    updateTime: string
}

export type OrgUserList = PageData<OrgUserItem>
