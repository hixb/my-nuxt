<script setup lang="ts">
interface IProps {
  content: string
}

withDefaults(defineProps<IProps>(), {
  content: '',
})

const useTooltipRef = ref<HTMLElement | null>(null)
const useTooltipChildRef = ref<HTMLElement | null>(null)

const isHovered = useElementHover(useTooltipRef)
const { height: elementHeight } = useElementSize(useTooltipChildRef)
</script>

<template>
  <div ref="useTooltipRef" class="tooltip relative w-fit h-max z-110">
    <slot />
    <div
      ref="useTooltipChildRef"
      class="absolute left-1/2 -translate-x-1/2 w-max max-w-xs bg-[var(--my-box-bg)] shadow-[0_10px_25px_-3px_rgba(0,0,0,.1)] py-2 px-4 rounded-lg text-2xs leading-5 z-[1000]"
      :class="[isHovered ? 'show' : 'hide']"
      :style="{ bottom: `-${elementHeight + 20}px` }"
    >
      {{ content }}
    </div>
  </div>
</template>

<style scoped lang="scss">
.show {
  visibility: visible;
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}

.hide {
  visibility: hidden;
  opacity: 0;
  transition: visibility 0s 0.2s, opacity 0.2s ease-in-out;
}
</style>
