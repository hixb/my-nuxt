import TypeObjectStore from "../type"; // 引入类型别名

const webLang: TypeObjectStore = {
  keyPath: "id",
  indexs: ["name"]
};

const languageObjectStore = {
  language: webLang
};

export default languageObjectStore;
