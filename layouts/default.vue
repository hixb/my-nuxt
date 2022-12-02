<script lang="ts" setup>
import { useCommonStore } from "~/stores";
import { onDeactivated, onMounted, ref, watch } from "#imports";

const commonStores = useCommonStore();
const curSidebarShowStatus = ref<any>(true);
const isShowLoading = ref<boolean>(false);
const loadingAnimation = ref<boolean>(false);
const loadTimer = ref<any>(null);

watch(commonStores, (newVal) => {
  curSidebarShowStatus.value = newVal.isShowSidebar;
}, { immediate: true });

onMounted(() => {
  loadingAnimation.value = true;
  loadTimer.value = setTimeout(() => {
    // closeLoading();
  }, 1000);
});

onDeactivated(() => {
  clearInterval(loadTimer);
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
  <section class="app">
    <Transition>
      <div v-if="loadingAnimation">
        <LayoutHeader />
        <main>
          <LayoutSidebar />
          <div class="content">
            <div class="inner">
              <slot />
            </div>
          </div>
        </main>
      </div>
    </Transition>
    <FeedbackLoading :visible="isShowLoading" />
    <OtherBackTop />
    <OtherCookieHint />
  </section>
</template>

<style lang="scss" scoped>
.app {
  main {
    display: flex;
    margin-top: var(--my-header-height);

    .content {
      width: calc(100% - var(--my-nav-width));
      height: calc(100% - var(--my-header-height));
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

.v-enter-active,
.v-leave-active {
  transition: opacity 1.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
