<script lang="ts" setup>
interface SvgProps {
  /**
   * 图标
   */
  icon: string
  /**
   * 半径
   */
  borderRadius?: string
  /**
   * 是否打开悬停
   */
  isOpenHover?: boolean
  /**
   * svg填充
   */
  filled?: boolean
  /**
   * 鼠标移入填充
   */
  hoverFilled?: boolean
  /**
   * 自定义类名
   */
  customizeClass?: string
  /**
   * 大小
   */
  size?: number
  /**
   * 禁用
   */
  disabled?: boolean
  /**
   * 总体大小
   */
  overallSize?: number
}

const props = withDefaults(defineProps<SvgProps>(), {
  borderRadius: 'round',
  isOpenHover: true,
  icon: '',
  filled: false,
  customizeClass: '',
  size: 20,
  disabled: false,
  overallSize: 40,
})

const icon = ref<string | Record<string, any>>('')
const hasStroke = ref(false)

async function getIcon() {
  try {
    const iconsImport = import.meta.glob('assets/icons/**/**.svg', {
      as: 'raw',
      eager: false,
    })
    const rawIcon = await iconsImport[`/assets/icons/${props.icon}.svg`]()

    if (rawIcon.includes('stroke'))
      hasStroke.value = true

    icon.value = rawIcon
  }
  catch {
    console.error(`[nuxt-icons] Icon '${props.icon}' doesn't exist in 'assets/icons'`)
  }
}

await getIcon()

watchEffect(getIcon)
</script>

<template>
  <i
    :class="[
      borderRadius,
      customizeClass,
      { 'open-hover': isOpenHover, 'disabled': disabled },
    ]"
    :data-icon="props.icon" :style="{ width: `${overallSize}px`, height: `${overallSize}px` }"
    class="svg-icon w-10 h-10 flex items-center justify-center cursor-pointer select-none"
  >
    <span
      :class="{ 'icon--fill': filled, 'icon-hover--fill': hoverFilled }"
      :style="{ width: `${props.size}px`, height: `${props.size}px` }"
      class="contents"
      v-html="icon"
    />
    <slot />
  </i>
</template>

<style lang="scss" scoped>
.svg-icon {
  transition: var(--my-theme-trans2);

  .contents {
    display: block;
  }

  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

.icon--fill {
  :deep(svg) {
    stroke: var(--my-special-color);
    fill: var(--my-special-color);

    * {
      stroke: var(--my-special-color);
    }
  }
}

.icon-hover--fill:hover {
  :deep(svg) {
    stroke: var(--my-special-color);
    fill: var(--my-special-color);

    * {
      stroke: var(--my-special-color);
    }
  }

  .set-svg-stroke {
    stroke: var(--my-svg-color);
  }
}

.disabled {
  cursor: no-drop;

  :deep(svg) {
    opacity: .3 !important;
  }
}

.open-hover {
  &:hover {
    transition: var(--my-theme-trans2);
    background-color: var(--my-transB);

    :deep(svg) {
      transition: var(--my-theme-trans2);

      * {
        transition: var(--my-theme-trans2);
        stroke: var(--my-special-color);
      }
    }
  }
}
</style>
