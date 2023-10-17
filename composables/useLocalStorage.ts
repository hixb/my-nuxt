export function useLocalStorage(mode: 'session' | 'local' = 'local') {
  const { isArray } = useChecks()

  function get<T extends string | number | boolean | object | null>(key: LocalStorage.LocalStorageKeyType) {
    const values = useStoreMode().getItem(key)

    return values ? JSON.parse(values) as T : null
  }

  function set(key: LocalStorage.LocalStorageKeyType, value: string | number | boolean | object) {
    useStoreMode().setItem(key, JSON.stringify(value))
  }

  function remove(key: LocalStorage.LocalStorageKeyType) {
    useStoreMode().removeItem(key)
  }

  /**
   * Append values to the local storage.
   * @param {LocalStorage.LocalStorageKeyType} key stored key.
   * @param {T[] | Record<string | number, T>} values values to be appended.
   * @template T type of the stored item, limited to T[] or Record<string | number, T>.
   */
  function multipleAppends<T>(key: LocalStorage.LocalStorageKeyType, values: T[] | Record<string | number, T>) {
    const localData = get<T extends T[] ? T[] : Record<string | number, T>>(key)

    if (isArray(values)) {
      if (!isArray(localData))
        throw new Error('Local data is not an array.')

      if (localData)
        set(key, [...localData, ...values])
      else
        set(key, values)
    }
    else {
      if (localData)
        set(key, { ...localData, ...values })
      else
        set(key, values)
    }
  }

  /**
   * Delete any item locally stored that matches the uniquelyIdentifies.
   * @param {LocalStorage.LocalStorageKeyType} key stored key.
   * @param {keyof T} uniquelyIdentifies key that uniquely identifies the item to be deleted.
   * @template T type of the stored item, limited to Record<string, any> or number.
   */
  function removeFrom<T extends Record<string, any> | number>(
    key: LocalStorage.LocalStorageKeyType,
    uniquelyIdentifies: T extends number ? number : Record<string, any>,
  ) {
    const localData = get<Record<string, any> | any[]>(key)

    if (isArray(uniquelyIdentifies)) {
      if (!isArray(localData))
        throw new Error('Local data is not an array.')

      if (localData)
        set(key, localData.filter(item => !uniquelyIdentifies.includes(item)))
      else
        set(key, localData)
    }
    else {
      if (!localData)
        throw new Error('Local data is empty.')

      set(key, localData.splice(uniquelyIdentifies, 1))
    }
  }

  function useStoreMode(): Storage {
    return mode === 'local' ? window.localStorage : window.sessionStorage
  }

  return {
    get,
    set,
    remove,
    multipleAppends,
    removeFrom,
  }
}
