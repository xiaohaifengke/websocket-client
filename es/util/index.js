export * from './events';
export * from './time';
export function isPromise(p) {
  return p !== undefined && p !== null && typeof p.then === 'function' && typeof p.catch === 'function';
}
//# sourceMappingURL=index.js.map