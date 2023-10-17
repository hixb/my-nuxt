/**
 * Link association
 */
type Relation =
  'alternate'
  | 'author'
  | 'bookmark'
  | 'canonical'
  | 'dns-prefetch'
  | 'external'
  | 'help'
  | 'icon'
  | 'import'
  | 'license'
  | 'manifest'
  | 'modulepreload'
  | 'next'
  | 'nofollow'
  | 'noopener'
  | 'noreferrer'
  | 'opener'
  | 'pingback'
  | 'preconnect'
  | 'prefetch'
  | 'preload'
  | 'prerender'
  | 'prev'
  | 'search'
  | 'shortlink'
  | 'stylesheet'
  | 'tag'

/**
 * Sidebar switching parameters 0-switch 1-open 2-close
 */
type AsideAlways = 0 | 1 | 2

/**
 * Target
 */
type Target = '_blank' | '_self' | 'target' | '_parent' | '_top'

// local storage namespace.
namespace LocalStorage {
  /**
   * Local storage key constants
   */
  enum LocalStorageEnum {
  }

  /**
   * Local storage key type
   */
  type LocalStorageKeyType = typeof LocalStorageEnum[keyof typeof LocalStorageEnum]
}

// pay system namespace.
namespace PaySystem {
  /**
   * Pay status constants.
   */
  enum PayStatusConst {
    /**
     * Initialization.
     */
    INIT,
    /**
     * The QR code has been scanned and payment is in progress.
     */
    WAIT,
    /**
     * Payment successful.
     */
    SUCCESS,
    /**
     * Payment failed.
     */
    ERROR,
    /**
     * QR code expired.
     */
    MATURITY,
    /**
     * QR code generation failed.
     */
    CREATE_FAIL,
  }
}

// IndexedDB namespace.
namespace IndexedBDSpace {
  /**
   * IndexedBD constants.
   */
  enum BDEnum {
    JOIN_TO_READ = 'join_to_read',
  }

  /**
   * IndexedDB store type.
   */
  type IDBStore = <T>(txMode: IDBTransactionMode, callback: (store: IDBObjectStore) => T | PromiseLike<T>) => Promise<T>

  /**
   * IDB valid key types.
   */
  type IDBValidKeyType = IDBValidKey & typeof BDEnum[keyof typeof BDEnum]
}
