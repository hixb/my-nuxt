'use strict'

const { isString, isArray, isNumber } = useChecks()

/**
 * @fileOverview Model links related functions.
 * @namespace UseModels
 */
export namespace UseModels {
  /**
   * Indicates getting the value in the model parameters.
   */
  type ModelParams<T extends ModelPathType> = typeof ALL_MODELS_PARAMS[T]
  /**
   * Indicates getting the key in the model parameters.
   */
  type ModelParamsKey<T extends ModelPathType> = keyof ModelParams<T>
  /**
   * Indicates a model parameter with an index signature.
   */
  type ModelParamsWithIndexSignature<T extends ModelPathType> = ModelParams<T> & {
    [key: string]: AvailableValue
  }
  /**
   * Indicates the formal parameter key type of the function.
   */
  type FnKeepsakeKeyType<T extends ModelPathType> = ModelParamsKey<T>
  /**
   * Indicates the type of value that can be passed.
   */
  type AvailableValue = number | string
  /**
   * Indicates the return value type of the **fetchModelParameterValue** function.
   * @template T Available types are ModelPathType
   * @template U Available types are ModelParamsKey<T> | ModelParamsKey<T>[] | []
   * @template SimpleType Simple data type.
   */
  type FetchReturnType<T extends ModelPathType, U extends ModelParamsKey<T> | ModelParamsKey<T>[] | [], SimpleType extends unknown | ''> =
    U extends ModelParamsKey<T>[] | []
      ? { [P in (U extends [] ? ModelParamsKey<T>[] : U)[number]]: AvailableValue }
      : SimpleType
  /**
   * Indicates the type of key in the model object.
   */
  type ModelObjectsKeyType = ModelParamsWithIndexSignature<ModelPathType>
  /**
   * Indicates subclass type.
   */
  type SubclassKeyType = typeof SUBCLASS[number]
  /**
   * Indicates the return value type of the reassigned object.
   */
  type ReassignObjectReturnType = Record<keyof ModelObjectsKeyType, AvailableValue>

  /**
   * @fileOverview Multi-category filtering related types.
   * @namespace MultiCategoryScreening
   */
  export declare namespace MultiCategoryScreening {
    /**
     * Indicates the type of the selected subclass value.
     */
    export type SelectionType = number | number[]

    /**
     * Indicates a subclass array type.
     */
    export interface SubclassArraysType {
      /**
       * Subclass identifier.
       */
      key: SubclassKeyType
      /**
       * The subcategory value to be selected.
       */
      preselectionValues: SelectionType
      /**
       * Selected subcategory value.
       */
      alreadySelectValues: SelectionType
    }

    /**
     * Indicates the type of multi-category filtering returned.
     */
    export interface ReturnType {
      /**
       * Link address.
       */
      url: string
      /**
       * Subclass array.
       */
      subclassArrays: SubclassArraysType[]
    }

    /**
     * Indicates multi-category filtering parameters.
     */
    export interface TransferType {
      /**
       * The ID of the current click.
       */
      id: number
      /**
       * Click type.
       */
      subclass: SubclassKeyType
      /**
       * Category.
       */
      type: ModelPathType
      /**
       * Maximum length that can be selected.
       */
      maxLength: number
      /**
       * Path.
       */
      pathname: string
      /**
       * The first item ID is used for parameters. The first item is an unchanged ID.
       */
      firstID?: number
      /**
       * Address bar keywords.
       */
      keyword?: AvailableValue | null
    }
  }

  /**
   * Indicates the type of tool class.
   */
  export interface UtilsInterface {
    /**
     * Multiple category separators.
     */
    readonly MULTI_CATEGORY_SEPARATOR: string
    /**
     * Connect objects.
     * @param {typeof ModelPathType[keyof typeof ModelPathType]} type Type.
     * @param {Record<string, number>} objects Object.
     */
    joinObjectValues: (type: typeof ModelPathType[keyof typeof ModelPathType], objects: Record<string, AvailableValue>) => string
    /**
     * Custom error.
     * @param {string} message Message.
     */
    customError: (message: string) => Error
    /**
     * Route array data.
     * @template T
     * @param {T} type Type.
     * @param {string} pathname Pathname.
     */
    routerArrayData: <T extends ModelPathType>(type: T, pathname: string) => [AvailableValue[] | [], number, number]
    /**
     * Reassign object.
     * @template T
     * @param {T} type Type.
     * @param {string} pathname Pathname.
     */
    reassignObject: <T extends ModelPathType>(type: T, pathname: string) => ReassignObjectReturnType

