interface PermissionItem {
    id: string
    parentId: string
    nextId: string | null
    children: Array<PermissionItem>
    name: string
    path: string | null
    genre: 'directory' | 'action'
    expand: boolean | null
    remark: string | null
    disabled: null | boolean
    createTime: string
    updateTime: string
    component: any
}

type PermissionList = Array<PermissionItem>

export type { PermissionItem, PermissionList }
