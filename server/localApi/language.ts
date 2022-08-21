import DB from "~/plugins/utils/indexedDB"; // 引入数据库和对象仓库

const airbnbDB = new DB("airbnb");

interface IResultOr {
  code: number,
  success: true,
  message: string,
  result: any
}

/**
 * 保存国际化语言
 * @param lang
 */
export async function saveLanguageApi(lang: any) {
  await airbnbDB.openStore(null);
  const resultOr: IResultOr = await airbnbDB.getItem("language", 1).then((res: any) => {
    return {
      code: 200,
      message: "success",
      result: res || null,
      success: true
    };
  });

  const { success } = resultOr;
  const obj = success ? { name: lang, id: 1 } : { name: lang };
  const result: IResultOr = await airbnbDB.updateItem("language", obj).then((res: any) => {
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
 * 获取当前语言
 */
export async function fetchLanguageApi() {
  await airbnbDB.openStore(null);
  const result: IResultOr = await airbnbDB.getItem("language", 1).then((res: any) => {
    return {
      code: 200,
      message: "success",
      result: res || null,
      success: true
    };
  });
  return result;
}
