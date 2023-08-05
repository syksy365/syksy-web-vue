export const objectToString = Object.prototype.toString

export const toTypeString = (value: unknown): string => objectToString.call(value)
