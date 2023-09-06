<script setup lang="ts">
withDefaults(defineProps<{
  link: string
  cover?: string
  target?: '_blank' | '_self' | 'target' | '_parent' | '_top'
}>(), {
  cover: 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgfuymsEhfEEaTiYatM-ShkNN1hMVqdNz6zP5EomooY6SYFhoykbeHud8_C0gmydfMreQUsZ7Fy496R0RTNLUjjSEdNAA0v1DRdYj1v73fhiNiKJwb4ek8F77A1R6aIv2AAxFrWFcJk_iF_o85HQHMWiT8o--nKOERV1eTz0gloPXJVSojl8RBXO1mKLw/w600-h300-p-k-no-nu-rw-e30/Bookmark_Posts_Plus_UI.webp',
  link: '',
  target: '_self',
})
</script>

<template>
  <div class="cover">
    <NuxtLink class="w-full h-full flex" :to="link" :target="target">
      <NuxtImg class="w-full" :src="cover ?? ''" alt="" loading="lazy" />
    </NuxtLink>
    <dataDisplayListCoverOperate />
  </div>
</template>

<style scoped lang="scss">
.cover {
  img {
    transition: all .3s;

    &:hover {
      transition: all .3s;

      @apply hover:opacity-100 scale-[1.06]
    }

    @apply object-cover opacity-80
  }

  @apply
  relative
  w-full
  overflow-hidden
  rounded-lg
  flex-[0_0_310px]
  max-w-fit
  max-lg:flex-[0_0_calc(50%-20px)]
  max-lg:w-[0_0_calc(50%-20px)]
  max-xs:w-full
  max-xs:flex-[0_0_100%]
  max-xs:h-full
}
</style>
