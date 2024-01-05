<script lang="ts" setup>
interface IProps {
  /**
   * 按钮大小
   */
  size?: 'sm' | 'md' | 'lg'
  /**
   * 按钮颜色主题
   */
  color?: 'default' | 'primary' | 'secondary' | 'success' | 'warning' | 'danger'
  /**
   * 按钮边框半径
   */
  radius?: 'none' | 'sm' | 'md' | 'lg' | 'full'
  /**
   * 是否禁用
   */
  isDisabled?: boolean
  /**
   * 是否加载中
   */
  isLoading?: boolean
  /**
   * 是否只有图标
   */
  isIconOnly?: boolean
}

interface RippleRef {
  timer: number
  el: HTMLCanvasElement | null
  init: boolean
  color: string
  speedOpacity: number
  context: any
  radius: number
  origin: {
    x: number
    y: number
  }
}

const props = withDefaults(defineProps<IProps>(), {
  size: 'md',
  color: 'primary',
  variant: 'solid',
  radius: 'md',
  isDisabled: false,
  isLoading: false,
  isIconOnly: false,
})

const SPEED = 4
const OPACITY = 0.4

const rippleRef = reactive<RippleRef>({
  timer: -1,
  el: null,
  init: false,
  color: '',
  speedOpacity: 0,
  context: null,
  radius: 0,
  origin: {
    x: 0,
    y: 0,
  },
})

onDeactivated(() => {
  if (rippleRef.timer) {
    window.cancelAnimationFrame(rippleRef.timer)

    rippleRef.timer = -1
  }
})

function ripple(evt: MouseEvent) {
  if (props.isLoading || props.isDisabled)
    return

  rippleRef.timer && window.cancelAnimationFrame(rippleRef.timer)
  rippleRef.el = evt.target as HTMLCanvasElement

  if (!rippleRef.init) {
    rippleRef.init = true

    const oBtn = rippleRef.el.parentElement!
    rippleRef.color = getStyle(oBtn, 'color')

    const w: number = getStyleNumber(oBtn, 'width') || 0
    rippleRef.speedOpacity = (SPEED / w) * OPACITY
    rippleRef.el.width = w
    rippleRef.el.height = getStyleNumber(oBtn, 'height') || 0

    rippleRef.context = rippleRef.el.getContext('2d')
  }

  rippleRef.radius = 0
  rippleRef.origin.x = evt.offsetX
  rippleRef.origin.y = evt.offsetY
  rippleRef.context.clearRect(0, 0, rippleRef.el.width, rippleRef.el.height)
  rippleRef.el.style.opacity = OPACITY.toString()

  drawRipple()
}

function getStyleNumber(el: HTMLElement, attr: string) {
  try {
    const val = getStyle(el, attr)

    return Number.parseFloat(val)
  }
  catch (e) {
    console.error(e)
  }
}

function getStyle(el: HTMLElement, attr: string) {
  return window.getComputedStyle(el, null)[attr as never]
}

function drawRipple() {
  const { radius, origin, el } = rippleRef

  rippleRef.context.beginPath()
  rippleRef.context.arc(origin.x, origin.y, radius, 0, 2 * Math.PI, false)
  rippleRef.context.fillStyle = rippleRef.color
  rippleRef.context.fill()

  rippleRef.radius += SPEED;

  (rippleRef.el as any).style.opacity -= rippleRef.speedOpacity as number

  if (radius < el!.width) {
    rippleRef.timer = window.requestAnimationFrame(drawRipple)
  }
  else {
    rippleRef.context.clearRect(0, 0, el!.width, el!.height)
    rippleRef.el!.style.opacity = '0'
  }
}
</script>

<template>
  <button
    :class="[
      isDisabled ? 'disabled' : '',
      isLoading ? `!w-28 loading` : '',
      `size-${size}`,
      `radius-${radius}`,
      color,
    ]"
    :disabled="isDisabled"
    class="button overflow-hidden relative flex items-center justify-center px-3"
  >
    <canvas class="absolute left-0 top-0 w-full h-full opacity-0" @click="ripple" />
    <FeedbackLoading :show="!!isLoading" classes="mr-1 !bg-[#fff]" />
    <template v-if="isLoading">
      Loading...
    </template>
    <template v-else>
      <slot />
    </template>
  </button>
</template>

<style lang="scss" scoped>
.button {
  transition: var(--my-theme-trans3);

  &:hover {
    @apply opacity-80 transition-[var(--my-theme-trans3)]
  }

  @apply text-sm select-none
}

.size-sm {
  @apply w-16 h-8
}

.size-md {
  @apply w-20 h-9
}

.size-lg {
  @apply w-24 h-10
}

.default {
  @apply bg-[var(--my-special-default)] text-[var(--my-text-base-color)]
}

.primary {
  @apply bg-[var(--my-special-primary)] text-[#fff]
}

.secondary {
  @apply bg-[var(--my-special-secondary)] text-[#fff]
}

.success {
  @apply bg-[var(--my-special-success)] text-[#fff]
}

.warning {
  @apply bg-[var(--my-special-warning)] text-[#222]
}

.danger {
  @apply bg-[var(--my-special-danger)] text-[#fff]
}

.radius-sm {
  @apply rounded-sm
}

.radius-md {
  @apply rounded-md
}

.radius-lg {
  @apply rounded-lg
}

.radius-full {
  @apply rounded-full
}

.loading, .disabled {
  &:hover {
    @apply opacity-50 cursor-not-allowed
  }

  @apply opacity-50
}

.warning .loading {
  @apply bg-[#222]
}
</style>
