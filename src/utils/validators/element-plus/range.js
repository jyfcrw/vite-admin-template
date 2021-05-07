// https://github.com/yiminghe/async-validator#range
export default function (options) {
  if (typeof options?.min !== 'number' && typeof options?.max !== 'number') {
    throw new Error('options min/max must provide one')
  }
  return Object.assign({ type: 'any', message: `数据区间不正确`, trigger: 'blur' }, options)
}
