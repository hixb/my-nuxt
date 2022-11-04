<script lang="ts" setup>
import { useCommonStore } from "~/stores";
import { onMounted, ref, watch } from "#imports";

const commonStores = useCommonStore();
const curSidebarShowStatus = ref<any>(true);
const isShowLoading = ref<boolean>(false);

watch(commonStores, (newVal) => {
  curSidebarShowStatus.value = newVal.isShowSidebar;
}, { immediate: true });

onMounted(() => {
  setTimeout(() => {
    closeLoading();
  }, 1000);
});

/**
 * 显示loading
 */
const showLoading = () => {
  isShowLoading.value = true;
};

/**
 * 关闭loading
 */
const closeLoading = () => {
  isShowLoading.value = false;
};

showLoading();
</script>

<template>
  <div class="app">
    <CommonHeader />
    <main>
      <CommonSidebar />
      <div :style="{ width: `calc(100vw${ curSidebarShowStatus ? ' - 14%' : ''})` }" class="coon">
        <div class="inner">
          <slot />
        </div>
      </div>
    </main>
    <Loading :visible="isShowLoading"></Loading>
  </div>
</template>

<style lang="scss" scoped>
.app {
  main {
    display: flex;

    .coon {
      position: relative;
      background-color: var(--my-theme-bg-color);
      padding-top: 30px;

      .inner {
        width: 1230px;
        height: calc(100vh - 105px);
        margin: 0 auto;
      }
    }
  }
}

@media screen and (max-width: 896px) {
  .app {
    main {
      .coon {
        width: calc(100vw - 5%) !important;
        margin: 0 auto;
      }
    }
  }
}
</style>
