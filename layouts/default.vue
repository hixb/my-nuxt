<script lang="ts" setup>

</script>

<template>
  <div class="flex relative">
    <BaseSidebar />
    <main class="pt-8 w-full max-md:pt-24 max-w-[1280px] mx-auto">
      <div class="px-7 relative">
        <div class="flex max-2md:flex-col">
          <div
            class="flex-[1_0_calc(100%-var(--my-sidebar-width)-25px)] w-[calc(100%-var(--my-sidebar-width)-25px)] max-2md:w-full"
          >
            <slot />
          </div>
          <BaseAside />
        </div>
        <BaseFooter />
      </div>
    </main>
    <ClientOnly>
      <StyleWaves />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped>
* {
  line-height: 1;
}
</style>
