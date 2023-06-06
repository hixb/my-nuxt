<script lang="ts" setup>
import { useLocal } from "~/composables/locale";
import { useCommonStore } from "~/stores";
import { themeVariety } from "~/plugins/highlight.client";
import { useWindowSize } from "@vueuse/core";
import { DatabaseSurfaceEnum, LanguageEnum, LanguageType, ThemeEnum, ThemeType } from "~/types/interface/utils/idb";
import { SidebarParams } from "~/types/interface/components/sidebar";
import { useIdbStore } from "~/utils/idb";

type IMenuList = {
  equipment: string;
  list: {
    indent: string;
    icon: string[];
  }[];
}[]

const { setLocale, locale } = useLocal();

const commonStores = useCommonStore();

const idbStore = useIdbStore();

const sidebarData = reactive<SidebarParams>({
  equipment: "pc",
  isShowSidebar: false
});

const defaultThemeMode = ref<ThemeType>(ThemeEnum.DARK);

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

const { width } = useWindowSize();

onMounted(async() => {
  getLocaleData();

  await idbStore.get(DatabaseSurfaceEnum.THEME).then(value => {
    if (value)
      defaultThemeMode.value = value;
  });

  setRootMode();
});

watch(commonStores, newVal => {
  if (newVal) {
    sidebarData.equipment = newVal.sidebarData.equipment;

    sidebarData.isShowSidebar = newVal.sidebarData.isShowSidebar;
  }
}, { immediate: true });

watch(width, (newVal) => {
  newVal && newVal <= 896 && sidebarData.isShowSidebar && setSidebarToggle("pc");
}, {
  immediate: true
});

/**
 * 设置主题
 */
function setThemeMode() {
  const curTheme: ThemeType = defaultThemeMode.value == ThemeEnum.DARK ? ThemeEnum.LIGHT : ThemeEnum.DARK;

  defaultThemeMode.value = curTheme;

  nextTick(() => themeVariety(curTheme));

  setRootMode();

  idbStore.set(DatabaseSurfaceEnum.THEME, curTheme);
}

/**
 * 设置根模式
 */
function setRootMode() {
  process.client && ((document.querySelector("body") as HTMLElement).className = defaultThemeMode.value);
}

/**
 * 设置侧边栏
 * @param equipment 设备
 */
function setSidebarToggle(equipment: SidebarParams["equipment"]) {
  const sidebarStatus = commonStores.sidebarData.isShowSidebar;
  const obj: SidebarParams = {
    equipment,
    isShowSidebar: !sidebarStatus
  };

  sidebarData.equipment = obj.equipment;
  sidebarData.isShowSidebar = obj.isShowSidebar;

  commonStores.setSidebarData(obj);
}

/**
 * 获取语言
 */
function getLocaleData() {
  idbStore.get(DatabaseSurfaceEnum.LANGUAGE).then(value => setLocale(value ? value : LanguageEnum.EN));
}

/**
 * 设置首语言
 * @param {LanguageType} language 语种
 */
function setLocaleData(language: LanguageType) {
  setLocale(language);

  idbStore.set(DatabaseSurfaceEnum.LANGUAGE, language);
}

/**
 * 相关操作
 * @param indent 标识
 */
function relatedOperations(indent: string) {
  switch (indent) {
    case "translate":
      setLocaleData(locale.value === "en" ? LanguageEnum.CN : LanguageEnum.EN);

      break;
    case "theme":
      setThemeMode();

      break;
  }
}
</script>

<template>
  <header class="fixed left-0 top-0 z-2 w100vw">
    <div v-for="item in menuList" :key="item.equipment" :class="item.equipment">
      <div class="head-l">
        <GlobalSvgIcon
          :icon="sidebarData.isShowSidebar ? 'essetional/line' : 'arrow/arrow-right'"
          @click="setSidebarToggle('pc')"
        />
        <h1>{{ $t("common.my-name") }}</h1>
      </div>
      <div class="head-r">
        <div v-if="item.equipment === 'pc'" class="area-search">
          <DataEntrySearch height="40px" width="360px" />
        </div>
        <div class="area-func">
          <GlobalSvgIcon
            v-for="list in item.list"
            :key="list.indent"
            :icon="list.indent === 'theme'
              ? defaultThemeMode === 'light-mode'
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
