<script lang="ts" setup>
import { useLocal } from "~/composables/locale";
import { useCommonStore } from "~/stores";
import { onMounted, reactive, ref, watch } from "#imports";
import { fetchLanguageApi, saveLanguageApi } from "~/server/localApi/language";

interface ISidebarData {
  equipment: string;
  isShowSidebar: boolean;
}

type IMenuList = {
  equipment: string;
  list: {
    indent: string;
    icon: string[];
  }[];
}[]

type IThemeType = "dark-mode" | "light-mode";

const { setLocale, locale } = useLocal();
const commonStores = useCommonStore();
const sidebarData = reactive<ISidebarData>({
  equipment: "pc",
  isShowSidebar: false
});
const defaultThemeMode = ref<string>(commonStores.curTheme);
// 菜单列表
const menuList = reactive<IMenuList>([
  {
    equipment: "pc",
    list: [
      { indent: "collect", icon: ["archive/frame"] },
      { indent: "translate", icon: ["paragraph/translate"] },
      { indent: "theme", icon: ["weather/moon", "weather/sun"] }
    ]
  },
  {
    equipment: "mobile",
    list: [
      { indent: "search", icon: ["search/search"] },
      { indent: "collect", icon: ["archive/frame"] },
      { indent: "translate", icon: ["paragraph/translate"] },
      { indent: "theme", icon: ["weather/moon", "weather/sun"] }
    ]
  }
]);

onMounted(() => {
  getLocaleData();
  setRootMode();
});

watch(commonStores, newVal => {
  if (newVal) {
    sidebarData.equipment = newVal.sidebarData.equipment;
    sidebarData.isShowSidebar = newVal.sidebarData.isShowSidebar;
  }
}, { immediate: true });

/**
 * 设置主题
 */
const setThemeMode = () => {
  const curTheme: IThemeType = defaultThemeMode.value == "dark-mode" ? "light-mode" : "dark-mode";
  defaultThemeMode.value = curTheme;
  localStorage.setItem("theme", curTheme);
  setRootMode();
  commonStores.setTheme(curTheme);
};

/**
 * 设置根模式
 */
const setRootMode = () => {
  process.client && ((document.querySelector("body") as HTMLElement).className = defaultThemeMode.value);
};

/**
 * 设置侧边栏
 * @param equipment 设备
 */
const setSidebarToggle = (equipment: string) => {
  const sidebarStatus = commonStores.sidebarData.isShowSidebar;
  const obj: ISidebarData = {
    equipment,
    isShowSidebar: !sidebarStatus
  };
  sidebarData.equipment = obj.equipment;
  sidebarData.isShowSidebar = obj.isShowSidebar;
  commonStores.setSidebarData(obj);
};

/**
 * 获取语言
 */
const getLocaleData = () => {
  fetchLanguageApi().then(res => {
    if (res.code === 200) {
      if (res.result) {
        const { name } = res.result;
        setLocale(name);
      } else {
        setLocaleData(navigator.language == "zh" ? "zh-CN" : "en");
      }
    }
  });
};

/**
 * 设置首语言
 * @param language 语种
 */
const setLocaleData = (language: string) => {
  setLocale(language);
  saveLanguageApi(language);
};

/**
 * 相关操作
 * @param indent 标识
 */
const relatedOperations = (indent: string) => {
  switch (indent) {
    case "translate":
      setLocaleData(locale.value === "en" ? "zh-CN" : "en");
      break;
    case "theme":
      setThemeMode();
      break;
  }
};
</script>

<template>
  <header>
    <div v-for="item in menuList" :key="item.equipment" :class="item.equipment">
      <div class="head-l">
        <SvgIcon
          :icon="sidebarData.isShowSidebar ? 'essetional/line' : 'arrow/arrow-right'"
          @click="setSidebarToggle('pc')"
        />
        <h1>{{ $t("my-name") }}</h1>
      </div>
      <div class="head-r">
        <div v-if="item.equipment == 'pc'" class="area-search">
          <DataEntrySearch height="40px" width="360px" />
        </div>
        <div class="area-func">
          <SvgIcon
            v-for="list in item.list"
            :key="list.indent"
            :icon="list.indent == 'theme'
              ? defaultThemeMode == 'light-mode'
                ? list.icon[0]
                : list.icon[1]
              : list.icon[0]"
            @click="relatedOperations(list.indent)"
          />
        </div>
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import "assets/css/components/common/header.scss";
</style>
