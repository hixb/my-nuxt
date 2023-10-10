<script setup lang="ts">
const { websiteTitle, connectMe } = useAuthor()

const show = ref(true)
const progress = ref(10)

onBeforeMount(() => {
  updateProgress()
  show.value = true
})

onMounted(async () => {
  progress.value = 100
  await nextTick()
  show.value = false
})

function updateProgress() {
  const interval = setInterval(() => {
    if (progress.value < 99)
      progress.value += 1
    else 
      clearInterval(interval)
  }, 10)
}
</script>

<template>
  <Transition>
    <div
      v-if="show"
      class="fixed top-0 left-0 w-screen h-screen z-[999] bg-[var(--my-bg-base-color)] flex flex-col items-center justify-between py-16 select-none"
    >
      <h2>{{ websiteTitle }}</h2>
      <div class="flex flex-col items-center">
        <img src="http://crystallizedskins.com/assets/loading-transparent.gif" alt="">
        <span class="mt-2">{{ progress }}%</span>
      </div>
      <ul class="flex items-center">
        <li v-for="(item, index) in connectMe" :key="index">
          <NuxtLink :to="item.link" target="_blank" :rel="item.rel.join(' ')">
            <SvgIcon :icon="item.icon" />
          </NuxtLink>
        </li>
      </ul>
    </div>
  </Transition>
</template>

<style scoped lang="scss">

</style> 