    /**
     * Convert string to number.
     * @param {string} v Value.
     */
    toNumber(v: string): number

    /**
     * Convert string to number.
     * @param {string[]} v Value.
     */
    toNumber(v: string[]): AvailableValue[]

    /**
     * Return check type value.
     * @param {AvailableValue} value Value.
     */
    backToSimple(value: AvailableValue): AvailableValue

    /**
     * Return check type value.
     * @param {AvailableValue[]} value Value.
     */
    backToSimple(value: AvailableValue[]): AvailableValue[]
  }

  /**
   * Indicates the type of a general class.
   */
  export interface ModelInterface {
    /**
     * Multi-category filtering.
     * @param {MultiCategoryScreening.TransferType} parameter Katasan.
     * @author Xiaobing Zhu <zhuxb@tuju.cn>
     * @copyright Tuju 2023
     */
    multiCategoryScreening(parameter: MultiCategoryScreening.TransferType): MultiCategoryScreening.ReturnType

    /**
     * URL to generate model list.
     * @template T Available types are ModelPathType.
     * @param {T} type Type.
     * @param {FnKeepsakeKeyType<T>[] | FnKeepsakeKeyType<T>} [key] Parameter key.
     * @param {number[] | string[] | AvailableValue[]} [value] Parameter value.
     * @param {string | boolean} [useTheCurrentPathToChange] Whether to use the current path to change the path to be generated.
     * @author Xiaobing Zhu <zhuxb@tuju.cn>
     * @copyright Tuju 2023
     * @example
     * createModelListURL(ModelPathType.MODEL, ["cate_pid", "cate_id"], [1, 2])
     * or
     * createModelListURL(ModelPathType.MODEL, ["cate_pid", "cate_id"], [1, "2"])
     */
    createModelListURL<T extends ModelPathType>(
      type: T,
      key?: FnKeepsakeKeyType<T>[] | FnKeepsakeKeyType<T>,
      value?: number[] | string[] | AvailableValue[],
      useTheCurrentPathToChange?: string | boolean
    ): string

    /**
     * URL to generate model list.
     * @param {ModelPathType} type Type.
     * @param {FnKeepsakeKeyType<ModelPathType> | string} [key] Parameter key.
     * @param {AvailableValue} [value] Parameter value.
     * @param {string | boolean} [useTheCurrentPathToChange] Whether to use the current path to change the path to be generated.
     * @author Xiaobing Zhu <zhuxb@tuju.cn>
     * @copyright Tuju 2023
     * @example
     * createModelListURL(ModelPathType.MODEL, "cate_pid", 1)
     * or
     * createModelListURL(ModelPathType.MODEL, "cate_pid", "1")
     */
    createModelListURL(
      type: ModelPathType,
      key?: FnKeepsakeKeyType<ModelPathType> | string,
      value?: AvailableValue,
      useTheCurrentPathToChange?: string | boolean
    ): string

    /**
     * Get model link parameter values.
     * @template T
     * @template U
     * @param {T} type Type.
     * @param {U} parameter Parameter key.
     * @param {string | boolean} [availablePath] The path to get the parameters.
     * @description [parameter]If it is [], it means to get all parameter values.
     * @example
     * // Returns the value of `cate id`.
     * fetchModelParameterValue(ModelPathType.MODEL, "cate_id");
     * // Return model link `all` parameter values.
     * fetchModelParameterValue(ModelPathType.MODEL, []);
     * // Return the value of `cate_id`, `original`.
     * fetchModelParameterValue(ModelPathType.MODEL, ["cate_id", "original"]);
     * // Returns the value of `cate_id`, `original` of the incoming link.
     * fetchModelParameterValue(ModelPathType.MODEL, ["cate_id", "original"], "/models/model-0-0-0-1-0-0-0-2-0-0-0-1-0-0-0-0-0.html");
     * @author Xiaobing Zhu <zhuxb@tuju.cn>
     * @copyright Tuju 2023
     * @return {FetchReturnType<T, U, (AvailableValue | never)>}
     */
    fetchModelParameterValue<T extends ModelPathType, U extends ModelParamsKey<T> | ModelParamsKey<T>[] | []>(
      type: T,
      parameter: U,
      availablePath?: string | ''
    ): FetchReturnType<T, U, AvailableValue>
  }

