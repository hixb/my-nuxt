import { DatabaseSurfaceType, UseStore } from "~/types/interface/utils/idb";

let defaultGetStoreFunc: UseStore | undefined;

/**
 * 使用indexedDB事务性数据库
 */
export function useIdbStore() {
  /**
   * 获取一个值
   *
   * @param {IDBValidKey | DatabaseSurfaceType} key 键
   * @param {any} [customStore] 获取自定义商店的方法
   *
   * @example
   * get("key").then(val => console.log(val));
   *
   * @returns "value"
   */
  function get<T = any>(
    key: IDBValidKey & DatabaseSurfaceType,
    customStore = defaultGetStore()
  ): Promise<T | undefined> {
    return customStore("readonly", (store) => promisifyRequest(store.get(key)));
  }

  /**
   * 存储一个值
   *
   * @param {IDBValidKey} key 键
   * @param {any} value 值
   * @param {any} [customStore] 获取自定义商店的方法
   *
   * @example
   * set("key", "value")
   * 或者
   * set("key", "value").then(() => console.log("added key: value"));
   *
   * @returns Promise
   */
  function set(
    key: IDBValidKey,
    value: any,
    customStore = defaultGetStore()
  ): Promise<void> {
    return customStore("readwrite", (store) => {
      store.put(value, key);

      return promisifyRequest(store.transaction);
    });
  }

  /**
   * 一次设置多个值
   *
   * @description 如果无法无法添加其中一对, 则不会添加任何一对
   *
   * @param {Array} entries 条目数组, 其中每个条目都是一个“[key, value]”数组
   * @param {any} [customStore] 获取自定义商店的方法
   *
   * @example
   * setMany([["key1", "value1"], ["key2", "value2"]])
   * 或者
   * setMany([["key1", "value1"], ["key2", "value2"]]).then(() => console.log("added key1: value1, key2: value2"));
   *
   * @returns Promise
   */
  function setMany(
    entries: [IDBValidKey, any][],
    customStore = defaultGetStore()
  ): Promise<void> {
    return customStore("readwrite", (store) => {
      entries.forEach((entry) => store.put(entry[1], entry[0]));

      return promisifyRequest(store.transaction);
    });
  }

  /**
   * 一次获取多个值
   *
   * @param {IDBValidKey[]} keys 键数组
   * @param {any} [customStore] 获取自定义商店的方法
   *
   * @example
   * getMany(["key1", "key2"]).then(([val1, val2]) => console.log(val1, val2));
   *
   * @returns val1, val2
   */
  function getMany<T = any>(
    keys: IDBValidKey[],
    customStore = defaultGetStore()
  ): Promise<T[]> {
    return customStore("readonly", (store) =>
      Promise.all(keys.map((key) => promisifyRequest(store.get(key))))
    );
  }

  /**
   * 更新一个值, 这可以查看旧值并将其更新为原子操作
   *
   * @param {IDBValidKey} key 键
   * @param {Function} updater 接受旧值并返回新值的回调
   * @param {any} [customStore] 获取自定义商店的方法
   *
   * @example
   * update("key", (val) => (val || 0) + 1);
   *
   * @returns Promise
   */
  function update<T = any>(
    key: IDBValidKey,
    updater: (oldValue: T | undefined) => T,
    customStore = defaultGetStore()
  ): Promise<void> {
    return customStore("readwrite", (store) =>
      // Need to create the promise manually.
      // If I try to chain promises, the transaction closes in browsers
      // that use a promise polyfill (IE10/11).
      new Promise((resolve, reject) => {
        store.get(key).onsuccess = function() {
          try {
            store.put(updater(this.result), key);
            resolve(promisifyRequest(store.transaction));
          } catch (err) {
            reject(err);
          }
        };
      }),
    );
  }

  /**
   * 删除一个值
   *
   * @param {IDBValidKey} key 键
   * @param {any} [customStore] 获取自定义商店的方法
   *
   * @example
   * del("key");
   *
   * @returns Promise
   */
  function del(key: IDBValidKey, customStore = defaultGetStore()): Promise<void> {
    return customStore("readwrite", (store) => {
      store.delete(key);

      return promisifyRequest(store.transaction);
    });
  }

  /**
   * 删除多个
   *
   * @param {IDBValidKey[]} keys 要删除的键列表
   * @param {any} [customStore] 获取自定义商店的方法
   *
   * @example
   * delMany(["key1", "key2"]);
   * 或者
   * delMany(["key1", "key2"]).then(() => console.log("deleted key1, key2"));
   *
   * @returns Promise
   */
  function delMany(keys: IDBValidKey[], customStore = defaultGetStore()): Promise<void> {
    return customStore("readwrite", (store: IDBObjectStore) => {
      keys.forEach((key: IDBValidKey) => store.delete(key));

      return promisifyRequest(store.transaction);
    });
  }

  /**
   * 清除存储中的所有值
   *
   * @param {any} [customStore] 获取自定义商店的方法
   *
   * @example
   * clear();
   *
   * @returns Promise
   */
  function clear(customStore = defaultGetStore()): Promise<void> {
    return customStore("readwrite", (store) => {
      store.clear();

      return promisifyRequest(store.transaction);
    });
  }

  /**
   * 获取商店中的所有key
   *
   * @param {any} [customStore] 获取自定义商店的方法
   *
   * @example
   * keys().then((keys) => console.log(keys));
   *
   * @returns ["key1", "key2"]
   */
  function keys<KeyType extends IDBValidKey>(
    customStore = defaultGetStore()
  ): Promise<KeyType[]> {
    return customStore("readonly", (store) => {
      // Fast path for modern browsers
      if (store.getAllKeys) {
        return promisifyRequest(
          store.getAllKeys() as unknown as IDBRequest<KeyType[]>
        );
      }

      const items: KeyType[] = [];

      return eachCursor(store, (cursor) => items.push(cursor.key as KeyType)).then(() => items);
    });
  }

  /**
   * 获取商店中的所有值
   *
   * @param {any} [customStore] 获取自定义商店的方法
   *
   * @example
   * values().then((values) => console.log(values));
   *
   * @returns ["value1", "value2"]
   */
  function values<T = any>(customStore = defaultGetStore()): Promise<T[]> {
    return customStore("readonly", (store) => {
      // Fast path for modern browsers
      if (store.getAll) {
        return promisifyRequest(store.getAll() as IDBRequest<T[]>);
      }

      const items: T[] = [];

      return eachCursor(store, (cursor) => items.push(cursor.value as T)).then(() => items);
    });
  }

  /**
   * 获取商店中的所有条目。每个条目都是一个 `[key, value]` 数组
   *
   * @param {any} [customStore] 获取自定义商店的方法
   *
   * @example
   * entries().then((entries) => console.log(entries));
   *
   * @returns [[key1, key2], [value1, value2]]
   */
  function entries<KeyType extends IDBValidKey, ValueType = any>(
    customStore = defaultGetStore()
  ): Promise<[KeyType, ValueType][]> {
    return customStore("readonly", (store) => {
      // Fast path for modern browsers
      // (although, hopefully we'll get a simpler path some day)
      if (store.getAll && store.getAllKeys) {
        return Promise.all([
          promisifyRequest(store.getAllKeys() as unknown as IDBRequest<KeyType[]>),
          promisifyRequest(store.getAll() as IDBRequest<ValueType[]>),
        ]).then(([keys, values]) => keys.map((key, i) => [key, values[i]]));
      }

      const items: [KeyType, ValueType][] = [];

      return customStore("readonly", (store) =>
        eachCursor(store, (cursor) => items.push([cursor.key as KeyType, cursor.value])).then(() => items)
      );
    });
  }

  function eachCursor(store: IDBObjectStore, callback: (cursor: IDBCursorWithValue) => void): Promise<void> {
    store.openCursor().onsuccess = function() {
      if (!this.result) return;
      callback(this.result);
      this.result.continue();
    };

    return promisifyRequest(store.transaction);
  }

  function promisifyRequest<T = undefined>(request: IDBRequest<T> | IDBTransaction): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      if (request instanceof IDBTransaction) {
        request.oncomplete = () => resolve((request as any).result);
        request.onerror = () => reject(request.error);
      } else {
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      }
    });
  }

  function createStore(
    dbName: string,
    storeName: string
  ): UseStore {
    const request = indexedDB.open(dbName);
    request.onupgradeneeded = () => request.result.createObjectStore(storeName);
    const dbp = promisifyRequest(request);

    return (txMode, callback) =>
      dbp.then((db) => callback(db.transaction(storeName, txMode).objectStore(storeName)));
  }

  function defaultGetStore() {
    if (!defaultGetStoreFunc) {
      defaultGetStoreFunc = createStore("database", "common");
    }

    return defaultGetStoreFunc;
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
    defaultGetStore
  };
}
