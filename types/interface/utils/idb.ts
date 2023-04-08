/**
 * @file Interface - IDB
 */
export type UseStore =
  <T>(txMode: IDBTransactionMode, callback: (store: IDBObjectStore) => T | PromiseLike<T>) => Promise<T>

/**
 * 数据库表名枚举
 */
export enum DatabaseSurfaceEnum {
  /**
   * 语言
   */
  LANGUAGE = "language",
  /**
   * 主题
   */
  THEME = "theme"
}

/**
 * 数据库表名枚举值类型
 */
export type DatabaseSurfaceType = ValueOfEnum<typeof DatabaseSurfaceEnum>

/**
 * 主题常量
 */
export enum ThemeEnum {
  /**
   * 深色模式
   */
  DARK = "dark-mode",
  /**
   * 浅色模式
   */
  LIGHT = "light-mode"
}

/**
 * 主题类型
 */
export type ThemeType = ValueOfEnum<typeof ThemeEnum>

/**
 * 语言常量
 */
export enum LanguageEnum {
  /**
   * 中文
   */
  CN = "zh-CN",
  /**
   * 英文
   */
  EN = "en",
}

/**
 * 语言类型
 */
export type LanguageType = ValueOfEnum<typeof LanguageEnum>