  // Subclass cate_id-secondary classification style-style attribute1-attribute 1 attribute2-attribute 2 attribute3-attribute 3.
  export const SUBCLASS = ['cate_id', 'style', 'attribute1', 'attribute2', 'attribute3'] as const

  export enum ModelPathType {
    MODEL = 'models/model',
  }

  export const ALL_MODELS_PARAMS = {
    [ModelPathType.MODEL]: {
      cate_pid: 0,
      cate_id: 0,
      style: 0,
      original: 1,
      attribute1: 0,
      attribute2: 0,
      attribute3: 0,
    },
  }

  /**
   * Model tool class.
   */
  abstract class Utils implements UtilsInterface {
    readonly MULTI_CATEGORY_SEPARATOR = '_'

    toNumber(v: string): number
    toNumber(v: string[]): AvailableValue[]
    toNumber(v: string[] | string): number | AvailableValue[] {
      return isNumber(v) ? Number(v) : this.backToSimple(v as string[])
    }

    joinObjectValues: UseModels.UtilsInterface['joinObjectValues'] = (type, objects) => {
      for (const key in objects) {
        if (Object.prototype.hasOwnProperty.call(objects, key))
          objects[key] = objects[key].toString()
      }

      return `/${type}-${Object.values(objects).join('-')}.html`
    }

    customError: UseModels.UtilsInterface['customError'] = (message): Error => {
      throw new Error(message)
    }

    backToSimple(value: AvailableValue): AvailableValue
    backToSimple(value: AvailableValue[]): AvailableValue[]
    backToSimple(value: AvailableValue | AvailableValue[]) {
      const toNum = (v: AvailableValue) => isNumber(v) ? this.toNumber(String(v)) : v

      return isArray(value) ? value.map(v => toNum(v)) : toNum(value)
    }

    routerArrayData: UseModels.UtilsInterface['routerArrayData'] = (type, pathname) => {
      const routerArray = pathname.match(/([\d_]+(-[\d_]+)*)/g)?.join('')?.split('-') ?? []

      return [
        routerArray,
        routerArray.length,
        Object.keys(ALL_MODELS_PARAMS[type]).length,
      ]
    }

    reassignObject: UseModels.UtilsInterface['reassignObject'] = (type, pathname) => {
      const [routerArray] = this.routerArrayData(type, pathname)
      const currentRouterResult: ReassignObjectReturnType = {}

      Object.keys(ALL_MODELS_PARAMS[type]).forEach((key: keyof ModelObjectsKeyType, index) =>
        currentRouterResult[key] = this.backToSimple(routerArray[index]),
      )

      return currentRouterResult
    }
  }

