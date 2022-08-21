import TypeObjectStore from "../type"; // 引入类型别名

const webTheme: TypeObjectStore = {
  keyPath: "id",
  indexs: ["name"]
};

const themeObjectStore = {
  theme: webTheme
};

export default themeObjectStore;
