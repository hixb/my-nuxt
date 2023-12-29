<script setup lang="ts">
const props = withDefaults(defineProps<{
  message: string
  position?: ToastSpace.Position
  type?: ToastSpace.ToastType & SiteStatus
  duration?: number
  title?: string
}>(), {
  message: 'These documents refer to the latest version of vuesax (4.0+), to see the documents of the previous versions you can do it here 👉 Vuesax 3.x',
  position: 'top-right',
  type: 'primary',
  duration: 3000,
})

const visible = ref(false)
const timer = ref<ReturnType<typeof setTimeout> | null>(null)

onMounted(() => {
  dismiss()
  showToast()
})

defineExpose({
  dismiss,
})

function showToast() {
  visible.value = true

  timer.value = setTimeout(() => dismiss(), props.duration)
}

function dismiss() {
  visible.value = false
  clearTimeout(timer.value)
  timer.value = null
}
</script>

<template>
  <Transition :name="`toast-${position}`">
    <div
      v-if="visible && message"
      class="toast-parent fixed z-[200000] p-3 max-h-24 min-h-16 w-[340px] text-[#fff] flex items-start flex-col justify-center"
      :class="[
        `toast-parent--${position}`,
        type === 'system' ? 'bg-[var(--my-special-color)]' : `bg-[var(--my-special-${type})]`,
        {
          'top-0 left-1/2 -translate-x-1/2 rounded-b-2xl transition-all duration-500 hover:translate-y-0.5 hover:transition-all hover:duration-500': position === 'top',
          'bottom-0 left-1/2 -translate-x-1/2 rounded-t-2xl transition-all duration-500 hover:-translate-y-0.5 hover:transition-all hover:duration-500': position === 'bottom',
          'top-1 right-0 rounded-l-2xl transition-all duration-500 hover:-translate-x-0.5 hover:transition-all hover:duration-500': position === 'top-right',
          'top-1 left-0 rounded-r-2xl transition-all duration-500 hover:translate-x-0.5 hover:transition-all hover:duration-500': position === 'top-left',
          'bottom-1 right-0 rounded-l-2xl transition-all duration-500 hover:-translate-x-0.5 hover:transition-all hover:duration-500': position === 'bottom-right',
          'bottom-1 left-0 rounded-r-2xl transition-all duration-500 hover:translate-x-0.5 hover:transition-all hover:duration-500': position === 'bottom-left',
        },
      ]"
    >
      <SvgIcon
        class="icon-close absolute top-0 right-0"
        icon="essetional/close-square"
        :is-open-hover="false"
        :size="30"
        @click="dismiss"
      />
      <h3 v-if="title" class="text-sm mb-2">
        {{ title }}
      </h3>
      <div class="text-sm line-clamp-2">
        {{ message }}
      </div>
    </div>
  </Transition>
</template>

<style scoped lang="scss">
.icon-close {
  :deep(svg) {
    stroke: #fff;

    * {
      stroke: #fff;
    }
  }
}

.toast-top-right-enter-active {
  transition: width 0.2s ease-in-out, opacity 0.2s ease-in-out;
}

.toast-top-right-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.toast-top-right-enter-from {
  opacity: 0;
  width: 170px;
}

.toast-top-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
}
</style>
