import { defineStore, acceptHMRUpdate } from "pinia";

interface ISidebarData {
  equipment: string
  isShowSidebar: boolean
}

export const useCommonStore = defineStore({
  id: "common",
  state: () => ({
    isShowSidebar: true,
    isShowMobileSidebar: false,
    sidebarData:<ISidebarData> {
      equipment: "pc",
      isShowSidebar: false
    }
  }),
  getters: {},
  actions: {
    /**
     * 设置是否显示侧边栏
     * @param {boolean} show
     */
    setIsShowSidebar(show: boolean) {
      this.isShowSidebar = show;
    },

    /**
     * 设置是否显示移动端侧边栏
     * @param show
     */
    setIsShowMobile(show: boolean) {
      this.isShowMobileSidebar = show;
    },

    /**
     * 设置侧边栏数据
     * @param val
     */
    setSidebarData(val: ISidebarData) {
      this.sidebarData = val;
    }
  }
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
