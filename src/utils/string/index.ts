/**
 * 下划线转驼峰
 * @param name
 * @returns string
 */
function toHump(name: string): string {
    return name.replace(/_(\w)/g, (all, letter) => {
        return letter.toUpperCase()
    })
}

/**
 * 驼峰转下划线
 * @param name
 * @returns string
 */
function toLine(name: string): string {
    return name.replace(/([A-Z])/g, '_$1').toLowerCase()
}

export {
    toHump,
    toLine,
}
