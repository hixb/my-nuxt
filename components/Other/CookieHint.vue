<script lang="ts" setup>
import { LocalStorageConst } from "~/types/interface/utils/local";

const localStore = useLocalStore();

const visible = ref<boolean>(false);

onMounted(() => {
  if (!localStore.get<boolean>(LocalStorageConst.COOKIE_POPUP)) {
    visible.value = true;
  }

  visible.value && setTimeout(() => agreeCookie(), 6000);
});

/**
 * 同意cookie
 */
function agreeCookie() {
  visible.value = false;
  localStore.set(LocalStorageConst.COOKIE_POPUP, false);
}
</script>

<template>
  <Transition name="slide-fade">
    <section
      v-if="visible"
      class="cookie-popup fixed bottom--600px left-40px right-auto top-auto z-10 max-w-400px b-rd-15px p20px"
    >
      <GeneralHeadText bold>{{ $t("cookiePopup.cookie-popup-title") }}</GeneralHeadText>
      <p class="text-14px lh-20px">{{ $t("cookiePopup.cookie-popup-content") }}</p>
      <div class="mt15px">
        <GeneralButton class="accept w264px" shape="semicircle" @click="agreeCookie">
          {{ $t("cookiePopup.cookie-popup-agree") }}
        </GeneralButton>
        <GeneralButton
          class="more-details"
          href="https://policies.google.com/technologies/cookies"
          shape="semicircle"
          type="ordinary"
        >
          {{ $t("cookiePopup.cookie-popup-more") }}
        </GeneralButton>
      </div>
    </section>
  </Transition>
</template>

<style lang="scss" scoped>
.cookie-popup {
  background: var(--my-theme-hint-bgc);
  backdrop-filter: blur(10px);
  box-shadow: 0 0 40px rgba(0, 0, 0, .1);
  animation: bottomToTop 2.5s forwards;
  animation-delay: 1s;

  * {
    color: var(--my-theme-color);
  }

  .accept {
    color: #fff;
    margin-right: 10px;
  }
}

@keyframes bottomToTop {
  100% {
    bottom: 40px;
  }
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 1.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from, .slide-fade-leave-to {
  transform: translateY(500px);
  opacity: 0;
  visibility: hidden;
}
</style>
