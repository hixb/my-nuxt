<script setup lang="ts">
const labelList = reactive([
  { link: '/', title: '文档' },
  { link: '/', title: '文档' },
  { link: '/', title: '文档' },
  { link: '/', title: '文档' },
  { link: '/', title: '文档' },
  { link: '/', title: '文档文档文档文档' },
])
</script>

<template>
  <section class="label-list">
    <GeneralHeadTitle flower>
      标签
    </GeneralHeadTitle>
    <ul class="w-[calc(100%+10px)] -left-[5px] -right-[5px] flex flex-wrap relative text-2xs">
      <li v-for="(item, index) in labelList" :key="index" class="w-[calc(50%-10px)] m-[0_5px] mb-2.5 overflow-hidden rounded">
        <NuxtLink
          class="bg-[rgba(0,0,0,.15)] text-[var(--my-darkT)] flex items-baseline justify-between py-2 px-2.5"
          to="/"
          :title="item.title"
        >
          <span class="opacity-70 truncate text-[var(--my-text-base-color)]">{{ item.title }}</span>
          <span class="inline-flex items-center">
            <span class="mx-1 text-[var(--my-text-base-color)] opacity-70">1</span>
            <SvgIcon :is-open-hover="false" :size="18" :overall-size="18" class="opacity-70" icon="archive/frame" />
          </span>
        </NuxtLink>
      </li>
    </ul>
    <span class="text-[var(--my-special-color)] text-2xs mt-2.5 cursor-pointer">
      显示很多(+5)
    </span>
  </section>
</template>

<style scoped lang="scss">
.label-list {
  &:before {
    @apply content-[''] w-16 h-16 absolute z-0 bg-[rgba(0,0,0,.04)] bottom-0 left-0 rounded-[0_70px_0_0]
  }

  @apply bg-[var(--my-box-bg)] w-full h-max overflow-hidden p-5 rounded-xl relative shadow-[0_5px_35px_rgba(0,0,0,.07)] mt-10
}
</style>
