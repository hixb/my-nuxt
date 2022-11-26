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
    // closeLoading();
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

// showLoading();
</script>

<template>
  <div class="app">
    <LayoutHeader />
    <main>
      <LayoutSidebar />
      <div class="coon">
        <div class="inner">
          <slot />
        </div>
      </div>
    </main>
    <FeedbackLoading :visible="isShowLoading"></FeedbackLoading>
    <OtherBackTop></OtherBackTop>
  </div>
</template>

<style lang="scss" scoped>
.app {
  main {
    display: flex;

    .coon {
      width: 100%;
      position: relative;
      background-color: var(--my-theme-bg-color);
      padding-top: 30px;

      .inner {
        width: 1230px;
        min-height: calc(100vh - var(--my-header-height));
        margin: 0 auto;
        margin-top: var(--my-header-height);
        padding-top: 30px;
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
