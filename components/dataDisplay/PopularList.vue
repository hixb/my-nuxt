<script setup lang="ts">
const articleList = reactive([
  { title: '版式和代码', time: '01.01', source: '文档', description: '所有新版式和书写格式所有新版式和书写格式所有' },
  { title: '版式和代码', time: '01.01', source: '文档', description: '所有新版式和书写格式所有新版式和书写格式所有' },
])
</script>

<template>
  <section class="popular">
    <GeneralHeadTitle flower>
      热门文章
    </GeneralHeadTitle>
    <DataDisplayListCover class="mb-6" link="/" />
    <article v-for="(item, index) in articleList" :key="index" class="flex mb-6 last-of-type:mb-0">
      <span class="block h-full w-6 text-xs opacity-60 mt-1 min-w-[25px] max-w-[25px] flex-1 select-none">
        {{ index + 1 }}
      </span>
      <div>
        <h3 class="text-base font-bold line-clamp-2">
          <NuxtLink class="block hover:text-[var(--my-special-color)] transition-[var(--my-theme-trans3)]" to="/">
            {{ item.title }}
          </NuxtLink>
        </h3>
        <div class="flex items-center mt-2">
          <time :data-text="item.time" class="time" />
          <span class="bg-[var(--my-widget-tac)] w-2 h-[1px] mx-1" />
          <div
            class="before:opacity-70 before:content-[attr(data-text)] before:mr-1 text-xs"
            data-text="在"
          >
            <NuxtLink class="opacity-90 hover:underline" to="/">
              {{ item.source }}
            </NuxtLink>
          </div>
        </div>
        <p class="line-clamp-2 text-sm opacity-80 mt-2 max-lg:hidden max-2md:block max-md:hidden">
          {{ item.description }}
        </p>
      </div>
    </article>
  </section>
</template>

<style scoped lang="scss">
.popular {
  &:before {
    @apply content-[''] w-16 h-16 absolute z-0 bg-[rgba(0,0,0,.04)] bottom-0 left-0 rounded-[0_70px_0_0]
  }

  @apply bg-[var(--my-box-bg)] w-full h-max overflow-hidden p-5 rounded-xl relative shadow-[0_5px_35px_rgba(0,0,0,.07)]
}

.article-list {
}

.time {
  &:after {
    @apply content-[attr(data-text)] inline text-xs whitespace-nowrap overflow-ellipsis overflow-hidden
  }

  &:before {
    @apply content-none
  }
}
</style>
