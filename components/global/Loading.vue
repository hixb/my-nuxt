<script setup lang="ts">
withDefaults(defineProps<{
  visible: boolean
}>(), {
  visible: false
});
</script>

<template lang="pug">
Transition
  div.my-loading(v-show="visible")
    svg
      g
        path(d="M 50,100 A 1,1 0 0 1 50,0")
      g
        path(d="M 50,75 A 1,1 0 0 0 50,-25")
      defs
        linearGradient(id="gradient" x1="0%" y1="0%" x2="0%" y2="100%")
          stop(offset="0%" style="stop-color: #FF56A1; stop-opacity: 1;")
          stop(offset="100%" style="stop-color: #FF9350; stop-opacity: 1;")
</template>

<style scoped lang="scss">
$transition-duration: 2s;
$path-length: 157.5px;

.my-loading {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.2);
  backdrop-filter: saturate(180%) blur(10px);
  z-index: 100;

  svg {
    position: absolute;
    left: 50%;
    top: 50%;
    margin-left: -50px;
    margin-top: -50px;
    overflow: visible;
    width: 100px;
    height: 150px;

    g {
      animation: slide $transition-duration linear infinite;

      &:nth-child(2) {
        animation-delay: .5s;

        path {
          animation-delay: .5s;
          stroke-dasharray: 0 $path-length + 1;
          stroke-dashoffset: 1px;
        }
      }
    }

    path {
      stroke: url(#gradient) !important;
      stroke-width: 10px;
      stroke-linecap: round;
      fill: none;
      stroke-dasharray: 0 $path-length;
      stroke-dashoffset: 0;
      animation: escalade $transition-duration cubic-bezier(0.8, 0, 0.2, 1) infinite;
    }
  }
}

@keyframes slide {
  0% {
    transform: translateY(-50px);
  }
  100% {
    transform: translateY(50px);
  }
}

@keyframes escalade {
  0% {
    stroke-dasharray: 0 $path-length;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: $path-length $path-length;
    stroke-dashoffset: 0;
  }
  100% {
    stroke-dasharray: $path-length $path-length;
    stroke-dashoffset: -($path-length - 1);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
