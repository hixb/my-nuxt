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
      <div class="content">
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

    .content {
      width: calc(100% - var(--my-nav-width));
      height: 1000px;
      padding-top: 30px;

      .inner {
        padding-left: 25px;
        padding-right: 25px;
        margin: 0 auto;
        max-width: 1280px;
      }
    }
  }
}

@media screen and (max-width: 896px) {
  .app {
    main {
      margin-top: 0;

      .content {
        width: calc(100vw - 30px);
        margin: 0 auto;
        padding-top: 95px;
      }
    }
  }
}
</style>
