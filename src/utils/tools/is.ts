import { toTypeString } from './object'
import type { Fn } from './types'

export function isArray(obj: any): boolean {
    return Array.isArray(obj)
}

export const isMap = (val: unknown): val is Map<any, any> => toTypeString(val) === '[object Map]'

export const isSet = (val: unknown): val is Set<any> => toTypeString(val) === '[object Set]'

export const isString = (val: unknown): val is string => typeof val === 'string'

export const isDate = (val: unknown): val is Date => toTypeString(val) === '[object Date]'

export const isFunction = (val: unknown): val is Fn => typeof val === 'function'

export const isSymbol = (val: unknown): val is symbol => typeof val === 'symbol'

export const isObject = (val: unknown): val is Record<any, any> => val !== null && typeof val === 'object'

export function isPromise<T = any>(val: unknown): val is Promise<T> {
    return isObject(val) && isFunction(val.then) && isFunction(val.catch)
}

export const isNumber = (val: any): val is number => typeof val === 'number'

export const isNull = (val: unknown): val is null => toTypeString(val) === '[object Null]'

export const isUndefined = (val: unknown): val is undefined => toTypeString(val) === '[object Undefined]'

export const isRegExp = (val: unknown): val is RegExp => toTypeString(val) === '[object RegExp]'

export const isFile = (val: unknown): val is File => toTypeString(val) === '[object File]'

export const isPlainObject = (val: unknown): val is object => toTypeString(val) === '[object Object]'

export function isUndef(v: unknown) {
    return isNull(v) || isUndefined(v)
}

export function isEmptyString(v: unknown) {
    return isString(v) && v.trim().length === 0
}

export function isEmpty(val: any) {
    return val == null || !(Object.keys(val) || val).length
}