  /**
   * Model function class.
   */
  export class ModelFn extends Utils implements ModelInterface {
    multiCategoryScreening: UseModels.ModelInterface['multiCategoryScreening'] = (parameter) => {
      const [DEFAULT_ID, SELF] = [0 as const, new ModelFn()]
      const { id, subclass, type, maxLength, firstID, pathname, keyword } = parameter
      const currentRouterResult = this.reassignObject(type, pathname)

      // Check whether there are multiple IDs in the currently selected type.
      const checkMulti: number | number[] = isString(this.backToSimple(currentRouterResult[subclass]))
        ? (currentRouterResult[subclass] as string).split(this.MULTI_CATEGORY_SEPARATOR).map(v => +v)
        : this.backToSimple(currentRouterResult[subclass]) as number

      // Check if `subclass` is an array.
      const isMultiArrays = isArray(checkMulti)

      // Keywords.
      const assignmentKeyword = !!keyword && !!String(keyword)?.trim() ? `?keyword=${String(keyword).trim()}` : ''

      /**
       * Separator connection.
       * @param {AvailableValue[]} array Array.
       */
      const delimiterConnect = (array: AvailableValue[]) => array.join(this.MULTI_CATEGORY_SEPARATOR)
      /**
       * Clear zero.
       * @param {number[]} array Array.
       */
      const clearZero = (array: number[]) => delimiterConnect(array.filter(v => v !== DEFAULT_ID))
      /**
       * Clear Category.
       * @description Clear categories when other categories are selected.
       */
      const clearCategory = () => {
        const optionalCategory: SubclassKeyType[] = ['cate_id']
        const clearCategory: SubclassKeyType[] = ['style', 'attribute1', 'attribute2', 'attribute3']

        if (optionalCategory.includes(subclass)) 
          clearCategory.forEach(item => currentRouterResult[item] = DEFAULT_ID)

        currentRouterResult.page = 1
      }

      // Determine whether the currently clicked ID exists,
      // if it is an array (if there is firstID, ignore it), then delete the ID in the array,
      // if it is a number, directly assign a value of 0.
      if (isMultiArrays ? (firstID ? checkMulti.slice(1) : checkMulti).find(v => v === id) : checkMulti === id) {
        // Check if it is an array
        //   ? Check if firstID exists
        //     ? Delete the selected id except firstID
        //     : Delete the currently selected id
        //   : Directly assign a value of 0.
        currentRouterResult[subclass] = isMultiArrays
          ? firstID
            ? delimiterConnect([
              // Whether it is an array and excluding firstID, check the length of the array,
              // if there is no length, return to the default ID.
              isMultiArrays && checkMulti.filter(v => v !== firstID).length ? DEFAULT_ID : firstID,
              ...checkMulti.slice(1).filter(v => v !== id),
            ])
            : delimiterConnect(checkMulti.filter(v => v !== id))
          : DEFAULT_ID
      }
      else {
        // Determine whether the currently clicked ID is 0. If it is 0,
        // it means everything is selected. Clear the selected items and assign a value of 0.
        if (id === DEFAULT_ID) {
          currentRouterResult[subclass] = DEFAULT_ID
        }
        else if (isMultiArrays && checkMulti.length >= maxLength) {
          // Original array: Check if the first item ID exists.
          //   ? Then add the first item ID to the array.
          //   : Ordinary item array.
          const originalArray = firstID ? [firstID, ...checkMulti] : checkMulti

          // Check whether the first item ID exists.
          //   ? Start deleting from the first item. The length of deletion is the array length - the maximum length.
          //   : Delete the first item of the array.
          firstID ? originalArray.splice(1, originalArray.length - maxLength) : originalArray.shift()
          currentRouterResult[subclass] = delimiterConnect([...originalArray, id])
        }
        else {
          currentRouterResult[subclass] = firstID
            // Keep the original ID, add the first item ID to the array, and add the currently clicked ID to the array.
            ? clearZero(isMultiArrays ? [firstID, ...checkMulti, id] : [firstID, checkMulti, id])
            // Keep the original ID and add the currently clicked ID to the array.
            : clearZero(isMultiArrays ? [...checkMulti, id] : [checkMulti, id])
        }
      }

      function* generateSubclassArray(): Generator<MultiCategoryScreening.SubclassArraysType, void> {
        const [keys, originValues] = [
          Object.keys(currentRouterResult),
          String(SELF.reassignObject(type, pathname)[subclass]).split(SELF.MULTI_CATEGORY_SEPARATOR),
        ]

        do {
          const key = keys.shift() as SubclassKeyType

          if (SUBCLASS.includes(key)) {
            const routerResultArray = String(currentRouterResult[key]).split(SELF.MULTI_CATEGORY_SEPARATOR)

            yield {
              key,
              preselectionValues:
                routerResultArray.length > 1 ? SELF.toNumber(routerResultArray) : +currentRouterResult[key],
              alreadySelectValues:
                originValues.length > 1
                  ? firstID ? SELF.toNumber(originValues).slice(1) : SELF.toNumber(originValues)
                  : +originValues.join(''),
            } as MultiCategoryScreening.SubclassArraysType
          }
        } while (keys.length > 0)
      }

      clearCategory()

      return {
        url: `/${type}-${Object.values(currentRouterResult).join('-')}.html${assignmentKeyword}`,
        subclassArrays: [...generateSubclassArray.bind(this)()],
      } as UseModels.MultiCategoryScreening.ReturnType
    }

