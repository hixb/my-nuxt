import { useIdbStore } from "~/utils/idb";

process.client && useIdbStore().defaultGetStore();

export default {};
