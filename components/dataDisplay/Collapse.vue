<script lang="ts" setup>
import autoAnimate from '@formkit/auto-animate'

const useDropdownRef = ref<HTMLElement>()
const showAccordion = ref(false)

onMounted(async () => {
  await nextTick()
  if (useDropdownRef.value)
    autoAnimate(useDropdownRef.value)
})
</script>

<template>
  <div
    ref="useDropdownRef"
    class="border border-[rgba(255,255,255,.15)] bg-[var(--my-darkBs)] py-5 px-4 my-5 rounded-xl shadow-[0_5px_35px_rgba(0,0,0,.07)] overflow-hidden"
  >
    <div
      :class="showAccordion ? 'text-[var(--my-special-color)]' : ''"
      class="font-bold cursor-pointer flex align-baseline transition-[var(--my-theme-trans1)] items-center select-none text-lg"
      @click="showAccordion = !showAccordion"
    >
      <SvgIcon
        :class="showAccordion ? 'rotate-90' : ''"
        :is-open-hover="false"
        :overall-size="16"
        :size="16"
        :special="showAccordion"
        class="mr-1"
        icon="arrow/arrow-right-1"
      />
      <slot name="title" />
    </div>
    <div v-if="showAccordion" class="opacity-90 px-4 my-5 text-sm font-normal">
      <slot name="content" />
    </div>
  </div>
</template>

<style lang="scss" scoped>

</style>
