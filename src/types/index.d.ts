interface Response<T> {
    success: boolean
    data: T
    // TODO:需要补类型
    errorCode: null
    errorMessage: null
    showType: null
    traceId: null
    host: null
}

type ResStatus = 'ok' | 'error'
