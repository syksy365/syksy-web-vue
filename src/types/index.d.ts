interface ResponseData<T> {
    success: boolean
    data: T
    // TODO:需要补类型
    errorCode: null
    errorMessage: null
    showType: null
    traceId: null
    host: null
}

interface PageData<T> {
    total: number
    size: number
    current: number
    pages: number
    data: T[]
}

type ResStatus = 'ok' | 'error'
