import { acceptHMRUpdate, defineStore, StoreDefinition } from "pinia";
import { SidebarParams } from "~/types/interface/components/sidebar";

interface CommonActions {
  /**
   * 设置侧边栏数据
   * @param {SidebarParams} val
   */
  setSidebarData(val: SidebarParams): void;
}

/**
 * store定义类型
 */
type StoreDefinitionType = StoreDefinition<
  "common",
  {
    sidebarData: SidebarParams
  },
  CommonActions, any
>

export const useCommonStore = defineStore({
  id: "common",
  persist: true,
  state: () => ({
    sidebarData: <SidebarParams>{
      equipment: "pc",
      isShowSidebar: false
    }
  }),
  actions: {
    setSidebarData(val: SidebarParams) {
      this.sidebarData = val;
    }
  }
});

import.meta.hot && import.meta.hot.accept(acceptHMRUpdate(useCommonStore as StoreDefinitionType, import.meta.hot));
