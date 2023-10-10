'use strict'

const { isString, isArray, isNumber } = useChecks()

export namespace UseModels {
  type ModelParams<T extends ModelPathType> = typeof ALL_MODELS_PARAMS[T]
  type ModelParamsKey<T extends ModelPathType> = keyof ModelParams<T>
  type ModelParamsWithIndexSignature<T extends ModelPathType> = ModelParams<T> & {
    [key: string]: AvailableValue
  }
  type FnKeepsakeKeyType<T extends ModelPathType> = ModelParamsKey<T>
  type AvailableValue = number | string
  type FetchReturnType<T extends ModelPathType, U extends ModelParamsKey<T> | ModelParamsKey<T>[] | [], SimpleType extends unknown | ''> =
    U extends ModelParamsKey<T>[] | []
      ? { [P in (U extends [] ? ModelParamsKey<T>[] : U)[number]]: AvailableValue }
      : SimpleType
  type ModelObjectsKeyType = ModelParamsWithIndexSignature<ModelPathType>
  type SubclassKeyType = typeof SUBCLASS[number]
  type ReassignObjectReturnType = Record<keyof ModelObjectsKeyType, AvailableValue>

  export declare namespace MultiCategoryScreening {
    export type SelectionType = number | number[]

    export interface SubclassArraysType {
      key: SubclassKeyType
      preselectionValues: SelectionType
      alreadySelectValues: SelectionType
    }

    export interface ReturnType {
      url: string
      subclassArrays: SubclassArraysType[]
    }

    export interface TransferType {
      id: number
      subclass: SubclassKeyType
      type: ModelPathType
      maxLength: number
      pathname: string
      firstID?: number
      keyword?: AvailableValue | null
    }
  }

  export interface UtilsInterface {
    readonly MULTI_CATEGORY_SEPARATOR: string
    joinObjectValues: (type: typeof ModelPathType[keyof typeof ModelPathType], objects: Record<string, AvailableValue>) => string
    customError: (message: string) => Error
    routerArrayData: <T extends ModelPathType>(type: T, pathname: string) => [AvailableValue[] | [], number, number]
    reassignObject: <T extends ModelPathType>(type: T, pathname: string) => ReassignObjectReturnType

    toNumber(v: string): number

    toNumber(v: string[]): AvailableValue[]

    backToSimple(value: AvailableValue): AvailableValue

    backToSimple(value: AvailableValue[]): AvailableValue[]
  }

  export interface ModelInterface {
    multiCategoryScreening(parameter: MultiCategoryScreening.TransferType): MultiCategoryScreening.ReturnType

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

    fetchModelParameterValue<T extends ModelPathType, U extends ModelParamsKey<T> | ModelParamsKey<T>[] | []>(
      type: T,
      parameter: U,
      availablePath?: string | ''
    ): FetchReturnType<T, U, AvailableValue>
  }

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

  export class ModelFn extends Utils implements ModelInterface {
    multiCategoryScreening: UseModels.ModelInterface['multiCategoryScreening'] = (parameter) => {
      const [DEFAULT_ID, SELF] = [0 as const, new ModelFn()]

      const { id, subclass, type, maxLength, firstID, pathname, keyword } = parameter
      const currentRouterResult = this.reassignObject(type, pathname)

      const checkMulti: number | number[] = isString(this.backToSimple(currentRouterResult[subclass]))
        ? (currentRouterResult[subclass] as string).split(this.MULTI_CATEGORY_SEPARATOR).map(v => +v)
        : this.backToSimple(currentRouterResult[subclass]) as number
      const isMultiArrays = isArray(checkMulti)

      const trimmedKeyword = !!keyword && String(keyword)?.trim() ? String(keyword).trim() : ''
      const assignmentKeyword = trimmedKeyword ? `?keyword=${trimmedKeyword}` : ''

      const delimiterConnect = (array: AvailableValue[]) => array.join(this.MULTI_CATEGORY_SEPARATOR)
      const clearZero = (array: number[]) => delimiterConnect(array.filter(v => v !== DEFAULT_ID))
      const clearCategory = () => {
        const optionalCategory: SubclassKeyType[] = ['cate_id']
        const clearCategory: SubclassKeyType[] = ['style', 'attribute1', 'attribute2', 'attribute3']

        if (optionalCategory.includes(subclass))
          clearCategory.forEach(item => currentRouterResult[item] = DEFAULT_ID)

        currentRouterResult.page = 1
      }

      if (isMultiArrays ? (firstID ? checkMulti.slice(1) : checkMulti).find(v => v === id) : checkMulti === id) {
        currentRouterResult[subclass] = isMultiArrays
          ? firstID
            ? delimiterConnect([
              isMultiArrays && checkMulti.filter(v => v !== firstID).length ? DEFAULT_ID : firstID,
              ...checkMulti.slice(1).filter(v => v !== id),
            ])
            : delimiterConnect(checkMulti.filter(v => v !== id))
          : DEFAULT_ID
      }
      else {
        if (id === DEFAULT_ID) {
          currentRouterResult[subclass] = DEFAULT_ID
        }
        else if (isMultiArrays && checkMulti.length >= maxLength) {
          const originalArray = firstID ? [firstID, ...checkMulti] : checkMulti

          firstID ? originalArray.splice(1, originalArray.length - maxLength) : originalArray.shift()
          currentRouterResult[subclass] = delimiterConnect([...originalArray, id])
        }
        else {
          currentRouterResult[subclass] = firstID
            ? clearZero(isMultiArrays ? [firstID, ...checkMulti, id] : [firstID, checkMulti, id])
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

            const preselectionValues = routerResultArray.length > 1
              ? SELF.toNumber(routerResultArray)
              : +currentRouterResult[key]
            const alreadySelectValues = originValues.length > 1
              ? SELF.toNumber(firstID ? originValues.slice(1) : originValues)
              : +originValues.join('')

            yield {
              key,
              preselectionValues,
              alreadySelectValues,
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
