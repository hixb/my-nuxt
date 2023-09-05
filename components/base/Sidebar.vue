<script setup lang="ts">
import type { AsideAlways } from '~/composables/useAside'

interface AsideItemParams {
  link: string
  title: string
  rel: ('nofollow' | 'noopener' | 'noreferrer' | 'author' | 'canonical' | '')[]
  icon?: string
  activeIcon?: string
  active?: boolean
  sublist?: AsideItemParams[]
}

const fixedList = reactive({
  top: [
    { title: '网站地图', link: '/', rel: [''] },
    { title: '免责声明', link: '/', rel: [] },
    { title: '隐私', link: '/', rel: [] },
  ],
  bottom: [
    { icon: 'crypto-company/twitch', link: '/', rel: ['nofollow', 'noopener'] },
    { icon: 'crypto-company/facebook', link: '/', rel: ['nofollow', 'noopener'] },
    { icon: 'crypto-company/whatsapp', link: '/', rel: ['nofollow', 'noopener'] },
    { icon: 'crypto-company/google', link: '/', rel: ['nofollow', 'noopener'] },
  ],
})

const asideList = reactive<{ [key: string]: AsideItemParams[] }>({
  public: [
    { icon: 'essetional/home', link: '/', title: '首页', rel: ['canonical'] },
    {
      icon: 'files/folder-minus',
      link: '',
      title: '分类',
      activeIcon: 'files/folder-open',
      active: false,
      rel: [],
      sublist: [
        { link: '/', title: 'CSS', rel: [] },
        { link: '/', title: 'HTML', rel: [] },
        { link: '/', title: 'JavaScript', rel: [] },
        { link: '/', title: 'TypeScript', rel: [] },
        { link: '/', title: 'Node', rel: [] },
        { link: '/', title: 'Vue or Nuxt', rel: [] },
        { link: '/', title: 'React or Next', rel: [] },
        { link: '/', title: '其他', rel: [] },
      ],
    },
  ],
  about: [
    { icon: 'users/profile-2user', link: '/about', title: '关于', rel: ['author'] },
    { icon: 'crypto-company/icon-icx', link: '/icon', title: '图标库', rel: [] },
  ],
})

const { width, lessThanMD, ScreenSize } = useScreen()
const { openAside, setOpenAside } = useAside()

watch(() => openAside.value, (newVal) => {
  if (!newVal) {
    for (const key in asideList)
      asideList[key].forEach(item => item.active = false)
  }
})

watchThrottled(
  () => width.value,
  () => (width.value <= ScreenSize.MD + 100 || width.value <= ScreenSize.XL) && setAsideActive(2),
  { throttle: 300 },
)

onMounted(() => {
  if (width.value <= ScreenSize.MD || width.value <= ScreenSize.XL)
    setAsideActive(2)
})

function transitionState(index: number, item: AsideItemParams) {
  if (!openAside.value)
    return

  if (item.sublist?.length)
    item.active = !item.active
}

function setAsideActive(always: AsideAlways) {
  if (width.value <= ScreenSize.XL && width.value >= ScreenSize.MD)
    always = 2

  setOpenAside(always)
}
</script>

