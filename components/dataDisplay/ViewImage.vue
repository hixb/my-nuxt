<script setup lang="ts">
withDefaults(defineProps<{
  show: boolean
  src?: string
}>(), {
  show: false,
  src: 'https://4.bp.blogspot.com/-vFEJV8v5Bms/X1WnI01Q71I/AAAAAAAAP5w/do4OYrEPQBAcceIkM2sq9fcQbnhca9nOQCNcBGAsYHQ/s0/travel-boating-experience.jpg',
})

const emit = defineEmits<{
  (evt: 'update:show', value: boolean): void
}>()

const CLOSE_BUTTON_SIZE = 35

const isMousedown = ref(false)

const useImageRef = ref<HTMLImageElement | null>(null)
const useImageMaskRef = ref<HTMLImageElement | null>(null)

const scalingRatio = ref(1)
const imageZoom = ref<Record<string, string>>({
  transform: `scale(${scalingRatio.value})`,
})

// eslint-disable-next-line n/prefer-global/process
const documentReady = computed(() => process.client ? document : undefined)

const { width, height } = useElementSize(useImageRef)
const { style  } = useDraggable(useImageMaskRef)
const { x, y } = useMouseInElement(documentReady.value?.body)
const { isOutside } = useMouseInElement(useImageMaskRef)
const { x: windowScrollX, y: windowScrollY } = useScroll(documentReady.value)

// The default Y-axis and X-axis coordinates in style are 0px.
// When the mouse moves, the coordinate position will change.
// Check whether the mouse moves.
const isMoved = computed(() => /(?<!\d)0px.*?0px/.test(style.value))

function handleMouseWheel(evt: WheelEvent) {
  if (!useImageMaskRef.value)
    return

  scalingRatio.value += evt.deltaY > 0 ? -0.1 : 0.1
  scalingRatio.value = Math.max(0.1, Math.min(3, scalingRatio.value))
  imageZoom.value = { transform: `scale(${scalingRatio.value})` }
}
</script>

<template>
  <Transition>
    <div v-show="show" class="view-image">
      <Transition name="scale">
        <img
          v-if="show"
          ref="useImageRef"
          class="block max-w-[92%] max-h-[92%] w-auto m-auto rounded-xl shadow-[0_5px_30px_0_rgba(0,0,0,.05)] scale-100 absolute"
          alt=""
          :src="src"
          :style="[style, imageZoom, isMoved ? { inset: '0 !important', margin: 'auto' } : '']"
          :class="[isMousedown ? 'clear-transition' : '']"
        >
      </Transition>
      <div
        ref="useImageMaskRef"
        class="max-w-[92%] max-h-[92%] w-auto m-autoshadow-[0_5px_30px_0_rgba(0,0,0,.05)] absolute z-10"
        :class="[isMousedown ? 'cursor-grabbing' : 'cursor-grab']"
        :style="[
          style,
          imageZoom,
          isMoved ? { inset: '0 !important', margin: 'auto' } : '',
          { width: `${width}px`, height: `${height}px` },
        ]"
        @mousedown="isMousedown = true"
        @mouseup.stop="isMousedown = false"
        @wheel.prevent="handleMouseWheel"
      />
      <SvgIcon
        v-show="isOutside"
        icon="essetional/close-square"
        class="clear-transition absolute top-14 left-14 bg-[var(--my-special-color)] !cursor-none z-20"
        :size="CLOSE_BUTTON_SIZE"
        :is-open-hover="false"
        :style="{
          left: `${x - (CLOSE_BUTTON_SIZE / 2) - windowScrollX}px`,
          top: `${y - (CLOSE_BUTTON_SIZE / 2) - windowScrollY}px`,
        }"
        @click="emit('update:show', false)"
      />
      <span class="absolute top-2 right-2 !text-xl">{{ Math.round(scalingRatio * 100) }}%</span>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.view-image {
  background-color: rgba(0, 0, 0, .2);
  backdrop-filter: saturate(180%) blur(10px);
  z-index: 200;

  * {
    @apply text-2xs;
  }

  img {
    transition-property: transform;
    transition: all .4s ease;
  }

  @apply fixed top-0 right-0 bottom-0 left-0 w-screen h-screen flex items-center select-none
}

.scale-enter-active {
  animation: transition-scale 0.5s;
}

.scale-leave-active {
  animation: transition-scale 0.5s reverse;
}

.clear-transition {
  transition: none !important;
}

@keyframes transition-scale {
  0% {
    transform: scale(.8);
  }

  100% {
    transform: scale(1);
  }
}

.v-enter-active,
.v-leave-active {
  transition: opacity 0.3s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>
