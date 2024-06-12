interface PermissionItem {
    id: string
    parentId: string
    nextId: string | null
    children: Array<PermissionItem>
    name: string
    path: string | null
    genre: string
    expand: boolean | null
    remark: string | null
    disabled: null | boolean
    createTime: string
    updateTime: string
}

type PermissionList = Array<PermissionItem>

export type { PermissionItem, PermissionList }
