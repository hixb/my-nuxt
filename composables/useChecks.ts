export function useChecks() {
  /**
   * 检查是否为字符串
   * @param {unknown} arg 参数
   */
  const isString = (arg: unknown): arg is string => typeof arg == 'string'

  /**
   * 检查是否为数组
   * @param {unknown} arg 参数
   */
  const isArray = <T>(arg: unknown): arg is T[] => Array.isArray(arg) && typeof arg == 'object'

  /**
   * 检查是否为数字
   * @param {unknown} arg 参数
   */
  const isNumber = (arg: unknown): arg is number => !Number.isNaN(Number(arg))

  /**
   * 检查是否为函数
   * @param {unknown} arg 参数
   */
  const isFunction = (arg: unknown): arg is () => void => typeof arg === 'function'

  /**
   * 检查是否为对象
   * @param {unknown} arg 参数
   */
  const isObject = (arg: unknown): arg is Record<any, any> => arg !== null && typeof arg === 'object'

  /**
   * 转换为数字
   * @param {unknown} arg 参数
   */
  const toNumber = (arg: unknown): number => Number(arg)

  return {
    isString,
    isArray,
    isNumber,
    isFunction,
    isObject,
    toNumber,
  }
}
