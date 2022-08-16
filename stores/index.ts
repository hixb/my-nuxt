import { defineStore, acceptHMRUpdate } from "pinia";

export const useCommonStore = defineStore({
  id: "common",
  state: () => ({
    isShowSidebar: true,
    isShowMobileSidebar: false
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
    }
  }
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
