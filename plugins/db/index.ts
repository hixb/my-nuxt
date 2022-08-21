import DB from "../utils/indexedDB";
import languageObjectStore from "./objectStore/language";

export const airbnbDB = new DB("airbnb");

export default {
  airbnbDB,
  languageObjectStore
};