<template>
  <article
    class="shrink-0 relative z-1 max-md:fixed max-md:invisible max-md:opacity-0 max-md:!z-40 border-r border-[var(--my-dark-border)] transition-[width] shadow-[0_0_15px_rgba(0,0,0,0.07)] z-20"
    :class="[
      openAside ? 'w-60' : 'w-20',
      lessThanMD && openAside ? 'open-sidebar !h-[calc(100vh-40px)] !z-20 !w-10/12 !rounded-3xl max-md:!visible max-md:!opacity-100' : '',
      lessThanMD && !openAside ? 'close-sidebar' : '',
    ]"
  >
    <div class="sticky top-16">
      <div
        class="flex text-xs relative h-[calc(100vh-64px)] pb-20 flex-col p-5 transition-[var(--my-theme-trans3)]"
        :class="[
          !openAside && 'px-4',
          lessThanMD && openAside ? '!rounded-3xl overflow-hidden !pt-16' : '',
        ]"
      >
        <template v-if="lessThanMD">
          <div class="absolute top-2 left-8 flex items-center cursor-pointer">
            <SvgIcon :is-open-hover="false" :size="50" icon="essetional/close-square" @click="setAsideActive(2)" />
            关闭
          </div>
        </template>
        <div
          v-for="(item, key, index) in asideList"
          :key="index"
          class="menu-list"
          :class="Object.keys(asideList).length === index + 1 ? 'after:!content-none' : ''"
        >
          <ul class="flex flex-col">
            <li v-for="(v, i) in item" :key="i" class="group w-full px-1 relative">
              <NuxtLink
                v-if="v.link"
                class="menu-item items-center whitespace-nowrap"
                :to="v.link"
                :rel="v.rel.join(' ')"
              >
                <SvgIcon :size="19" :is-open-hover="false" :icon="v.icon as string" />
                <Transition name="fade" mode="out-in">
                  <span v-show="openAside">
                    {{ v.title }}
                  </span>
                </Transition>
              </NuxtLink>
              <div v-else class="flex-col items-start">
                <div class="menu-item flex items-center relative w-full" @click="transitionState(i, v)">
                  <SvgIcon
                    :size="19"
                    :is-open-hover="false"
                    :icon="v.active ? v.activeIcon as string : v.icon as string"
                  />
                  <span v-show="openAside">
                    {{ v.title }}
                  </span>
                  <SvgIcon
                    v-if="openAside"
                    :is-open-hover="false"
                    :size="13"
                    :overall-size="30"
                    class="absolute top-0 bottom-0 right-1.5 m-auto"
                    :class="{ 'rotate-180': v.active }"
                    icon="arrow/arrow-down"
                  />
                </div>
                <ul v-show="v.sublist?.length && v.active" class="sub-list flex items-center flex-col transition-all z-20">
                  <li
                    v-for="(s, idx) in v.sublist"
                    :key="idx"
                    class="menu-item relative sublist-item !h-8"
                  >
                    <NuxtLink class="w-full h-full flex items-center" :to="s.link" :rel="s.rel.join(' ')">
                      {{ s.title }}
                    </NuxtLink>
                  </li>
                </ul>
              </div>

              <template v-if="!openAside">
                <span v-if="v.link" class="prompt-bubble group-hover:opacity-100 group-hover:visible px-4">
                  {{ v.title }}
                </span>
                <span v-else class="!flex flex-col prompt-bubble group-hover:opacity-100 group-hover:visible">
                  <NuxtLink
                    v-for="(s, idx) in v.sublist"
                    :key="idx"
                    class="h-8 flex items-center hover:text-[var(--my-special-color)] hover:bg-[var(--my-transB)] hover:transition-[var(--my-theme-trans3)] px-4"
                    :to="s.link"
                    :rel="s.rel.join(' ')"
                  >
                    {{ s.title }}
                  </NuxtLink>
                </span>
              </template>
            </li>
          </ul>
        </div>

        <div
          class="sidebar-footer z-1"
          :class="[
            openAside ? 'w-60' : 'w-20',
            lessThanMD ? 'max-w-[480px] !w-full bottom-0 border-r-0 !absolute' : '',
          ]"
        >
          <template v-if="openAside">
            <ul class="flex items-center justify-center truncate">
              <li v-for="(item, index) in fixedList.top" :key="index" class="after:content-['·'] after:px-1.5 last-of-type:after:content-none">
                <NuxtLink
                  class="hover:underline hover:opacity-70 transition-[var(--my-theme-trans1)]"
                  :to="item.link"
                  :rel="item.rel.join(' ')"
                >
                  {{ item.title }}
                </NuxtLink>
              </li>
            </ul>
            <ul class="flex items-center justify-center mt-1">
              <li v-for="(item, index) in fixedList.bottom" :key="index">
                <NuxtLink :to="item.link" :rel="item.rel.join(' ')">
                  <SvgIcon :overall-size="30" :size="18" :icon="item.icon" />
                </NuxtLink>
              </li>
            </ul>
          </template>
          <template v-else>
            <SvgIcon icon="essetional/add" @click="setAsideActive(0)" />
          </template>
        </div>
      </div>
    </div>
  </article>
  <div
    class="blur-backdrop invisible opacity-0 transition-[var(--my-theme-trans2)] max-md:!z-30"
    :class="openAside && lessThanMD ? '!opacity-100 !visible transition-[var(--my-theme-trans2)]' : ''"
    @click="setAsideActive(2)"
  />
</template>

<style scoped lang="scss">
.menu-item {
  @apply
  flex
  w-full
  transition-[var(--my-theme-trans3)]
  rounded-lg
  cursor-pointer
  px-2
  select-none
  hover:text-[var(--my-special-color)]
  hover:bg-[var(--my-transB)]
}

.sub-list {
  &:before {
    @apply
    content-['']
    absolute
    block
    left-7
    top-0
    opacity-20
    w-px
    h-[calc(100%-16px)]
    border-l
    border-[var(--my-text-base-color)]
    overflow-hidden
    rounded-full
  }

  @apply relative pl-12
}

.sublist-item {
  &:before {
    @apply
    content-['']
    absolute
    block
    -left-[20px]
    top-1/2
    opacity-10
    w-5
    h-px
    border-b
    border-[var(--my-text-base-color)]
    -translate-y-2/4
  }

  @apply h-10 flex items-center px-4
}

.prompt-bubble {
  @apply
  block
  absolute
  top-[3px]
  left-11
  w-max
  shadow-[0_5px_20px_0_rgba(0,0,0,.1)]
  rounded-tl-[5px]
  rounded-tr-[16px]
  rounded-br-[16px]
  rounded-bl-[16px]
  bg-[var(--my-bg-base-color)]
  mx-1.5
  py-2
  opacity-0
  invisible
  truncate
  transition-[var(--my-theme-trans2)]
}

.sidebar-footer {
  border-top: 1px solid var(--my-border-color);
  border-right: 1px solid var(--my-dark-border);

  @apply
  fixed
  self-end
  bottom-0
  left-0
  right-0
  text-center
  h-20
  flex
  flex-col
  items-center
  justify-center
  transition-[var(--my-theme-trans3)]
}

.menu-list {
  &:after {
    @apply content-[''] border-b border-[var(--my-border-color)] w-full my-3 block
  }
}

.open-sidebar {
  animation: slide-fade-open 0.3s ease-out;

  @apply bg-[var(--my-bg-base-color)] mt-5 ml-5 max-w-[480px] overflow-hidden
}

.close-sidebar {
  animation: slide-fade-close 0.3s ease-out;

  @apply opacity-0 invisible
}

@keyframes slide-fade-open {
  0% {
    transform: translateX(-200px);
    opacity: 0;
  }

  100% {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes slide-fade-close {
  0% {
    transform: translateX(0);
    opacity: 1;
  }

  100% {
    transform: translateX(-200px);
    opacity: 0;
  }
}
</style>
