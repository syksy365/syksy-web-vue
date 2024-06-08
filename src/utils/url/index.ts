export function getAllUrlParams(): any {
    const url = window.location.href
    const queryString = url.split('?')[1] || ''
    if (!queryString)
        return {}
    const params = new URLSearchParams(queryString)
    const result: any = {}
    for (const [key, value] of params.entries()) {
        result[key] = value
    }
    return result
}
