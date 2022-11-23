<script lang="ts" setup>
import { useCommonStore } from "~/stores";
import { reactive, watch } from "#imports";

interface ISidebarData {
  equipment: string;
  isShowSidebar: boolean;
}

const commonStores = useCommonStore();
const sidebarData = reactive<ISidebarData>({
  equipment: "pc",
  isShowSidebar: false
});

watch(commonStores, (newVal) => {
  if (newVal) {
    sidebarData.equipment = newVal.sidebarData.equipment;
    sidebarData.isShowSidebar = newVal.sidebarData.isShowSidebar;
  }
}, { immediate: true });

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
</script>

<template>
  <aside :style="{ width: sidebarData.isShowSidebar ? '14%' : ''}" class="pc-aside">
    <div :class="[{'zoom-sidebar': !sidebarData.isShowSidebar}]" class="pc">
      <div class="avatar">
        <div class="avatar-bg"></div>
      </div>
      <ul>
        <li>
          <NuxtLink to="/">
            <SvgIcon
              :border-radius="!sidebarData.isShowSidebar ? 'semicircle' : 'round'"
              :is-open-hover="!sidebarData.isShowSidebar"
              icon="essetional/home"
            />
            <span>{{ $t("sidebar-home-text") }}</span>
            <p>{{ $t("sidebar-home-text") }}</p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            <SvgIcon
              :border-radius="!sidebarData.isShowSidebar ? 'semicircle' : 'round'"
              :is-open-hover="!sidebarData.isShowSidebar"
              icon="audio/subtitle"
            />
            <span>{{ $t("sidebar-article-text") }}</span>
            <p>{{ $t("sidebar-article-text") }}</p>
          </NuxtLink>
        </li>
        <li>
          <NuxtLink to="/">
            <SvgIcon
              :border-radius="!sidebarData.isShowSidebar ? 'semicircle' : 'round'"
              :is-open-hover="!sidebarData.isShowSidebar"
              icon="users/profile-2user"
            />
            <span>{{ $t("sidebar-about-text") }}</span>
            <p>{{ $t("sidebar-about-text") }}</p>
          </NuxtLink>
        </li>
      </ul>
      <nav>
        <template v-if="sidebarData.isShowSidebar">
          <div class="menu">
            <ul>
              <li>
                <NuxtLink to="/">
                  {{ $t("sidebar-sitemap-text") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">
                  {{ $t("sidebar-disclaimer-text") }}
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">
                  {{ $t("sidebar-privacy-text") }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="link">
            <ul>
              <li>
                <NuxtLink to="/">
                  <SvgIcon
                    :border-radius="!sidebarData.isShowSidebar ? 'semicircle' : 'round'"
                    :is-open-hover="!sidebarData.isShowSidebar"
                    icon="crypto-company/facebook"
                  />
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">
                  <SvgIcon
                    :border-radius="!sidebarData.isShowSidebar ? 'semicircle' : 'round'"
                    :is-open-hover="!sidebarData.isShowSidebar"
                    icon="crypto-company/huobi-token-(ht)"
                  />
                </NuxtLink>
              </li>
              <li>
                <NuxtLink to="/">
                  <SvgIcon
                    :border-radius="!sidebarData.isShowSidebar ? 'semicircle' : 'round'"
                    :is-open-hover="!sidebarData.isShowSidebar"
                    icon="crypto-company/js"
                  />
                </NuxtLink>
              </li>
            </ul>
          </div>
        </template>
        <template v-else>
          <SvgIcon icon="essetional/add" @click="setSidebarToggle" />
        </template>
      </nav>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
@import "assets/css/components/common/sidebar.scss";
</style>
