<script setup lang="ts">
import { useCommonStore } from "~/stores";
import { ref, watch } from "#imports";

const commonStores = useCommonStore();
const curSidebarShowStatus = ref<any>(true);

watch(commonStores, (newVal) => {
  if (newVal) {
    curSidebarShowStatus.value = newVal.isShowSidebar;
  }
}, { immediate: true });

/** 侧边栏切换 */
const sidebarToggle = () => {
  const sidebarStatus = commonStores.isShowSidebar;
  commonStores.setIsShowSidebar(!sidebarStatus);
};
</script>

<template>
  <aside>
    <div :class="['pc', {'zoom-sidebar': !curSidebarShowStatus}]">
      <div class="avatar">
        <div class="avatar-bg"></div>
      </div>
      <ul>
        <li>
          <nuxt-link to="/">
            <CommonSvgPic
              :is-open-hover="!curSidebarShowStatus"
              :border-radius="!curSidebarShowStatus ? 'semicircle' : 'round'"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M10.0693 2.81984L3.13929 8.36983C2.35929 8.98983 1.85929 10.2999 2.02929 11.2799L3.35929 19.2398C3.59929 20.6598 4.95928 21.8098 6.39928 21.8098H17.5993C19.0293 21.8098 20.3993 20.6498 20.6393 19.2398L21.9693 11.2799C22.1293 10.2999 21.6293 8.98983 20.8593 8.36983L13.9293 2.82985C12.8593 1.96985 11.1293 1.96984 10.0693 2.81984Z"
                  stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                />
                <path
                  class="set-svg-stroke"
                  d="M12 15.5C13.3807 15.5 14.5 14.3807 14.5 13C14.5 11.6193 13.3807 10.5 12 10.5C10.6193 10.5 9.5 11.6193 9.5 13C9.5 14.3807 10.6193 15.5 12 15.5Z"
                  stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                />
              </svg>
            </CommonSvgPic>
            <span>{{ $t('sidebar-home-text') }}</span>
            <p>{{ $t('sidebar-home-text') }}</p>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">
            <CommonSvgPic
              :is-open-hover="!curSidebarShowStatus"
              :border-radius="!curSidebarShowStatus ? 'semicircle' : 'round'"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9 22H15C20 22 22 20 22 15V9C22 4 20 2 15 2H9C4 2 2 4 2 9V15C2 20 4 22 9 22Z" stroke="#292D32"
                  stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                />
                <path
                  class="set-svg-stroke" d="M17.4984 17.0781H15.6484" stroke="#292D32" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"
                />
                <path
                  class="set-svg-stroke" d="M12.97 17.0781H6.5" stroke="#292D32" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"
                />
                <path
                  class="set-svg-stroke" d="M17.4987 13.3203H11.9688" stroke="#292D32" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"
                />
                <path
                  class="set-svg-stroke" d="M9.27 13.3203H6.5" stroke="#292D32" stroke-width="1.5"
                  stroke-linecap="round" stroke-linejoin="round"
                />
              </svg>
            </CommonSvgPic>
            <span>{{ $t('sidebar-article-text') }}</span>
            <p>{{ $t('sidebar-article-text') }}</p>
          </nuxt-link>
        </li>
        <li>
          <nuxt-link to="/">
            <CommonSvgPic
              :is-open-hover="!curSidebarShowStatus"
              :border-radius="!curSidebarShowStatus ? 'semicircle' : 'round'"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M9.15859 10.87C9.05859 10.86 8.93859 10.86 8.82859 10.87C6.44859 10.79 4.55859 8.84 4.55859 6.44C4.55859 3.99 6.53859 2 8.99859 2C11.4486 2 13.4386 3.99 13.4386 6.44C13.4286 8.84 11.5386 10.79 9.15859 10.87Z"
                  stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                />
                <path
                  class="set-svg-stroke"
                  d="M16.4112 4C18.3512 4 19.9112 5.57 19.9112 7.5C19.9112 9.39 18.4113 10.93 16.5413 11C16.4613 10.99 16.3713 10.99 16.2812 11"
                  stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                />
                <path
                  d="M4.15875 14.56C1.73875 16.18 1.73875 18.82 4.15875 20.43C6.90875 22.27 11.4188 22.27 14.1688 20.43C16.5888 18.81 16.5888 16.17 14.1688 14.56C11.4288 12.73 6.91875 12.73 4.15875 14.56Z"
                  stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                />
                <path
                  class="set-svg-stroke"
                  d="M18.3398 20C19.0598 19.85 19.7398 19.56 20.2998 19.13C21.8598 17.96 21.8598 16.03 20.2998 14.86C19.7498 14.44 19.0798 14.16 18.3698 14"
                  stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"
                />
              </svg>
            </CommonSvgPic>
            <span>{{ $t('sidebar-about-text') }}</span>
            <p>{{ $t('sidebar-about-text') }}</p>
          </nuxt-link>
        </li>
      </ul>
      <nav>
        <template v-if="curSidebarShowStatus">
          <div class="menu">
            <ul>
              <li>
                <nuxt-link to="/">{{ $t('sidebar-sitemap-text') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">{{ $t('sidebar-disclaimer-text') }}</nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">{{ $t('sidebar-privacy-text') }}</nuxt-link>
              </li>
            </ul>
          </div>
          <div class="link">
            <ul>
              <li>
                <nuxt-link to="/">
                  <CommonSvgPic>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        class="set-svg-stroke"
                        d="M14 9.29999V12.25H16.63C16.82 12.25 16.96 12.42 16.92 12.61L16.54 14.51C16.51 14.65 16.39 14.75 16.25 14.75H14V22H11V14.75H9.29999C9.12999 14.75 9 14.62 9 14.45V12.55C9 12.38 9.12999 12.25 9.29999 12.25H11V9C11 7.34 12.34 6 14 6H16.7C16.87 6 17 6.12999 17 6.29999V8.70001C17 8.87001 16.87 9 16.7 9H14.3C14.13 9 14 9.12999 14 9.29999Z"
                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                      />
                      <path
                        d="M15 22H9C4 22 2 20 2 15V9C2 4 4 2 9 2H15C20 2 22 4 22 9V15C22 20 20 22 15 22Z"
                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                      />
                    </svg>
                  </CommonSvgPic>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">
                  <CommonSvgPic>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        class="set-svg-stroke"
                        d="M16.1594 10C16.1594 10 16.0094 11 12.9094 15C9.99941 18.77 14.2095 21.64 14.7095 21.97C14.7395 21.99 14.7694 21.99 14.8094 21.97C15.4894 21.55 23.0594 16.68 16.1594 10Z"
                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        d="M13.7598 7.79006C13.7598 5.49006 12.8598 3.39006 11.9598 2.19006C11.6598 1.89006 11.1598 1.99006 11.0598 2.39006C10.6598 3.89006 9.45977 7.09006 6.55977 10.8901C2.85977 15.6901 6.25978 20.8901 9.75978 21.8901C11.6598 22.3901 9.25979 20.8901 8.95979 17.7901C8.65979 13.8901 13.7598 10.9901 13.7598 7.79006Z"
                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </CommonSvgPic>
                </nuxt-link>
              </li>
              <li>
                <nuxt-link to="/">
                  <CommonSvgPic>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path
                        d="M9 9.00155L8.98999 16.9315C8.98999 18.4515 7.35002 19.4215 6.02002 18.6815L3.51001 17.2916C3.19001 17.1116 3 16.7816 3 16.4216V7.60156C3 7.24156 3.20001 6.90157 3.51001 6.73156L11.51 2.29156C11.81 2.12156 12.18 2.12156 12.48 2.29156L20.48 6.73156C20.8 6.91157 20.99 7.24156 20.99 7.60156V16.4216C20.99 16.7816 20.79 17.1216 20.48 17.2916L12.48 21.7316C12.18 21.9016 11.81 21.9016 11.51 21.7316L10 21.0016"
                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                      <path
                        class="set-svg-stroke"
                        d="M17 10.75C17 9.78 16.22 9 15.25 9H13.5C12.53 9 11.75 9.78 11.75 10.75C11.75 11.72 12.53 12.5 13.5 12.5H15.25C16.22 12.5 17 13.28 17 14.25C17 15.22 16.22 16 15.25 16H13.5C12.53 16 11.75 15.22 11.75 14.25"
                        stroke="black" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>
                  </CommonSvgPic>
                </nuxt-link>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <CommonSvgPic @click="sidebarToggle">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                class="set-svg-stroke" d="M6 12H18" stroke="#292D32" stroke-width="1.5" stroke-linecap="round"
                stroke-linejoin="round"
              />
              <path d="M12 18V6" stroke="#292D32" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
          </CommonSvgPic>
        </template>
      </nav>
    </div>
  </aside>
</template>

<style scoped lang="scss">
@import "assets/css/components/common/sidebar.scss";
</style>
