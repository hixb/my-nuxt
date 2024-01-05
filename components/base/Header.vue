<script lang="ts" setup>
import { scrollEaseOut } from '~/utils/feat'

const router = useRouter()
const { $toast } = useNuxtApp()

const { setOpenAside } = useAside()
const { lessThanMD, width, ScreenSize } = useScreen()
const { icon, toggleTheme } = useTheme()
const { websiteTitle } = useAuthor()

const isShowSearchLayer = ref(false)

const footerMenuList = reactive([
  { identify: 'home', icon: 'essetional/home-1', go: () => router.push('/') },
  { identify: 'search', icon: 'search/search', go: () => isShowSearchLayer.value = true },
  {
    identify: 'menu',
    icon: 'settings/menu',
    go: () => setOpenAside(width.value <= ScreenSize.XL && width.value >= ScreenSize.MD ? 2 : lessThanMD ? 1 : 0),
  },
  { identify: 'theme', icon, go: () => toggleTheme() },
  { identify: 'up', icon: 'arrow/arrow-up-3', go: () => scrollEaseOut(0), size: 25 },
])

const useSearchIptRef = ref<HTMLInputElement | null>(null)
const searchKeyword = ref('')
// purified keywords to prevent XSS attacks.
const sanitizedInputValue = ref('')

function sanitizeInput() {
  sanitizedInputValue.value = new DOMParser()
    .parseFromString(searchKeyword.value, 'text/html')
    .documentElement
    .textContent || ''
}
</script>

<template>
  <header class="border-b border-[var(--my-dark-border)]">
    <div class="w-56 flex items-center max-md:w-auto max-md:min-w-40">
      <SvgIcon
        icon="essetional/line"
        @click="setOpenAside(width <= ScreenSize.XL && width >= ScreenSize.MD ? 2 : lessThanMD ? 1 : 0)"
      />
      <h1 class="ml-1">
        <NuxtLink class="website-title" rel="canonical" title="HELLO" to="/">
          {{ websiteTitle }}
        </NuxtLink>
      </h1>
    </div>
    <div class="flex-1 flex items-center justify-between">
      <div class="search">
        <SvgIcon :is-open-hover="false" class="max-md:hidden" icon="search/search" />
        <input
          ref="useSearchIptRef"
          v-model="searchKeyword"
          class="h-10 flex-1 text-sm"
          placeholder="Search • Ctrl+K"
          type="text"
          @input="sanitizeInput"
        >
        {{ sanitizedInputValue }}
      </div>
      <ul class="flex items-center">
        <li class="hidden max-md:block">
          <SvgIcon icon="search/search" @click="isShowSearchLayer = true" />
        </li>
        <li>
          <SvgIcon class="relative" icon="archive/frame" @click="$toast.waring('Oops, nothing!')">
            <span
              class="bg-[var(--my-text-base-color)] absolute top-0 right-1.5 z-1 text-[var(--my-bg-base-color)] rounded-xl text-xs py-0.5 px-1"
            >
              1
            </span>
          </SvgIcon>
        </li>
        <li>
          <SvgIcon icon="users/profile-2user" />
        </li>
        <li>
          <ClientOnly>
            <SvgIcon :icon="icon" @click="toggleTheme" />
            <template #fallback>
              <i class="w-10 h-10 flex items-center justify-center opacity-30 cursor-no-drop">
                <img alt="" class="w-6 h-6" src="@/assets/icons/weather/sun.svg">
              </i>
            </template>
          </ClientOnly>
        </li>
      </ul>
    </div>
    <template v-if="isShowSearchLayer">
      <div
        class="max-md:opacity-100 max-md:visible opacity-0 invisible blur-backdrop"
        @click="isShowSearchLayer = !isShowSearchLayer"
      />
      <div class="input-box">
        <SvgIcon :is-open-hover="false" icon="search/search" />
        <input class="w-full h-16 pl-2 text-xs font-thin" placeholder="搜索..." type="text">
      </div>
    </template>
    <div class="footer-menu">
      <div v-for="item in footerMenuList" :key="item.identify" class="footer-menu-list" @click="item.go">
        <template v-if="item.identify === 'theme'">
          <ClientOnly>
            <SvgIcon :hover-filled="true" :icon="item.icon" :is-open-hover="false" />
          </ClientOnly>
        </template>
        <template v-else>
          <SvgIcon :hover-filled="true" :icon="item.icon" :is-open-hover="false" :size="(item as any).size" />
        </template>
      </div>
    </div>
  </header>
</template>

<style lang="scss" scoped>
header {
  @apply
  transition-[var(--my-theme-trans1)]
  h-16
  w-screen
  bg-[var(--my-bg-base-color)]
  px-6
  flex
  items-center
  sticky
  top-0
  z-30
  min-w-max
  shadow-[0_0_15px_rgba(0,0,0,0.07)]
  max-md:shadow-[0_0_15px_rgba(0,0,0,.12)]
  max-md:m-5
  max-md:border-0
  max-md:bg-[var(--my-mobile-bg)]
  max-md:px-2
  max-md:rounded-full
  max-md:w-[calc(100vw-40px)]
  max-md:h-14
  max-md:fixed
}

.search {
  @apply
  px-3.5
  w-96
  h-10
  flex
  items-center
  bg-[var(--my-darkT)]
  rounded-full
  hover:bg-[var(--my-transB)]
  transition-[var(--my-theme-trans3)]
  max-md:w-0
  max-md:p-0
  max-md:invisible
}

.footer-menu {
  @apply
  shadow-[0_-10px_25px_-5px_rgba(0,0,0,.1)]
  invisible
  opacity-0
  transition-[var(--my-theme-trans1)]
  w-full
  h-12
  bg-[var(--my-mobile-bg)]
  px-5
  fixed
  bottom-0
  left-0
  flex
  items-center
  justify-center
  rounded-t-xl
  max-md:visible
  max-md:opacity-100
}

.footer-menu-list {
  &:hover {
    &:before {
      content: "";
      @apply absolute bottom-[-1px] left-[50%] w-1 h-1 rounded-full bg-[var(--my-special-color)] translate-x-[-50%]
    }
  }

  @apply flex justify-center relative flex-[1_0_20%] min-w-max
}

.input-box {
  @apply
  opacity-0
  invisible
  animate-[move-down_0.3s]
  fixed
  top-0
  left-0
  w-full
  z-20
  h-16
  rounded-b-3xl
  bg-[var(--my-bg-base-color)]
  flex
  items-center
  px-6
  max-md:opacity-100
  max-md:visible
}

.website-title {
  animation: typing 2s steps(15), blink .5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 1px solid var(--my-text-base-color);
  line-height: 1;

  @apply block font-thin truncate text-lg max-w-[140px] w-[121px] max-md:text-sm max-md:w-[95px]
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}
</style>
