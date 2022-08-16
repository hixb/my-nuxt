<script setup lang="ts">
import { useTheme } from "~/composables";
import { useLocal } from "~/composables/locale";
import { useCommonStore } from "~/stores";
import { onMounted, reactive, watch } from "#imports";

interface ISidebarData {
  equipment: string
  isShowSidebar: boolean
}

const { currentTheme, setTheme } = useTheme();
const { setLocale, locale } = useLocal();
const commonStores = useCommonStore();

const sidebarData = reactive<ISidebarData>({
  equipment: "pc",
  isShowSidebar: false
});

onMounted(() => {
  setThemeMode();
});

watch(commonStores, (newVal) => {
  if (newVal) {
    sidebarData.equipment = newVal.sidebarData.equipment;
    sidebarData.isShowSidebar = newVal.sidebarData.isShowSidebar;
  }
}, { immediate: true });

/** 设置主题 */
const setThemeMode = () => {
  setTheme(currentTheme.value == "light-mode" ? "dark-mode" : "light-mode");
  (document.querySelector("body") as any).className = currentTheme.value;
};

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
</script>

<template lang="pug">
header
  div.pc
    div.head-l
      CommonSvgPic(@click="setSidebarToggle('pc')")
        template(v-if="sidebarData.isShowSidebar")
          svg(viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
            path(d="M 3 18 H 14 M 10 6 H 21" stroke="#292D32")
            line.set-svg-stroke(x1="3" x2="21" y1="12" y2="12" stroke="#292D32")
        template(v-else)
          svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
            path(d="M8.91016 19.9181L15.4302 13.3981C16.2002 12.6281 16.2002 11.3681 15.4302 10.5981L8.91016 4.07812"
              stroke="#292D32" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
              stroke-linejoin="round")
      h1 {{ $t('my-name') }}
    div.head-r
      div.area-search
        CommonSearch(width="360px" height="40px")
      div.area-func
        CommonSvgPic
          svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
            path.set-svg-stroke(d="M9.25 9.05078C11.03 9.70078 12.97 9.70078 14.75 9.05078" stroke="#292D32"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
            path(d="M16.8203 2H7.18031C5.05031 2 3.32031 3.74 3.32031 5.86V19.95C3.32031 21.75 4.61031 22.51 6.19031 21.64L11.0703 18.93C11.5903 18.64 12.4303 18.64 12.9403 18.93L17.8203 21.64C19.4003 22.52 20.6903 21.76 20.6903 19.95V5.86C20.6803 3.74 18.9503 2 16.8203 2Z"
              stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
            path(d="M16.8203 2H7.18031C5.05031 2 3.32031 3.74 3.32031 5.86V19.95C3.32031 21.75 4.61031 22.51 6.19031 21.64L11.0703 18.93C11.5903 18.64 12.4303 18.64 12.9403 18.93L17.8203 21.64C19.4003 22.52 20.6903 21.76 20.6903 19.95V5.86C20.6803 3.74 18.9503 2 16.8203 2Z"
              stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
        CommonSvgPic(@click="setLocale(locale === 'en' ? 'zh-CN' : 'en')")
          svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
            path(d="M19.0612 18.6684L16.9212 14.3984L14.7812 18.6684" stroke="#292D32" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round")
            path(d="M15.1719 17.9102H18.6919" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round")
            path(d="M16.9198 21.9998C14.1198 21.9998 11.8398 19.7298 11.8398 16.9198C11.8398 14.1198 14.1098 11.8398 16.9198 11.8398C19.7198 11.8398 21.9998 14.1098 21.9998 16.9198C21.9998 19.7298 19.7298 21.9998 16.9198 21.9998Z"
              stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
            path(d="M5.02 2H8.94C11.01 2 12.01 3.00002 11.96 5.02002V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z"
              stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
            path(d="M9.01312 5.85156H4.95312" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round")
            path(d="M6.97266 5.17188V5.85187" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
              stroke-linejoin="round")
            path(d="M7.99141 5.84375C7.99141 7.59375 6.62141 9.01373 4.94141 9.01373" stroke="#292D32"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
            path(d="M7.99141 5.84375C7.99141 7.59375 6.62141 9.01373 4.94141 9.01373" stroke="#292D32"
              stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
            path(d="M9.01015 9.01001C8.28015 9.01001 7.62016 8.62 7.16016 8" stroke="#292D32" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round")
            path.set-svg-stroke(d="M2 15C2 18.87 5.13 22 9 22L7.95 20.25" stroke="#292D32" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round")
            path.set-svg-stroke(d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75" stroke="#292D32" stroke-width="1.5"
              stroke-linecap="round" stroke-linejoin="round")
        CommonSvgPic(@click="setThemeMode")
          svg(v-show="currentTheme == 'light-mode'" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg")
            path(d="M2.03107 12.4209C2.39107 17.5709 6.76107 21.7609 11.9911 21.9909C15.6811 22.1509 18.9811 20.4309 20.9611 17.7209C21.7811 16.6109 21.3411 15.8709 19.9711 16.1209C19.3011 16.2409 18.6111 16.2909 17.8911 16.2609C13.0011 16.0609 9.00107 11.9709 8.98107 7.14094C8.97107 5.84094 9.24107 4.61094 9.73107 3.49094C10.2711 2.25094 9.62107 1.66094 8.37107 2.19094C4.41107 3.86094 1.70107 7.85094 2.03107 12.4209Z"
              stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
          svg(v-show="currentTheme == 'dark-mode'" width="24" height="24" viewBox="0 0 24 24" fill="none"
            xmlns="http://www.w3.org/2000/svg")
            path(d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"
              stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
            path.set-svg-stroke(d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z"
              stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round")
  div.mobile
    div.head-l
      CommonSvgPic(@click="setSidebarToggle('mobile')")
        svg(iewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
          path(d="M 3 18 H 14 M 10 6 H 21" stroke="#292D32")
          line.set-svg-stroke(x1="3" x2="21" y1="12" y2="12" stroke="#292D32")
      h1 {{ $t('my-name') }}
    div.head-r
      CommonSvgPic
        svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
          path(d="M11.5 21C16.7467 21 21 16.7467 21 11.5C21 6.25329 16.7467 2 11.5 2C6.25329 2 2 6.25329 2 11.5C2 16.7467 6.25329 21 11.5 21Z"
            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
          path.set-svg-stroke(d="M22 22L20 20" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round")
      CommonSvgPic
        svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
          path.set-svg-stroke(d="M9.25 9.05078C11.03 9.70078 12.97 9.70078 14.75 9.05078" stroke="#292D32"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
          path(d="M16.8203 2H7.18031C5.05031 2 3.32031 3.74 3.32031 5.86V19.95C3.32031 21.75 4.61031 22.51 6.19031 21.64L11.0703 18.93C11.5903 18.64 12.4303 18.64 12.9403 18.93L17.8203 21.64C19.4003 22.52 20.6903 21.76 20.6903 19.95V5.86C20.6803 3.74 18.9503 2 16.8203 2Z"
            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
          path(d="M16.8203 2H7.18031C5.05031 2 3.32031 3.74 3.32031 5.86V19.95C3.32031 21.75 4.61031 22.51 6.19031 21.64L11.0703 18.93C11.5903 18.64 12.4303 18.64 12.9403 18.93L17.8203 21.64C19.4003 22.52 20.6903 21.76 20.6903 19.95V5.86C20.6803 3.74 18.9503 2 16.8203 2Z"
            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
      CommonSvgPic(@click="setLocale(locale === 'en' ? 'zh-CN' : 'en')")
        svg(width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg")
          path(d="M19.0612 18.6684L16.9212 14.3984L14.7812 18.6684" stroke="#292D32" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round")
          path(d="M15.1719 17.9102H18.6919" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round")
          path(d="M16.9198 21.9998C14.1198 21.9998 11.8398 19.7298 11.8398 16.9198C11.8398 14.1198 14.1098 11.8398 16.9198 11.8398C19.7198 11.8398 21.9998 14.1098 21.9998 16.9198C21.9998 19.7298 19.7298 21.9998 16.9198 21.9998Z"
            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
          path(d="M5.02 2H8.94C11.01 2 12.01 3.00002 11.96 5.02002V8.94C12.01 11.01 11.01 12.01 8.94 11.96H5.02C3 12 2 11 2 8.92999V5.01001C2 3.00001 3 2 5.02 2Z"
            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
          path(d="M9.01312 5.85156H4.95312" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round")
          path(d="M6.97266 5.17188V5.85187" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
            stroke-linejoin="round")
          path(d="M7.99141 5.84375C7.99141 7.59375 6.62141 9.01373 4.94141 9.01373" stroke="#292D32"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
          path(d="M7.99141 5.84375C7.99141 7.59375 6.62141 9.01373 4.94141 9.01373" stroke="#292D32"
            stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
          path(d="M9.01015 9.01001C8.28015 9.01001 7.62016 8.62 7.16016 8" stroke="#292D32" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round")
          path.set-svg-stroke(d="M2 15C2 18.87 5.13 22 9 22L7.95 20.25" stroke="#292D32" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round")
          path.set-svg-stroke(d="M22 9C22 5.13 18.87 2 15 2L16.05 3.75" stroke="#292D32" stroke-width="1.5"
            stroke-linecap="round" stroke-linejoin="round")
      CommonSvgPic(@click="setThemeMode")
        svg(v-show="currentTheme == 'light-mode'" width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg")
          path(d="M2.03107 12.4209C2.39107 17.5709 6.76107 21.7609 11.9911 21.9909C15.6811 22.1509 18.9811 20.4309 20.9611 17.7209C21.7811 16.6109 21.3411 15.8709 19.9711 16.1209C19.3011 16.2409 18.6111 16.2909 17.8911 16.2609C13.0011 16.0609 9.00107 11.9709 8.98107 7.14094C8.97107 5.84094 9.24107 4.61094 9.73107 3.49094C10.2711 2.25094 9.62107 1.66094 8.37107 2.19094C4.41107 3.86094 1.70107 7.85094 2.03107 12.4209Z"
            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
        svg(v-show="currentTheme == 'dark-mode'" width="24" height="24" viewBox="0 0 24 24" fill="none"
          xmlns="http://www.w3.org/2000/svg")
          path(d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"
            stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round")
          path.set-svg-stroke(d="M19.14 19.14L19.01 19.01M19.01 4.99L19.14 4.86L19.01 4.99ZM4.86 19.14L4.99 19.01L4.86 19.14ZM12 2.08V2V2.08ZM12 22V21.92V22ZM2.08 12H2H2.08ZM22 12H21.92H22ZM4.99 4.99L4.86 4.86L4.99 4.99Z"
            stroke="#292D32" stroke-width="2" stroke-linecap="round" stroke-linejoin="round")
</template>

<style lang="scss">
@import "assets/css/components/common/header.scss";
</style>
