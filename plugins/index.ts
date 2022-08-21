import airbnb from "./db";

if (process.client) {
  airbnb.airbnbDB.openStore({
    ...airbnb.languageObjectStore,
  }).then((res: any) => {
    console.log("初始化所有对象仓库", res);
  });
}

export default { };
