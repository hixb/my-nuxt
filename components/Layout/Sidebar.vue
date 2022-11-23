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
const sidebarList = reactive([
  { router: "/", icon: "essetional/home", text: "sidebar-home-text" },
  { router: "/", icon: "audio/subtitle", text: "sidebar-article-text" },
  { router: "/", icon: "users/profile-2user", text: "sidebar-about-text" },
]);
const footerRule = reactive([
  { router: "/", text: "sidebar-sitemap-text" },
  { router: "/", text: "sidebar-disclaimer-text" },
  { router: "/", text: "sidebar-privacy-text" },
]);
const footerConnect = reactive([
  { router: "/", icon: "crypto-company/facebook" },
  { router: "/", icon: "crypto-company/huobi-token-(ht)" },
  { router: "/", icon: "crypto-company/js" },
]);

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
        <li v-for="item in sidebarList" :key="item.icon">
          <NuxtLink :to="item.router">
            <SvgIcon
              :border-radius="!sidebarData.isShowSidebar ? 'semicircle' : 'round'"
              :icon="item.icon"
              :is-open-hover="!sidebarData.isShowSidebar"
            />
            <span>{{ $t(item.text) }}</span>
            <p>{{ $t(item.text) }}</p>
          </NuxtLink>
        </li>
      </ul>
      <nav>
        <template v-if="sidebarData.isShowSidebar">
          <div class="menu">
            <ul>
              <li v-for="item in footerRule" :key="item.text">
                <NuxtLink :to="item.router">
                  {{ $t(item.text) }}
                </NuxtLink>
              </li>
            </ul>
          </div>
          <div class="link">
            <ul>
              <li v-for="item in footerConnect" :key="item.icon">
                <NuxtLink :to="item.router">
                  <SvgIcon
                    :border-radius="!sidebarData.isShowSidebar ? 'semicircle' : 'round'"
                    :icon="item.icon"
                    :is-open-hover="!sidebarData.isShowSidebar"
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
