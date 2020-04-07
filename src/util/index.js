export * from './events'
export * from './time'

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
const _toString = Object.prototype.toString

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
export function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

export function isPromise (p) {
  return (
    p !== undefined && p !== null && typeof p.then === 'function' && typeof p.catch === 'function'
  )
}

export function isArrayBufferView (obj) {
  return (
    obj instanceof Int8Array ||
    obj instanceof Uint8Array ||
    obj instanceof Uint8ClampedArray ||
    obj instanceof Int16Array ||
    obj instanceof Uint16Array ||
    obj instanceof Int32Array ||
    obj instanceof Uint32Array ||
    obj instanceof Float32Array ||
    obj instanceof Float64Array ||
    obj instanceof DataView
  )
}
