<script lang="ts" setup>
import { useLocal } from "~/composables/locale";
import { useCommonStore } from "~/stores";
import { onMounted, reactive, ref, watch } from "#imports";
import { fetchLanguageApi, saveLanguageApi } from "~/server/localApi/language";

interface ISidebarData {
  equipment: string;
  isShowSidebar: boolean;
}

const { setLocale, locale } = useLocal();
const commonStores = useCommonStore();
const sidebarData = reactive<ISidebarData>({
  equipment: "pc",
  isShowSidebar: false
});
const defaultThemeMode = ref<string>(commonStores.curTheme);

onMounted(() => {
  getLocaleData();
  setRootMode();
});

watch(commonStores, (newVal) => {
  if (newVal) {
    sidebarData.equipment = newVal.sidebarData.equipment;
    sidebarData.isShowSidebar = newVal.sidebarData.isShowSidebar;
  }
}, { immediate: true });

/**
 * 设置主题
 */
const setThemeMode = () => {
  const curTheme = defaultThemeMode.value == "dark-mode" ? "light-mode" : "dark-mode";
  defaultThemeMode.value = curTheme;
  localStorage.setItem("theme", curTheme);
  setRootMode();
  commonStores.setTheme(curTheme);
};

/**
 * 设置根模式
 */
const setRootMode = () => {
  if (process.client) (document.querySelector("body") as any).className = defaultThemeMode.value;
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
  saveLanguageApi(language).then(res => {
    console.log();
  });
};
</script>

<template>
  <header>
    <div class="pc">
      <div class="head-l">
        <SvgIcon
          :icon="sidebarData.isShowSidebar ? 'essetional/line' : 'arrow/arrow-right'"
          @click="setSidebarToggle('pc')"
        />
        <h1>{{ $t("my-name") }}</h1>
      </div>
      <div class="head-r">
        <div class="area-search">
          <CommonSearch height="40px" width="360px" />
        </div>
        <div class="area-func">
          <SvgIcon icon="archive/frame" />
          <SvgIcon icon="paragraph/translate" @click="setLocaleData(locale === 'en' ? 'zh-CN' : 'en')" />
          <SvgIcon :icon="defaultThemeMode == 'light-mode' ? 'weather/moon' : 'weather/sun'" @click="setThemeMode" />
        </div>
      </div>
    </div>
    <div class="mobile">
      <div class="head-l">
        <SvgIcon
          :icon="sidebarData.isShowSidebar ? 'essetional/line' : 'arrow/arrow-right'"
          @click="setSidebarToggle('mobile')"
        />
      </div>
      <div class="head-r">
        <SvgIcon icon="search/search" />
        <SvgIcon icon="archive/frame" />
        <SvgIcon icon="paragraph/translate" @click="setLocaleData(locale === 'en' ? 'zh-CN' : 'en')" />
        <SvgIcon :icon="defaultThemeMode == 'light-mode' ? 'weather/moon' : 'weather/sun'" @click="setThemeMode" />
      </div>
    </div>
  </header>
</template>

<style lang="scss">
@import "assets/css/components/common/header.scss";
</style>
