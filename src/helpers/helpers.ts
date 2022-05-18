export const isEmpty = (obj) => {
    return !!(obj === undefined || obj === null || typeof obj !== 'object' || !Object.keys(obj).length)
}
