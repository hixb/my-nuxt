<script setup lang="ts">
import { useTheme } from "~/composables";

const { currentTheme } = useTheme();
</script>

<template>
  <div :class="['app', currentTheme]">
    <CommonHeader>11</CommonHeader>
    <slot />
  </div>
</template>

<style scoped lang="scss"></style>
