<script setup lang="ts">

</script>

<template>
  <div class="max-h-6">
    <div v-if="false" class="absolute top-0 left-0 right-0 my-2.5 mx-1.5 !ml-2 item w-max z-10">
      <SvgIcon class="mx-0.5" :is-open-hover="false" :size="16" :overall-size="16" icon="design-tools/path" />
    </div>
    <ul class="absolute top-0 left-0 right-0 py-2.5 px-1.5 text-xs flex justify-end">
      <li class="item-btn">
        <SvgIcon class="mx-0.5" :is-open-hover="false" :size="16" :overall-size="16" icon="emails-message/message" />
        <NuxtLink to="/">
          7
        </NuxtLink>
      </li>
      <li class="item-btn">
        <SvgIcon class="mx-0.5" :is-open-hover="false" :size="16" :overall-size="16" icon="security/eye" />
        2K
      </li>
      <li class="item-btn show-text" aria-label="稍后阅读">
        <SvgIcon class="mx-0.5" :is-open-hover="false" :size="16" :overall-size="16" icon="archive/archive-add" />
      </li>
    </ul>
  </div>
</template>

<style scoped lang="scss">
.item-btn {
  @apply
  flex
  items-center
  p-1
  text-[var(--my-text-bodyC)]
  bg-[#fffdfc]
  shadow-[0_8px_25px_0_rgba(0,0,0,.1)]
  rounded
  mx-1
  transition-[var(--my-theme-trans3)]
  cursor-pointer
  overflow-hidden
}

.show-text {
  &:after {
    transition: all .4s cubic-bezier(.18,.89,.32,1.28);

    @apply content-[attr(aria-label)] whitespace-nowrap opacity-0 invisible w-0
  }

  &:hover {
    &:after {
      @apply w-[51px] opacity-100 visible
    }
  }
}
</style>
