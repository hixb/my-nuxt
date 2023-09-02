<template>
  <div class="flex relative">
    <BaseSidebar />
    <main class="pt-8 w-full max-md:pt-24 max-w-[1280px] mx-auto">
      <div class="px-7 relative">
        <div class="max-2md:w-full">
          <slot />
        </div>
        <BaseFooter />
      </div>
    </main>
    <StyleWaves />
  </div>
</template>

<style lang="scss" scoped>
* {
  line-height: 1;
}
</style>
