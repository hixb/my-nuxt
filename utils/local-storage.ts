import { LocalStorageKey, StorageMethod } from "~/types/interface/utils/local";

/**
 * 使用本地存储
 */
export function useLocalStore(sessionOrLocal: StorageMethod = "local") {
  /**
   * 获取本地存储
   * @param {LocalStorageConst} key 本地存储的key
   */
  function get<T extends(string | number | boolean | object | null)>(key: LocalStorageKey): T {
    const value = useStoreMode().getItem(key);

    const types = ["string", "number", "object", "boolean", "null"];
    const values = ["", 0, {}, false, null];
    let result: T = null as T;

    if (!value) {
      for (let i = 0; i < types.length; i++) {
        if (typeof key === types[i]) {
          result = values[i] as T;
          break;
        }
      }

      return result;
    }

    return (["{", "}", "[", "]"].find(item => value.includes(item))
        ? JSON.parse(value)
        : isNaN(Number(value)) ? value : Number(value)
    ) as T;
  }

  /**
   * 设置本地存储
   * @param {LocalStorageKey} key 本地存储的key
   * @param value 本地存储的value
   */
  function set(key: LocalStorageKey, value: string | number | boolean | object): void {
    useStoreMode().setItem(key, typeof value === "string" ? value : JSON.stringify(value));
  }

  /**
   * 移除本地存储
   * @param key 本地存储的key
   */
  function del(key: LocalStorageKey): void {
    get(key) && useStoreMode().removeItem(key);
  }

  /**
   * 移除所有存储
   */
  function delAll(): void {
    useStoreMode().clear();
  }

  /**
   * 使用存储的模式
   * @private
   */
  function useStoreMode(): Storage {
    return sessionOrLocal === "local" ? window.localStorage : window.sessionStorage;
  }

  return {
    get,
    set,
    del,
    delAll
  };
}
