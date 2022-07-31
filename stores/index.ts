import { defineStore, acceptHMRUpdate } from "pinia";

export const useCommonStore = defineStore({
  id: "common",
  state: () => ({
    isShowSidebar: true,
  }),
  getters: {},
  actions: {
    /**
     * 设置是否显示侧边栏
     * @param {boolean} show
     */
    setIsShowSidebar(show: boolean) {
      this.isShowSidebar = show;
    }
  }
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
