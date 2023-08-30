<script setup lang="ts">
import { scrollEaseOut } from '~/utils/feat'

const rollAway = ref<number>(0)
const visible = ref<boolean>(false)

onMounted(() => {
  handleScroll()

  window.onscroll = () => {
    const pageHeight: number = document.body.scrollHeight || document.documentElement.scrollHeight
    const windowHeight: number = document.documentElement.clientHeight || document.body.clientHeight

    handleScroll()

    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
    const dashoffsetVal = -((scrollTop / (pageHeight - windowHeight)) * 100) + 100

    rollAway.value = dashoffsetVal < 0 ? 0 : dashoffsetVal > 100 ? 100 : dashoffsetVal
  }
})

/**
 * 处理滚动
 */
function handleScroll() {
  const scrollTop: number = document.documentElement.scrollTop || document.body.scrollTop
  visible.value = scrollTop > 500
}
</script>

<template>
  <section
    class="back-top flex items-center justify-center fixed right-5 bottom-5 w-11 h-11 rounded-full cursor-pointer invisible opacity-0 z-10 max-md:bottom-20"
    :class="[
      { visible },
    ]"
    @click="scrollEaseOut(0)"
  >
    <svg viewBox="0 0 34 34">
      <circle class="b op90" cx="17" cy="17" r="15.92" />
      <circle
        :style="{ strokeDashoffset: rollAway }" class="c scrollProgress fill-none stroke-cap-round" cx="17"
        cy="17" r="15.92"
      />
      <path class="line d" d="M15.07,21.06,19.16,17l-4.09-4.06" />
    </svg>
  </section>
</template>

<style scoped lang="scss">
.back-top {
  transform: scale(0);
  transition: transform .3s ease, opacity .3s ease, visibility .3s ease, margin-bottom 1s ease, bottom 1s ease;

  svg {
    transform: rotate(-90deg);
    stroke-width: 1.5;
    fill: #fffdfc;
    transition: var(--my-theme-trans2);

    .b {
      fill: var(--my-fill-color);
      stroke: var(--my-str-color);
    }

    .c {
      stroke: var(--my-special-color);
      stroke-dasharray: 100 100;
      stroke-dashoffset: 100;
      transition: var(--my-theme-trans2);
    }

    .d {
      fill: none !important;
      stroke: var(--my-text-base-color);
      stroke-linecap: round;
      stroke-linejoin: round;
      stroke-width: 1;
    }
  }

  &:hover {
    svg {
      opacity: .8;
      transition: var(--my-theme-trans2);
    }
  }
}

.visible {
  visibility: visible;
  opacity: 1;
  transform: scale(1);
}
</style>
