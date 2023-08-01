/**
 * 判断是否是对象
 * @param {any} obj
 */
function isObject(obj: any) {
    return obj !== null && typeof obj === 'object'
}

/**
 * 判断对象是否为空
 * @param obj
 */
function isObjEmpty(obj: any) {
    return isObject(obj) && Object.keys(obj).length === 0
}

export {
    isObject,
    isObjEmpty,
}
