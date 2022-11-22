/**
 * Convert to the type specified.
 * @param v Value to be converted
 */
export const convertTo = function <T>(v: any): T {
    return v as T;
};

/**
 * Check if an object is of type key value pair.
 * @param value Object too be checked.
 */
export function isKeyValuePair(value:any) {
    return value && typeof value === 'object' && value.constructor === Object;
}
