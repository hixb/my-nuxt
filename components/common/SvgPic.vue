<script setup lang="ts">
type SvgProps = {
  borderRadius?: string
  isOpenHover?: boolean
}
withDefaults(defineProps<SvgProps>(), {
  borderRadius: "round",
  isOpenHover: true
});
</script>

<template lang="pug">
div.svg-pic(:class="[borderRadius, {'open-hover': isOpenHover}]")
  slot/
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
