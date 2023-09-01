<script lang="ts" setup>
interface IconParams {
  [key: string]: {
    name?: string
    path?: string
    cate?: string
    svg: string
  }[]
}

const route = useRoute()

const iconList = ref<Partial<IconParams>>({})
const visibleIconList = ref<Partial<IconParams>>({})

const breadcrumb = [
  { link: '/', name: '首页' },
  { link: route.path, name: '图标库' },
]

const batchSize = 100
const loadedCount = ref(0)
const currentBatchIndex = ref(1)

const isLoad = ref(false)

const totalFileCount = ref(0)

const hasMoreToLoad = computed(() => totalFileCount.value - 1 === loadedCount.value)

async function loadNextBatch() {
  if (isLoad.value || hasMoreToLoad.value)
    return

  isLoad.value = true

  await nextTick()

  const startIndex = (currentBatchIndex.value - 1) * batchSize
  const endIndex = startIndex + batchSize
  const glob = import.meta.glob('assets/iconLib/**/**.svg', { as: 'raw', eager: false })

  totalFileCount.value = Object.keys(glob).length + 1

  const icon = Object.entries(glob)
    .slice(startIndex, endIndex)
    .map(async (item: [string, () => Promise<string>]) => {
      const name = item[0].split('/').pop()?.split('_').pop()?.split('.')[0]
      const path = item[0].split('_').pop()?.split('.')[0].replace('/assets/iconLib/', '')
      const cate = path?.split('/')[0]
      const svg = await item[1]().then(res => res)

      return {
        name,
        path,
        cate,
        svg,
      }
    })

  const res = await Promise.all(icon)

  const updatedIconList = { ...iconList.value }
  for (const curr of res) {
    if (!curr.cate)
      continue

    if (updatedIconList[curr.cate])
      updatedIconList[curr.cate]?.push(curr)
    else
      updatedIconList[curr.cate] = [curr]
  }

  iconList.value = updatedIconList
  loadedCount.value += res.length
  currentBatchIndex.value++

  isLoad.value = false
}

function getIconName(name: string | undefined) {
  if (!name)
    return

  useClipboard().copy(name.toLowerCase().replace(/\(|\)/g, ''))
}

async function loadInitialBatch() {
  await loadNextBatch()
  updateVisibleIconList()
}

function updateVisibleIconList() {
  const startIndex = (currentBatchIndex.value - 1) * batchSize
  const endIndex = Math.min(startIndex + batchSize, totalFileCount.value)

  const updatedVisibleList: Partial<IconParams> = {}

  for (const category in iconList.value) {
    // eslint-disable-next-line no-prototype-builtins
    if (iconList.value.hasOwnProperty(category))
      updatedVisibleList[category] = iconList.value[category]?.slice(0, endIndex)
  }

  visibleIconList.value = updatedVisibleList
}

onMounted(() => loadInitialBatch())
</script>

<template>
  <NuxtLayout>
    <NavigationBreadcrumb :list="breadcrumb" />
    <section class="px-5 py-10 container rounded-lg">
      <h3 class="text-3xl font-bold">
        图标库
      </h3>
      <div v-for="(item, name) in iconList" :key="name" class="cate-list flex flex-col">
        <h4 class="mb-5 mt-10">
          {{ name }}
        </h4>
        <ul class="icon-box-list flex flex-wrap items-start">
          <li
            v-for="v in item" :key="v.name"
            class="h-[50px] w-[10%] flex flex-col cursor-pointer items-center mb-7 max-lg:w-[14.2%]"
            @click="getIconName(v.path)"
          >
            <div class="" v-html="v.svg" />
            <span class="mt-2 text-xs opacity-60 line-clamp-1 px-2">{{ v.name }}</span>
          </li>
        </ul>
      </div>
      <GeneralButton
        class="!w-32 mx-auto mt-20 mb-3"
        radius="full"
        :is-loading="isLoad"
        :is-disabled="hasMoreToLoad || isLoad"
        :color="hasMoreToLoad ? 'default' : 'primary'"
        @click="loadNextBatch"
      >
        {{ hasMoreToLoad ? '已全部加载' : '加载更多' }}
      </GeneralButton>
    </section>
  </NuxtLayout>
</template>

<style lang="scss" scoped>
.container {
  box-shadow: var(--my-shallow-shadow);

  .icon-box-list {
    margin-top: 10px;

    li {
      >span {

      }
    }
  }
}
</style>
