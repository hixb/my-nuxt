<script setup lang="ts">

</script>

<template>
  <aside>
    <div>
      <DataDisplayPopularList />
      <DataDisplayLabelList />
    </div>
  </aside>
</template>

<style scoped lang="scss">
aside {
  @apply
  flex
  flex-[0_0_calc(var(--my-sidebar-width)+25px)]
  w-[calc(var(--my-sidebar-width)+25px)]
  m-0
  before:content-['']
  before:flex-[0_0_25px]
  max-2md:before:content-none
  max-2md:w-full
}
</style>
