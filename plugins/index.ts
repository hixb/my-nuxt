import { useIdbStore } from "~/utils/idb";

export default defineNuxtPlugin(() => {
  process.client && useIdbStore().defaultGetStore();
});
