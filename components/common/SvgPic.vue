<script setup lang="ts">
const { borderRadius, isOpenHover } = withDefaults(defineProps<{
  borderRadius?: string
  isOpenHover?: boolean
}>(), {
  borderRadius: "round",
  isOpenHover: true
});
</script>

<template>
  <div :class="['svg-pic', borderRadius, {'open-hover': isOpenHover}]">
    <slot />
  </div>
</template>

<style lang="scss">
.svg-pic {
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: var(--my-theme-trans2);
  cursor: pointer;

  svg {
    width: 20px;
    height: 20px;
  }
}

.open-hover {
  &:hover {
    transition: var(--my-theme-trans2);
    background-color: var(--my-theme-transB);

    svg * {
      stroke: var(--my-theme-special-color);
    }
  }
}
</style>
