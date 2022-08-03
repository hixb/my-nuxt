<script setup lang="ts">
import { useTheme } from "~/composables";

const { currentTheme } = useTheme();
</script>

<template lang="pug">
div.app(:class="[currentTheme]")
  CommonHeader
  main
    CommonSidebar
    slot/
</template>

<style scoped lang="scss"></style>
