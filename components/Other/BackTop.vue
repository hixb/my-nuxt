<script lang="ts" setup>
import { onMounted, ref } from "#imports";
import { scrollEaseOut } from "~/plugins/utils/common";

const rollAway = ref<number>(100);
const visible = ref<boolean>(false);
onMounted(() => {
  const pageHeight = document.body.scrollHeight || document.documentElement.scrollHeight;
  const windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
  const scrollAvail = pageHeight - windowHeight;
  window.onscroll = () => {
    handleScroll();
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    rollAway.value = +((scrollTop / scrollAvail) * 100) - 100;
  };
});
/**
 * 处理滚动
 */
const handleScroll = () => {
  let scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
  visible.value = scrollTop > 500;
};
</script>

<template>
  <section :class="['back-top', { visible: visible }]" @click="scrollEaseOut(0)">
    <svg viewBox="0 0 34 34">
      <circle class="b" cx="17" cy="17" r="15.92" />
      <circle :style="`stroke-dashoffset: ${rollAway};`" class="c scrollProgress" cx="17" cy="17" r="15.92" />
      <path class="line d" d="M15.07,21.06,19.16,17l-4.09-4.06" />
    </svg>
  </section>
</template>

<style lang="scss" scoped>
.back-top {
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
  right: 20px;
  bottom: 20px;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  cursor: pointer;
  visibility: hidden;
  opacity: 0;
  z-index: 5;
  transform: scale(0);
  transition: transform .3s ease, opacity .3s ease, visibility .3s ease, margin-bottom 1s ease;

  svg {
    transform: rotate(-90deg);
    stroke-width: 1.5;
    fill: #fffdfc;

    .b {
      fill: var(--my-theme-bg-color);
      stroke: var(--my-theme-scrollbar-bg);
      opacity: .9;
    }

    .c {
      fill: none;
      stroke: var(--my-theme-special-color);
      stroke-dasharray: 100 100;
      stroke-dashoffset: 100;
      stroke-linecap: round;
    }

    .d {
      fill: none !important;
      stroke: var(--my-theme-color);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1;
    }
  }
}

.visible {
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}
</style>
