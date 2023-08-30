<script setup lang="ts">
const { openAside } = useAside()
</script>

<template>
  <svg
    class="waves max-md:!w-[100vw]"
    preserveAspectRatio="none"
    shape-rendering="auto"
    viewBox="0 24 150 28"
    :style="openAside ? 'width: calc(100vw - 243px)' : 'width: calc(100vw - 85px)'"
  >
    <defs>
      <path id="wave-bg" d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z" />
    </defs>
    <g class="plx">
      <use x="48" xlink:href="#wave-bg" y="0" />
      <use x="48" xlink:href="#wave-bg" y="3" />
      <use x="48" xlink:href="#wave-bg" y="5" />
      <use x="48" xlink:href="#wave-bg" y="7" />
    </g>
  </svg>
</template>

<style scoped lang="scss">
.waves {
  position: absolute;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 60px;
  min-height: 100px;
  max-height: 150px;
  z-index: -1;

  * {
    fill: var(--my-waveB) !important;
    stroke: var(--my-waveB) !important;
  }

  .plx {
    > use {
      fill: var(--my-waveB);
      animation: waveMove 25s cubic-bezier(.55, .5, .45, .5) infinite;
    }

    > use:nth-child(1) {
      opacity: .7;
      animation-delay: -2s;
      animation-duration: 7s;
    }

    > use:nth-child(2) {
      opacity: .5;
      animation-delay: -3s;
      animation-duration: 10s;
    }

    > use:nth-child(3) {
      opacity: .3;
      animation-delay: -4s;
      animation-duration: 13s;
    }

    > use:nth-child(4) {
      opacity: .1;
      animation-delay: -5s;
      animation-duration: 20s;
    }
  }
}

@keyframes waveMove {
  0% {
    transform: translate3d(-90px, 0, 0);
  }

  100% {
    transform: translate3d(85px, 0, 0);
  }
}
</style>
