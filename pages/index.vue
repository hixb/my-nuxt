<script setup lang="ts">
import { fetchHomeData } from '~/server/homeData'

const data = await fetchHomeData()
const latestRelease = data[0]
const historyR = data.filter((v, i) => i !== 0)

const { websiteTitle } = useAuthor()

useSeoMeta({
  title: websiteTitle,
})

const historyReleases = ref(historyR.slice(0, 3))
const isLoadAll = ref(false)
const timer = ref<ReturnType<typeof setTimeout> | undefined>(undefined)

watch(() => historyReleases.value.length, () => {
  if (historyReleases.value.length >= historyR.length)
    isLoadAll.value = true
})

function loadMore() {
  if (timer.value)
    return

  timer.value = setTimeout(() => {
    historyReleases.value.push(...historyR.slice(3))

    clearTimeout(timer.value)
    timer.value = undefined
  }, 2000)
}
</script>

<template>
  <NuxtLayout>
    <div>
      <GeneralHeadTitle flower>
        最新发布
      </GeneralHeadTitle>
      <article class="item relative max-xs:before:!content-none">
        <DataDisplayListCover :cover="latestRelease.image" link="/article/2344" />
        <div class="description">
          <div class="before:opacity-70 before:content-[attr(data-text)] before:mr-1 text-xs mb-2" data-text="在">
            <NuxtLink class="opacity-90 hover:underline" to="/article/2344">
              {{ latestRelease.countries.join("、") }}
            </NuxtLink>
          </div>
          <h3 class="text-lg font-bold line-clamp-1 max-lg:text-base">
            <NuxtLink
              class="block hover:text-[var(--my-special-color)] transition-[var(--my-theme-trans3)]"
              to="/article/2344"
            >
              {{ latestRelease.title }}
            </NuxtLink>
          </h3>
          <p
            :title="latestRelease.description"
            class="line-clamp-2 text-sm opacity-80 mt-3 max-lg:hidden max-2md:block max-md:hidden"
          >
            {{ latestRelease.description }}
          </p>
          <div class="flex align-baseline justify-between items-center mt-3.5 max-lg:mt-1.5 truncate">
            <time :data-text="latestRelease.updatedAt" data-type="公共" class="time" />
            <NuxtLink to="/article/2344" class="text-[var(--my-special-color)] text-xs">
              阅读更多
            </NuxtLink>
          </div>
        </div>
      </article>
    </div>
    <div class="mt-10">
      <GeneralHeadTitle flower>
        历史发布
      </GeneralHeadTitle>
      <div class="flex flex-wrap gap-5">
        <article
          v-for="(item, index) in historyReleases"
          :key="index"
          class="releases-article"
        >
          <DataDisplayListCover
            :cover="item.image"
            class="!flex-[0_0_134px] max-md:!flex-[0_0_180px] max-xs:!flex-[0_0_230px]"
            :link="`/article/${index}`"
          />
          <div class="flex flex-col ml-5 mr-2.5 flex-1 !mx-0 !mt-5">
            <div class="before:opacity-70 before:content-[attr(data-text)] text-xs mb-2 before:mr-1" data-text="在">
              <NuxtLink class="opacity-90 hover:underline" :to="`/article/${index}`">
                {{ item.countries.join("、") }}
              </NuxtLink>
            </div>
            <h3 class="group text-lg font-bold line-clamp-2 max-lg:text-base">
              <NuxtLink
                class="block hover:text-[var(--my-special-color)] transition-[var(--my-theme-trans3)]"
                :to="`/article/${index}`"
              >
                {{ item.title }}
              </NuxtLink>
            </h3>
            <p class="line-clamp-2 text-sm opacity-80 mt-3" :title="item.description">
              {{ item.description }}
            </p>
            <div class="flex align-baseline justify-between items-center mt-3.5 max-lg:mt-1.5 truncate">
              <time data-text="2022.01.01" data-type="公共" class="time" />
              <NuxtLink :to="`/article/${index}`" class="text-[var(--my-special-color)] text-xs">
                阅读更多
              </NuxtLink>
            </div>
          </div>
        </article>
      </div>
    </div>
    <GeneralButton
      class="!w-32 mx-auto mt-10 mb-12"
      radius="full"
      :is-loading="!!timer"
      :is-disabled="isLoadAll"
      :color="isLoadAll ? 'default' : 'primary'"
      @click="loadMore"
    >
      {{ isLoadAll ? '已全部加载' : '加载更多' }}
    </GeneralButton>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
@import "@/assets/css/pages/home.scss";
</style>
