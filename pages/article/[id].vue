<script lang="ts" setup>
const route = useRoute()
const { period } = useTime()

const breadcrumb = [
  { link: '/', name: '首页' },
  { link: route.path, name: '文档' },
]

const showSharePopup = ref(false)
const articleOperation = reactive([
  {
    icon: 'archive/archive-add',
    fn: () => {
    },
  },
  {
    icon: 'emails-message/messages-3',
    fn: () => {
    },
  },
  { icon: 'essetional/share-1', fn: () => showSharePopup.value = true },
])

const routerAddress = ref('')

const copyTimer = ref<ReturnType<typeof setTimeout>>()
const showViewImage = ref(false)

const shareToOtherApps = computed(() => [
  {
    icon: 'crypto-company/facebook',
    link: `https://www.facebook.com/sharer.php?u=${routerAddress.value}`,
    name: 'Facebook',
  },
  {
    icon: 'crypto-company/whatsapp',
    link: `https://api.whatsapp.com/send?text=${routerAddress.value}`,
    name: 'Whatsapp',
  },
  {
    icon: 'crypto-company/twitter',
    link: `https://twitter.com/share?url=${routerAddress.value}`,
    name: 'Twitter',
  },
  {
    icon: 'crypto-company/telegram',
    link: `https://t.me/share/url?url=${routerAddress.value}`,
    name: 'Telegram',
  },
  {
    icon: 'emails-message/sms',
    link: `mailto:?body=${routerAddress.value}`,
    name: 'Email',
  },
])

onMounted(async () => routerAddress.value = window.location.href)

function copy() {
  if (copyTimer.value)
    return

  const { copy } = useClipboard({ source: routerAddress.value })
  copy(routerAddress.value)

  copyTimer.value = setTimeout(() => {
    copyTimer.value = undefined
    clearTimeout(copyTimer.value)
  }, 2000)
}

const code = ref('')
const fileImport = import.meta.glob('./**.text', {
  as: 'raw',
  eager: false,
})
code.value = await fileImport['./code.text']()
const { withAnchor, readingTimeMinutes } = useArticleProcessing(code.value)
</script>

<template>
  <NuxtLayout>
    <NavigationBreadcrumb :list="breadcrumb" />
    <DataDisplayArticleDirectory :content="code" />
    <div class="flex justify-between items-center mb-3">
      <div class="lucky">
        <SvgIcon :is-open-hover="false" :overall-size="16" class="mr-1" icon="security/laugh" />
        {{ period }}
      </div>
      <div class="lucky">
        <SvgIcon :is-open-hover="false" :overall-size="16" class="mr-1" icon="security/eye" />
        23.43K
      </div>
    </div>
    <h1 class="font-bold text-4xl truncate max-xs:text-3xl">
      Typography and Codes
    </h1>
    <div
      class="bg-[var(--my-box-bg)] shadow-[0_0_25px_rgba(0,0,0,.07)] p-4 flex justify-start items-center my-6 rounded-lg"
    >
      <div class="rounded-full w-7 h-7 overflow-hidden mr-2">
        <img alt="" src="https://www.hellozxb.com/avatar.jpg">
      </div>
      <div class="grow-1 w-[calc(100%-126px)] inline-flex flex-wrap items-baseline max-lg:flex-col">
        <span class="text-xs mx-1">hello</span>
        <div class="flex text-2xs opacity-80 items-center max-xs:flex-col max-xs:items-start">
          <bdi>
            <time
              class="before:content-[attr(data-text)] after:content-[attr(data-date)] before:leading-5 max-xs:before:!leading-8"
              data-date="2023.08.22"
              data-text="更新时间："
            />
          </bdi>
          <div class="before:content-['•'] before:mx-2 before:text-xs truncate max-xs:before:!content-none">
            <bdi>预计阅读时间：{{ readingTimeMinutes }}分钟</bdi>
          </div>
        </div>
      </div>
      <ul class="flex items-center">
        <li v-for="item in articleOperation" :key="item.icon" @click="item.fn">
          <SvgIcon :icon="item.icon" :overall-size="30" :size="20" />
        </li>
      </ul>
    </div>

    <DataDisplayCollapse>
      <template #title>
        Accordion_first_title
      </template>
      <template #content>
        <p>
          Epcot is a theme park at Walt Disney World Resort featuring exciting attractions, international pavilions,
          award-winning fireworks and seasonal special events.
        </p>
      </template>
    </DataDisplayCollapse>

    <DataEntrySelect />

    <DataDisplayCoding />

    <div class="flex items-center">
      <GeneralButton class="!w-max" color="success" @click="showViewImage = true">
        open picture
      </GeneralButton>

      <GeneralButton class="!w-max ml-5" color="warning" @click="showSharePopup = true">
        open share dialog
      </GeneralButton>

      <DataDisplayTooltip content="Hello, world">
        <GeneralButton class="!w-max ml-5" color="secondary">
          tooltip
        </GeneralButton>
      </DataDisplayTooltip>
    </div>

    <DataDisplayViewImage :show="showViewImage" @update:show="showViewImage = $event" />

    <DataEntryDownload />

    <div v-hl class="article-content mb-16">
      <div v-html="withAnchor" />
    </div>

    <FeedbackDialog :visible="showSharePopup" @close="showSharePopup = false">
      <template #title>
        分享到其他应用程序
      </template>
      <template #content>
        <ul class="relative w-full -left-2.5 -right-2.5 mb-5 flex flex-wrap justify-center">
          <li v-for="(item, index) in shareToOtherApps" :key="index" class="text-center mb-5 w-[20%] max-xs:w-[33.33%]">
            <NuxtLink
              :to="item.link"
              class="flex items-center justify-center flex-wrap w-16 h-16 mx-auto mb-2 p-2 rounded-3xl bg-[#f1f1f0] dark:bg-[rgba(0,0,0,.15)] cursor-pointer"
              target="_blank"
            >
              <SvgIcon :icon="item.icon" :is-open-hover="false" :overall-size="22" :size="22" />
            </NuxtLink>
            {{ item.name }}
          </li>
        </ul>
        <p class="mb-3.5">
          或 复制链接
        </p>
        <div
          class="bg-[#f1f1f0] dark:bg-[rgba(0,0,0,.15)] rounded-md flex items-center relative border-b border-[var(--my-special-color)] px-2"
        >
          <SvgIcon :is-open-hover="false" icon="type-paragraph-character/link-21" />
          <input
            v-model="routerAddress"
            class="text-[rgba(8,16,43,.4)] dark:text-[rgba(255,255,255,.25)] py-4 px-2 grow"
            onclick="this.select()"
            readonly
            type="text"
          >
          <label
            class="px-2 text-[var(--my-special-color)] flex items-center self-stretch shrink-0 cursor-pointer"
            @click="copy"
          >
            <SvgIcon :icon="copyTimer ? 'arrow/hook' : 'design-tools/copy'" :special="copyTimer" />
          </label>
        </div>
      </template>
    </FeedbackDialog>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
@import "@/assets/css/pages/articleDetail";
</style>
