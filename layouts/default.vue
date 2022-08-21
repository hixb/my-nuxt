<script setup lang="ts">
import { useTheme } from "~/composables";
import { useCommonStore } from "~/stores";
import { onMounted, ref, watch } from "#imports";

const commonStores = useCommonStore();
const { currentTheme } = useTheme();
const curSidebarShowStatus = ref<any>(true);
const isShowLoading = ref<boolean>(false);

watch(commonStores, (newVal) => {
  curSidebarShowStatus.value = newVal.isShowSidebar;
}, { immediate: true });

onMounted(() => {
  showLoading();
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
</script>

<template lang="pug">
div.app(:class="[currentTheme]")
  CommonHeader
  main
    CommonSidebar
    div.coon(:style="{width: `calc(100vw${ curSidebarShowStatus ? ' - 14%' : ''})`}")
      div.inner
        slot/
  GlobalLoading(v-model:visible="isShowLoading")
</template>

<style scoped lang="scss">
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
