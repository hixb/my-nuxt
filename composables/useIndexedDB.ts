export function useIdbStore() {
  const defaultGetStoreFunc = ref<IndexedBDSpace.IDBStore | undefined>()

  /**
   * Get a value.
   *
   * @param {IndexedBDSpace.IDBValidKeyType} key Key.
   * @param {IndexedBDSpace.IDBStore} [customStore] How to get a custom store.
   *
   * @template T type of the stored item.
   *
   * @example
   * get("key").then(val => console.log(val));
   *
   * @returns Promise<T | undefined>
   */
  function get<T = any>(
    key: IndexedBDSpace.IDBValidKeyType,
    customStore: IndexedBDSpace.IDBStore = defaultGetStore(),
  ): Promise<T | undefined> {
    return customStore('readonly', store => promisifyRequest(store.get(key)))
  }

  /**
   * Store a value.
   *
   * @param {IndexedBDSpace.IDBValidKeyType} key Key.
   * @param {any} value Values.
   * @param {IndexedBDSpace.IDBStore} [customStore] How to get a custom store.
   *
   * @example
   * set("key", "value")
   * Or
   * set("key", "value").then(() => console.log("added key: value"));
   *
   * @returns Promise
   */
  function set(
    key: IndexedBDSpace.IDBValidKeyType,
    value: any, customStore: IndexedBDSpace.IDBStore = defaultGetStore(),
  ): Promise<void> {
    return customStore('readwrite', (store) => {
      store.put(value, key)

      return promisifyRequest(store.transaction)
    })
  }

  /**
   * Set multiple values at once.
   *
   * @description If one of the pairs cannot be added, none of the pairs will be added.
   *
   * @param {Array} entries Array of entries, where each entry is a "[key, value]" array.
   * @param {IndexedBDSpace.IDBStore} [customStore] How to get a custom store.
   *
   * @example
   * setMany([["key1", "value1"], ["key2", "value2"]])
   * Or
   * setMany([["key1", "value1"], ["key2", "value2"]]).then(() => console.log("added key1: value1, key2: value2"));
   *
   * @returns Promise
   */
  function setMany(
    entries: [IndexedBDSpace.IDBValidKeyType, any][],
    customStore: IndexedBDSpace.IDBStore = defaultGetStore(),
  ): Promise<void> {
    return customStore('readwrite', (store) => {
      entries.forEach(entry => store.put(entry[1], entry[0]))

      return promisifyRequest(store.transaction)
    })
  }

  /**
   * Get multiple values at once.
   *
   * @param {IndexedBDSpace.IDBValidKeyType[]} keys Key array.
   * @param {IndexedBDSpace.IDBStore} [customStore] How to get a custom store.
   *
   * @example
   * getMany(["key1", "key2"]).then(([val1, val2]) => console.log(val1, val2));
   *
   * @returns val1, val2
   */
  function getMany<T = any>(
    keys: IndexedBDSpace.IDBValidKeyType[],
    customStore: IndexedBDSpace.IDBStore = defaultGetStore(),
  ): Promise<T[]> {
    return customStore('readonly', store =>
      Promise.all(keys.map(key => promisifyRequest(store.get(key)))),
    )
  }

  /**
   * Update a value, this looks at the old value and updates it as an atomic operation.
   *
   * @param {IndexedBDSpace.IDBValidKeyType} key Key.
   * @param {Function} updater A callback that accepts the old value and returns the new value.
   * @param {IndexedBDSpace.IDBStore} [customStore] How to get a custom store.
   *
   * @example
   * update("key", (val) => (val || 0) + 1);
   *
   * @returns Promise
   */
  function update<T = any>(
    key: IndexedBDSpace.IDBValidKeyType,
    updater: (oldValue: T | undefined) => T,
    customStore: IndexedBDSpace.IDBStore = defaultGetStore(),
  ): Promise<void> {
    return customStore('readwrite', store =>
      // Need to create the promise manually.
      // If I try to chain promises, the transaction closes in browsers
      // that use a promise polyfill (IE10/11).
      new Promise((resolve, reject) => {
        store.get(key).onsuccess = function () {
          try {
            store.put(updater(this.result), key)
            resolve(promisifyRequest(store.transaction))
          }
          catch (err) {
            reject(err)
          }
        }
      }),
    )
  }

  /**
   * Delete a value.
   *
   * @param {IndexedBDSpace.IDBValidKeyType} key Key.
   * @param {IndexedBDSpace.IDBStore} [customStore] How to get a custom store.
   *
   * @example
   * del("key");
   *
   * @returns Promise
   */
  function del(
    key: IndexedBDSpace.IDBValidKeyType,
    customStore: IndexedBDSpace.IDBStore = defaultGetStore(),
  ): Promise<void> {
    return customStore('readwrite', (store) => {
      store.delete(key)

      return promisifyRequest(store.transaction)
    })
  }

  /**
   * Delete multiple.
   *
   * @param {IndexedBDSpace.IDBValidKeyType[]} keys List of keys to delete.
   * @param {IndexedBDSpace.IDBStore} [customStore] How to get a custom store.
   *
   * @example
   * delMany(["key1", "key2"]);
   * 或者
   * delMany(["key1", "key2"]).then(() => console.log("deleted key1, key2"));
   *
   * @returns Promise
   */
  function delMany(
    keys: IndexedBDSpace.IDBValidKeyType[],
    customStore: IndexedBDSpace.IDBStore = defaultGetStore(),
  ): Promise<void> {
    return customStore('readwrite', (store: IDBObjectStore) => {
      keys.forEach((key: IndexedBDSpace.IDBValidKeyType) => store.delete(key))

      return promisifyRequest(store.transaction)
    })
  }

  /**
   * Clear all values in storage.
   *
   * @param {IndexedBDSpace.IDBStore} [customStore] How to get a custom store.
   *
   * @example
   * clear();
   *
   * @returns Promise
   */
  function clear(customStore: IndexedBDSpace.IDBStore = defaultGetStore()): Promise<void> {
    return customStore('readwrite', (store) => {
      store.clear()

      return promisifyRequest(store.transaction)
    })
  }

  /**
   * Get all keys in the store.
   *
   * @param {IndexedBDSpace.IDBStore} [customStore] How to get a custom store.
   *
   * @example
   * keys().then((keys) => console.log(keys));
   *
   * @returns ["key1", "key2"]
   */
  function keys<KeyType extends IndexedBDSpace.IDBValidKeyType>(
    customStore: IndexedBDSpace.IDBStore = defaultGetStore(),
  ): Promise<KeyType[]> {
    return customStore('readonly', async (store) => {
      // Fast path for modern browsers
      if (store.getAllKeys) {
        return promisifyRequest(
          store.getAllKeys() as unknown as IDBRequest<KeyType[]>,
        )
      }

      const items: KeyType[] = []
      await eachCursor(store, cursor => items.push(cursor.key as KeyType))

      return items
    })
  }

  /**
   * Get all values in store.
   *
   * @param {IndexedBDSpace.IDBStore} [customStore] How to get a custom store.
   *
   * @example
   * values().then((values) => console.log(values));
   *
   * @returns ["value1", "value2"]
   */
  function values<T = any>(customStore: IndexedBDSpace.IDBStore = defaultGetStore()): Promise<T[]> {
    return customStore('readonly', async (store) => {
      // Fast path for modern browsers
      if (store.getAll)
        return promisifyRequest(store.getAll() as IDBRequest<T[]>)

      const items: T[] = []
      await eachCursor(store, cursor => items.push(cursor.value as T))
      return items
    })
  }

  /**
   * Get all items in the store. Each entry is a `[key, value]` array
   *
   * @param {IndexedBDSpace.IDBStore} [customStore] How to get a custom store.
   *
   * @example
   * entries().then((entries) => console.log(entries));
   *
   * @returns [[key1, key2], [value1, value2]]
   */
  function entries<KeyType extends IndexedBDSpace.IDBValidKeyType, ValueType = any>(
    customStore: IndexedBDSpace.IDBStore = defaultGetStore(),
  ): Promise<[KeyType, ValueType][]> {
    return customStore('readonly', async (store) => {
      // Fast path for modern browsers
      // (although, hopefully we'll get a simpler path some day)
      if (store.getAll && store.getAllKeys) {
        const [keys, values_1] = await Promise.all([
          promisifyRequest(store.getAllKeys() as unknown as IDBRequest<KeyType[]>),
          promisifyRequest(store.getAll() as IDBRequest<ValueType[]>),
        ])
        return keys.map((key, i) => [key, values_1[i]])
      }

      const items: [KeyType, ValueType][] = []

      return customStore('readonly', store =>
        eachCursor(store, cursor => items.push([cursor.key as KeyType, cursor.value])).then(() => items),
      )
    })
  }

  function eachCursor(store: IDBObjectStore, callback: (cursor: IDBCursorWithValue) => void): Promise<void> {
    store.openCursor().onsuccess = function () {
      if (!this.result)
        return
      callback(this.result)
      this.result.continue()
    }

    return promisifyRequest(store.transaction)
  }

  function promisifyRequest<T = undefined>(request: IDBRequest<T> | IDBTransaction): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (request instanceof IDBTransaction) {
        request.oncomplete = () => resolve((request as any).result)
        request.onerror = () => reject(request.error)
      }
      else {
        request.onsuccess = () => resolve(request.result)
        request.onerror = () => reject(request.error)
      }
    })
  }

  function createStore(dbName: string, storeName: string): IndexedBDSpace.IDBStore {
    const request = indexedDB.open(dbName)
    request.onupgradeneeded = () => request.result.createObjectStore(storeName)
    const dbp = promisifyRequest(request)

    return (txMode, callback) =>
      dbp.then(db => callback(db.transaction(storeName, txMode).objectStore(storeName)))
  }

  function defaultGetStore() {
    if (!defaultGetStoreFunc.value)
      defaultGetStoreFunc.value = createStore('database', 'public')

    return defaultGetStoreFunc.value
  }

  return {
    get,
    set,
    setMany,
    getMany,
    update,
    del,
    delMany,
    clear,
    keys,
    values,
    entries,
    promisifyRequest,
    createStore,
  }
}
