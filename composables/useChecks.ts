export function useChecks() {
  /**
   * check if it is a string
   * @param {unknown} arg parameter
   */
  const isString = (arg: unknown): arg is string => typeof arg == 'string'

  /**
   * check if it is an array
   * @param {unknown} arg parameter
   */
  const isArray = <T>(arg: unknown): arg is T[] => Array.isArray(arg) && typeof arg == 'object'

  /**
   * check if it is a number
   * @param {unknown} arg parameter
   */
  const isNumber = (arg: unknown): arg is number => !Number.isNaN(Number(arg))

  /**
   * check if it is a function
   * @param {unknown} arg parameter
   */
  const isFunction = (arg: unknown): arg is () => void => typeof arg === 'function'

  /**
   * check if it is an object
   * @param {unknown} arg parameter
   */
  const isObject = (arg: unknown): arg is Record<any, any> => arg !== null && typeof arg === 'object'

  /**
   * convert to number
   * @param {unknown} arg parameter
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
