import { useIdbStore } from "~/utils/idb";

if (process.client) {
  const idbStore = useIdbStore();
  idbStore.defaultGetStore();
}

export default {};
