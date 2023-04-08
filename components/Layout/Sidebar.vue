<script lang="ts" setup>
import { useCommonStore } from "~/stores";
import { reactive, watch } from "#imports";
import { SidebarParams } from "~/types/interface/components/sidebar";

const commonStores = useCommonStore();

const sidebarData = reactive<SidebarParams>({
  equipment: "pc",
  isShowSidebar: false
});

const sidebarList = reactive([
  { router: "/", icon: "essetional/home", text: "sidebar.sidebar-home-text" },
  { router: "/", icon: "audio/subtitle", text: "sidebar.sidebar-article-text" },
  { router: "/", icon: "users/profile-2user", text: "sidebar.sidebar-about-text" },
]);

const footerRule = reactive([
  { router: "/", text: "sidebar.sidebar-sitemap-text" },
  { router: "/", text: "sidebar.sidebar-disclaimer-text" },
  { router: "/", text: "sidebar.sidebar-privacy-text" },
]);

const footerConnect = reactive([
  { router: "/", icon: "crypto-company/facebook" },
  { router: "/", icon: "crypto-company/huobi-token-(ht)" },
  { router: "/", icon: "crypto-company/js" },
]);

watch(() => commonStores.sidebarData, newVal => {
  if (newVal) {
    sidebarData.equipment = newVal.equipment;

    sidebarData.isShowSidebar = newVal.isShowSidebar;
  }
}, {
  immediate: true
});

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
</script>

<template>
  <aside>
    <div :class="['pc-aside', sidebarData.isShowSidebar ? 'pc-aside-active' : 'pc-aside-no-active']">
      <div :class="['pc', {'zoom-sidebar': !sidebarData.isShowSidebar}]">
        <div class="avatar">
          <div class="avatar-bg" />
        </div>
        <ul>
          <li v-for="item in sidebarList" :key="item.icon">
            <NuxtLink :to="item.router">
              <GlobalSvgIcon
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
            <section class="menu">
              <ul>
                <li v-for="item in footerRule" :key="item.text">
                  <NuxtLink :to="item.router">
                    {{ $t(item.text) }}
                  </NuxtLink>
                </li>
              </ul>
            </section>
            <div class="link">
              <ul>
                <li v-for="item in footerConnect" :key="item.icon">
                  <NuxtLink :to="item.router">
                    <GlobalSvgIcon
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
            <GlobalSvgIcon icon="essetional/add" @click="setSidebarToggle" />
          </template>
        </nav>
      </div>
    </div>
    <Transition name="slide-fade">
      <div v-if="sidebarData.isShowSidebar" class="mobile-aside">
        <div :class="['mobile']">
          <div class="mask" @click="setSidebarToggle" />
          <div class="aside-list">
            <div class="title">
              <GlobalSvgIcon icon="essetional/close-square" @click="setSidebarToggle" />
            </div>
            <ul class="each-list">
              <li v-for="item in sidebarList" :key="item.icon">
                <NuxtLink :to="item.router">
                  <GlobalSvgIcon
                    :border-radius="!sidebarData.isShowSidebar ? 'semicircle' : 'round'"
                    :icon="item.icon"
                    :is-open-hover="!sidebarData.isShowSidebar"
                  />
                  <span>{{ $t(item.text) }}</span>
                </NuxtLink>
              </li>
            </ul>
            <nav>
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
                      <GlobalSvgIcon
                        :border-radius="!sidebarData.isShowSidebar ? 'semicircle' : 'round'"
                        :icon="item.icon"
                        :is-open-hover="!sidebarData.isShowSidebar"
                      />
                    </NuxtLink>
                  </li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </Transition>
  </aside>
</template>

<style lang="scss" scoped>
@import "assets/css/components/common/sidebar.scss";
</style>
