import DB from "~/plugins/utils/indexedDB"; // 引入数据库和对象仓库

const airbnbDB = new DB("airbnb");

interface IResultOr {
  code: number,
  success: true,
  message: string,
  result: any
}

/**
 * 保存主题
 * @param lang
 */
export async function saveThemeApi(theme: any) {
  await airbnbDB.openStore(null);
  const resultOr: IResultOr = await airbnbDB.getItem("theme", 1).then((res: any) => {
    return {
      code: 200,
      message: "success",
      result: res || null,
      success: true
    };
  }).catch(err => {
    console.log(err);
  });

  const { success } = resultOr;
  const obj = success ? { name: theme, id: 1 } : { name: theme };
  const result: IResultOr = await airbnbDB.updateItem("theme", obj).then((res: any) => {
    return {
      code: 200,
      message: "success",
      result: null,
      success: true
    };
  });
  return result;
}

/**
 * 获取单当前主题
 */
export async function fetchThemeApi() {
  await airbnbDB.openStore(null);
  const result: IResultOr = await airbnbDB.getItem("theme", 1).then((res: any) => {
    return {
      code: 200,
      message: "success",
      result: res || null,
      success: true
    };
  });
  return result;
}
