export default class DB {
  // 数据库名称
  private dbName: string;
  // 数据库对象
  private db: any;

  constructor(dbName: string) {
    this.dbName = dbName;
  }

  // 打开数据库
  public openStore(stores: any) {
    const request = window.indexedDB.open(this.dbName, 4);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => {
        this.db = event.target.result;

        resolve(true);
      };

      request.onerror = (event) => reject(event);

      request.onupgradeneeded = (event) => {
        const { result }: any = event.target;

        for (const storeName in stores) { // 初始化多个ojectStore对象仓库
          const { keyPath, indexs } = stores[storeName];

          if (!result.objectStoreNames.contains(storeName)) { // 没有表则新建表
            // keyPath：主键，主键（key）是默认建立索引的属性； autoIncrement：是否自增；createObjectStore会返回一个对象仓库objectStore(即新建一个表)
            const store = result.createObjectStore(storeName, { autoIncrement: true, keyPath });

            if (indexs && indexs.length) {
              // createIndex可以新建索引，unique字段是否唯一
              indexs.map((v: string) => store.createIndex(v, v, { unique: false }));
            }

            store.transaction.oncomplete = (e: any) => console.log(e);
          }
        }
      };
    });
  }

  // 新增/修改数据库数据
  updateItem(storeName: string, data: any) {
    const store = this.db.transaction([storeName], "readwrite").objectStore(storeName);

    const request = store.put({ ...data, updateTime: new Date().getTime() });

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => resolve(event);

      request.onerror = (event: any) => reject(event);
    });
  }

  // 删除数据库数据
  deleteItem(storeName: string, key: number | string) {
    const store = this.db.transaction([storeName], "readwrite").objectStore(storeName);

    const request = store.delete(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => resolve(event);

      request.onerror = (event: any) => reject(event);
    });
  }

  // 查询所有数据
  getList(storeName: string) {
    const store = this.db.transaction(storeName).objectStore(storeName);

    const request = store.getAll();

    return new Promise(resolve => request.onsuccess = (event: any) => resolve(event.target.result));
  }

  // 查询某一条数据
  getItem(storeName: string, key: number | string) {
    const store = this.db.transaction(storeName).objectStore(storeName);

    const request = store.get(key);

    return new Promise((resolve, reject) => {
      request.onsuccess = (event: any) => resolve(event.target.result);

      request.onerror = (event: any) => reject(event);
    });
  }
}
