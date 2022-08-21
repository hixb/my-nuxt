import DB from "../utils/indexedDB";
import languageObjectStore from "./objectStore/language";
import themeObjectStore from "~/plugins/db/objectStore/theme";

export const airbnbDB = new DB("airbnb");

export default {
  airbnbDB,
  languageObjectStore,
  themeObjectStore
};