    createModelListURL<T extends ModelPathType>(
      type: T,
      key?: FnKeepsakeKeyType<T>[] | FnKeepsakeKeyType<T>,
      value?: number[] | string[] | AvailableValue[],
      useTheCurrentPathToChange?: string | boolean
    ): string
    createModelListURL(
      type: ModelPathType,
      key?: FnKeepsakeKeyType<ModelPathType> | string,
      value?: AvailableValue,
      useTheCurrentPathToChange?: string | boolean
    ): string
    createModelListURL<T extends ModelPathType>(
      type: T,
      key?: FnKeepsakeKeyType<T> | FnKeepsakeKeyType<T>[] | string,
      value?: AvailableValue | number[] | string[] | AvailableValue[],
      useTheCurrentPathToChange: string | boolean = false,
    ): string {
      key && !value && this.customError('A value must be provided when a key is provided.')

      if (!key)
        return this.joinObjectValues(type, ALL_MODELS_PARAMS[type])

      isArray(key) !== isArray(value) && this.customError('The type of key and value must be the same.')

      if (isString(key) && !Object.keys(ALL_MODELS_PARAMS[type]).find(item => item === key))
        this.customError(`"${key}" is not a valid parameter.`)

      const pathname = isString(useTheCurrentPathToChange) ? useTheCurrentPathToChange : window.location.pathname

      if (useTheCurrentPathToChange) {
        if (!pathname.includes(`${type}-`)) {
          this.customError(`"${pathname}" path does not match, needs to match at: ${type}-.`)
        }
        else {
          const [, inputLength, fixedLength] = this.routerArrayData(type, pathname)

          if (inputLength !== fixedLength)
            this.customError(`Your route parameter length is ${inputLength}, the expected length is ${fixedLength}.`)
        }
      }

      const currentParams = (
        useTheCurrentPathToChange ? this.reassignObject(type, pathname) : ALL_MODELS_PARAMS[type]
      ) as ModelParamsWithIndexSignature<T>

      if (isArray(key) && isArray(value)) {
        key.length !== value.length && this.customError('The lengths of \'key\' and \'value\' arrays do not match.')

        for (const index of key) {
          if (index in currentParams)
            (currentParams[index] as AvailableValue) = value[key.indexOf(index)]
        }
      }
      else {
        (currentParams[key as ModelParamsKey<T>] as AvailableValue) = value as AvailableValue
      }

      return this.joinObjectValues(type, currentParams)
    }

    fetchModelParameterValue<T extends ModelPathType, U extends ModelParamsKey<T> | ModelParamsKey<T>[] | []>(
      type: T,
      parameter: U,
      availablePath: string | '' = '',
    ): FetchReturnType<T, U, AvailableValue> {
      const pathname = isString(availablePath) && availablePath !== '' ? availablePath : window.location.pathname
      const [routerArray, inputLength, fixedLength] = this.routerArrayData(type, pathname)

      if (!pathname.includes(type) || inputLength !== fixedLength) {
        this.customError(
          `${!pathname.includes(type)
            ? `The incoming path or the automatically obtained path does not contain "${type}"`
            : `Your route parameter length is ${inputLength}, the expected length is ${fixedLength}.`
          }`,
        )
      }

      const mergeObjects = Object.keys(ALL_MODELS_PARAMS[type]).reduce(
        (merged, key, index) => {
          merged[key] = routerArray[index]
          return merged
        },
        {} as { [key: string]: AvailableValue },
      )

      const fromRecords = <T, K extends keyof T, V extends keyof T>(item: T[], key: K, value: V): Record<keyof T, T[V]> =>
        Object.fromEntries(item.map(({ [key]: k, [value]: v }) => [k, v]))

      if (isArray(parameter)) {
        const objects: { key: string; value: any }[] = [];

        ((!parameter.length ? Object.keys(ALL_MODELS_PARAMS[type]) : parameter) as string[]).forEach((item) => {
          const eachItem = mergeObjects[item]

          if (eachItem)
            objects.push({ key: item, value: this.backToSimple(eachItem) })
        })

        return fromRecords(objects, 'key', 'value') as unknown as FetchReturnType<T, U, never>
      }

      return this.backToSimple(mergeObjects[parameter as string]) as FetchReturnType<T, U, AvailableValue>
    }
  }
}
