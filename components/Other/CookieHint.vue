<script lang="ts" setup>
import { ref } from "#imports";

const visible = ref<boolean>(true);
/**
 * 同意cookie
 */
const agreeCookie = () => {
  visible.value = false;
};
</script>

<template>
  <Transition name="slide-fade">
    <section v-if="visible" class="cookie-popup">
      <h4 class="title">{{ $t("cookie-popup-title") }}</h4>
      <p>{{ $t("cookie-popup-content") }}</p>
      <div class="btn-area">
        <GeneralButton customize-class="accept" shape="semicircle" @click="agreeCookie">
          {{ $t("cookie-popup-agree") }}
        </GeneralButton>
        <GeneralButton
          customize-class="more-details"
          href="https://policies.google.com/technologies/cookies"
          shape="semicircle"
          type="ordinary"
        >
          {{ $t("cookie-popup-more") }}
        </GeneralButton>
      </div>
    </section>
  </Transition>
</template>

<style lang="scss" scoped>
.cookie-popup {
  position: fixed;
  top: auto;
  left: 40px;
  right: auto;
  bottom: -600px;
  z-index: 10;
  padding: 20px;
  background: var(--my-theme-hint-bgc);
  backdrop-filter: blur(10px);
  border-radius: 15px;
  box-shadow: 0 0 40px rgba(0, 0, 0, .1);
  animation: bottomToTop 2.5s forwards;
  animation-delay: 1s;
  max-width: 400px;

  * {
    color: var(--my-theme-color);
  }

  > h4 {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;

    &:after {
      content: '';
      display: inline-block;
      vertical-align: middle;
      width: 25px;
      margin: 0 10px;
      border-bottom: 1px solid var(--my-theme-wire-color);
      opacity: .5;
    }
  }

  > p {
    font-size: 14px;
    line-height: 20px;
  }

  .btn-area {
    margin-top: 15px;

    .accept {
      width: 264px;
      color: #fff;
      margin-right: 10px;
    }
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
