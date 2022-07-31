<script setup lang="ts">
import { useTheme } from "~/composables";

const { currentTheme } = useTheme();
</script>

<template>
  <div :class="['app', currentTheme]">
    <CommonHeader />
    <main>
      <CommonSidebar />
      <slot />
    </main>
  </div>
</template>

<style scoped lang="scss"></style>
