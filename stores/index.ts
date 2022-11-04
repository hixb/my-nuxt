import { defineStore, acceptHMRUpdate } from "pinia";

interface ISidebarData {
  equipment: string
  isShowSidebar: boolean
}

export const useCommonStore = defineStore({
  id: "common",
  persist: true,
  state: () => ({
    sidebarData:<ISidebarData> {
      equipment: "pc",
      isShowSidebar: false
    },
    curTheme: "dark-mode"
  }),
  getters: {},
  actions: {
    /**
     * 设置侧边栏数据
     * @param val
     */
    setSidebarData(val: ISidebarData) {
      this.sidebarData = val;
    },

    /**
     * 设置主题
     * @param theme
     */
    setTheme(theme: string) {
      this.curTheme = theme;
      localStorage.setItem("theme", theme);
    }
  }
});

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCommonStore, import.meta.hot));
