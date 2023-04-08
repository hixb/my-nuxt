/**
 * 本地存储的key
 */
export enum LocalStorageConst {
  /**
   * 使用cookie提示弹窗
   */
  COOKIE_POPUP = "cookie_popup",
}

/**
 * 获取本地存储的所有value值
 */
export type LocalStorageKey = ValueOfEnum<typeof LocalStorageConst>

/**
 * 存储方式
 */
export type StorageMethod = "local" | "session"
